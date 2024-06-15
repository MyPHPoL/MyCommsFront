import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserAvatar } from "./IconLib";
import { AuthorProps, MessageProps } from "./Channel";
import { Message } from "./Message";
import TextBar from "./TextBar";
import { getAllMessagesFromUser, getUser, sendPrivateMessageForm } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import { enqueueSnackbar } from "notistack";
import { UserProps } from "./User";

export interface FriendProps {
  id: string;
  username: string;
  avatar?: string;
}

function FriendMessage() {
  const { UserId } = useParams(); // userId is the name of the variable in the URL
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [user, setUser] = useState<UserProps>();
  const location = useLocation();
  const [toBeRemovedId, settoBeRemoved] = useState('');
  const [author, setAuthor] = useState<AuthorProps>({ username: '', id: '', creationDate: '', avatar: '' }); // needs to be initialized with anything, the value is overwritten immediately on start

  const removeMessage = (id: string) => {
    settoBeRemoved(id);
  }

  useEffect(() => {
    if (UserId && (location.pathname.startsWith(`/friends/${UserId}`))) {
      getUser(auth.token, UserId || '').then((response) => {
        setUser(response.data);
      }).catch((error: any) => {
        enqueueSnackbar("We couldn't load user info. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      })
    }
    fetchAllMessages();
  }, [UserId]);

  useEffect(() => {
    getUser(auth.token, auth.id).then((response) => {
      setAuthor(response.data);
    }).catch((error: any) => {
      enqueueSnackbar("We couldn't load user info. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    })
  }, []);

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'auto' });
  },);

  useEffect(() => {
    if (toBeRemovedId) {
      if (messages) {
        setMessages(messages.filter((message) => message.id !== toBeRemovedId));
      }
    }
  }, [toBeRemovedId])

  const addMessageForm = async (body: string, file: File | null) => {
    try {
      const response = await sendPrivateMessageForm(auth.token, UserId || '', body, '0', file);
      const newMessage: MessageProps = {
        id: response.data.id,
        authorId: response.data.authorId,
        body: response.data.body,
        creationDate: response.data.creationDate,
        attachment: response.data.attachment,
        author: response.data.author
      };
      setMessages((messages) => [...messages, newMessage]);
    } catch (error: any) {
      enqueueSnackbar("We couldn't send your message. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    };
  };

  const fetchAllMessages = async () => {
    try {
      const response = await getAllMessagesFromUser(auth.token, UserId || '');
      setMessages(response.data);
    } catch (error: any) {
      enqueueSnackbar("We couldn't load messagess. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  }

  return (
    <div className='md:flex h-auto w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
      <div className='flex-row flex w-full pt-2 pb-4 pl-[20px] bg-tertiary h-auto text-5xl shadow-sg tracking-wider font-semibold text-white items-center'>
        Chat with:
        <div className='flex mx-2'>
          {user?.avatar ? <UserAvatar name={user.username} picture={"https://localhost:7031/file/" + user.avatar} /> : <UserAvatar name={user?.username} />}
        </div>
        {user?.username}
      </div>
      <div className='items-center mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 border-tertiary w-full'>
        {messages.map(({ id, body, creationDate, attachment, author }: MessageProps) => (
          <Message
            id={id}
            author={author}
            body={body}
            creationDate={creationDate}
            attachment={attachment}
            isPrivateMessage={true}
            removeMessage={removeMessage}
          />
        ))}
        <div ref={chatWindowRef} />
      </div>
      <TextBar
        addMessage={addMessageForm}
        name={user?.username || 'this friend'}
        widthmsg={15}
        refreshMessages={fetchAllMessages}
        author={author}
      />
    </div>
  );
}


export default FriendMessage;
