import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useAuth from "../Hooks/useAuth";
import { getAllDetailedMessages, getChannelInfo, getUser, sendMessageForm } from "../Api/axios";
import { Message } from "./Message";
import TextBar from "./TextBar";
import { useSignalR } from "../Hooks/useSignalR";
import { MessageResponse } from "../SignalR";

export interface ChannelProps {
  id: string;
  name: string;
  description?: string;
  serverId: string;
}

export interface MessageProps {
  id: string,
  body: string,
  creationDate: string
  attachment: string | null
}

export interface MessagePropsWithAuthor {
  id: string,
  body: string,
  creationDate: string
  attachment: string | null
  author: AuthorProps
}
//thanks to new endpoint getting messages also includes author info, added special author props for cleaner code
export interface AuthorProps {
  username: string;
  id: string;
  creationDate: string;
  avatar: string;
}
function Channel({ widthmsg }: { widthmsg: number }) {

  const { ChannelId } = useParams(); // ChannelId is the name of the variable in the URL
  const [channelInfo, setChannelInfo] = useState<ChannelProps | undefined>();
  const [messages, setMessages] = useState<MessagePropsWithAuthor[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const { auth }: { auth: any } = useAuth();
  const [toBeRemovedId, settoBeRemoved] = useState('');
  const [User, setUser] = useState<AuthorProps>({ username: '', id: '', creationDate: '', avatar: '' });
  const [newMessage, setNewMessage] = useState<MessageResponse | null>(null)
  const signalR = useSignalR();


  useEffect( () => {
      if (channelInfo === undefined || newMessage === null || channelInfo.id != newMessage.channelId) {
        return;
      }

      const newMessageAsProp: MessageProps = {
        id: newMessage.id,
        body: newMessage.body,
        creationDate: newMessage.creationDate,
        attachment: newMessage.attachment,
      }
      const authorId = newMessage.authorId

      getUser(auth.token, authorId).then((response) => {
        const messageWithAuthor = {
          ...newMessageAsProp,
          author: response.data
        }
        setMessages((messages) => [...messages, messageWithAuthor]);
      }).catch((error: any) => {
        enqueueSnackbar("We couldn't load user info. Please try again later: SignalR", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      })
  }, [newMessage])

  useEffect( () => {
  }, [channelInfo])

  useEffect(() => {
    if (signalR === null) {
      return
    }

    signalR.onReceiveMessage((message) => {
      setNewMessage(message)
    })
    
    signalR.onDeleteMessage((messageId) => settoBeRemoved(messageId))
    
    return () => { 
      signalR.offDeleteMessage();
      signalR.offReceiveMessage(); 
    }

  },[])
  useEffect(() => {
    getUser(auth.token, auth.id).then((response) => {
      setUser(response.data);
    }).catch((error: any) => {
      enqueueSnackbar("We couldn't load user info. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    })
  }, []);
  const addMessageForm = async (body: string, file: File | null) => {
    try {
      const response = await sendMessageForm(auth.token, ChannelId || '', body, '0', file);
      // const newMessage: MessagePropsWithAuthor = {
      //   id: response.data.id,
      //   body: response.data.body,
      //   creationDate: response.data.creationDate,
      //   attachment: response.data.attachment,
      //   author: User
      // };
      // not needed with signalR
      //setMessages((messages) => [...messages, newMessage]);
    } catch (error: any) {
      enqueueSnackbar("We couldn't send your message. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    };
  };

  // this function is especially out of the useEffect because it is used in the TextBar component
  const fetchAllMessages = async () => {
    try {
      const response = await getAllDetailedMessages(auth.token, ChannelId || '');
      setMessages(response.data);
    } catch (error: any) {
      enqueueSnackbar("We couldn't load messagess. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  }

  const fetchChannelInfo = async () => {
    try {
      const response = await getChannelInfo(auth.token, ChannelId || '');
      setChannelInfo(response.data);
    } catch (error: any) {
      enqueueSnackbar("We couldn't load this channel info bar. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  }

  const removeMessage = (id: string) => {
    // it doesnt need to do anything now because of signalR
    //settoBeRemoved(id);
  }

  useEffect(() => {
    if (toBeRemovedId) {
      if (messages) {
        setMessages(messages.filter((message) => message.id !== toBeRemovedId));
      }
    }
  }, [toBeRemovedId])

  useEffect(() => {
    let isMounted = true; // not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    if (isMounted) {
      fetchAllMessages();
      fetchChannelInfo();
    };

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [ChannelId]);

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'auto' });
  },);

  return (
    <div className='md:flex h-auto -z-20 flex-col fixed inset-y-0 top-20 w-full' style={{ left: `calc(max(230px,15%))` }}>
      <div className='text-5xl shadow-sg whitespace-nowrap tracking-wider font-semibold text-white w-full pl-5 pb-5 bg-tertiary'>
        {channelInfo?.name} | {channelInfo?.description}
      </div>
      <div className='mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 w-[85%]'>
        {messages?.map(({ id, body, creationDate, attachment, author }) => (
          <div key={id} className='border-tertiary'>
            <Message
              id={id}
              author={author}
              body={body}
              creationDate={creationDate}
              attachment={attachment}
              isPrivateMessage={false}
              removeMessage={removeMessage}
              widthmsg={widthmsg}
            />
          </div>
        ))}
        <div className='max-w-[95%] overflow-wrap text-wrap h-auto break-words' ref={chatWindowRef} />
      </div>
      <TextBar
        refreshMessages={fetchAllMessages}
        addMessage={addMessageForm}
        name={channelInfo?.name || 'this channel'}
        widthmsg={widthmsg}
      />
    </div>
  );
}


export default Channel;
