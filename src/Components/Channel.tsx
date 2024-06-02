import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useAuth from "../Hooks/useAuth";
import { getAllMessages, getChannelInfo, sendMessage, sendMessageForm } from "../Api/axios";
import { Message } from "./Message";
import DeleteMessageConfirmation from "./DialogPopups/DeleteMessageConfirmation";
import TextBar from "./TextBar";

export interface ChannelProps {
  id: string;
  name: string;
  description?: string;
  serverId: string;
}

export interface MessageProps {
  id: string,
  authorId: string,
  body: string,
  creationDate: string
  attachment: string | null
}

function Channel({ widthmsg }: { widthmsg: number }) {

  const { ChannelId } = useParams(); // ChannelId is the name of the variable in the URL
  const [channelInfo, setChannelInfo] = useState<ChannelProps | undefined>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [toBeRemovedId, settoBeRemoved] = useState('');


  // will add message to the database and then to the messages array (if successful)
  /*const addMessage = async (body: string) => {
    try {
      const response = await sendMessage(auth.token, ChannelId || '', body, '0');
      const newMessage: MessageProps = {
        id: response.data.id,
        authorId: response.data.authorId,
        body: response.data.body,
        creationDate: response.data.creationDate,
      };
      setMessages((messages) => [...messages, newMessage]);
    } catch (error: any) {
      enqueueSnackbar("We couldn't send your message. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    };
  };*/


  const addMessageForm = async (body: string, file: File | null) => {
    try {
      const response = await sendMessageForm(auth.token, ChannelId || '', body, '0', file);
      const newMessage: MessageProps = {
        id: response.data.id,
        authorId: response.data.authorId,
        body: response.data.body,
        creationDate: response.data.creationDate,
        attachment: response.data.attachment
      };
      setMessages((messages) => [...messages, newMessage]);
    } catch (error: any) {
      enqueueSnackbar("We couldn't send your message. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    };
  };

  // this function is especially out of the useEffect because it is used in the TextBar component
  const fetchAllMessages = async () => {
    try {
      const response = await getAllMessages(auth.token, ChannelId || '');
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
    settoBeRemoved(id);
  }

  useEffect(() => {
    if (toBeRemovedId) {
      if (messages) {
        setMessages(messages.filter((message) => message.id !== toBeRemovedId));
      }
    }
  }, [toBeRemovedId])

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    if (isMounted) {
      fetchAllMessages();
      fetchChannelInfo();
    };

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ChannelId]);

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'auto' });
  },);

  return (
    <div className='md:flex h-auto -z-20 flex-col fixed inset-y-0 top-20 w-full' style={{ left: `calc(max(230px,15%))`, marginRight: `${widthmsg}%` }}>
      <div className='text-5xl shadow-sg whitespace-nowrap tracking-wider font-semibold text-white w-full pl-5 pb-5 bg-tertiary'>
        {channelInfo?.name} | {channelInfo?.description}
      </div>
      <div className='mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 w-[85%]'>
        {messages?.map(({ id, authorId, body, creationDate, attachment }) => (
          <div key={id} className='border-tertiary'>
              <Message
                id={id}
                authorId={authorId}
                body={body}
                creationDate={creationDate}
                attachment={attachment}
                isPrivateMessage={false}
                removeMessage={removeMessage}
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
