import React, { useEffect, useRef, useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { useLocation, useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { UserAvatar } from "./IconLib";
import { MessageProps } from "./Channel";
import { Message } from "./Message";
import TextBar from "./TextBar";
import { getAllMessagesFromUser, getUser, sendPrivateMessageForm } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import { enqueueSnackbar } from "notistack";
import { MessagePropsWithDelete } from "./Message";

export interface FriendProps {
  id: string;
  username: string;
  picture?: string;
}

function FriendMessage() {
  const { UserId } = useParams(); // userId is the name of the variable in the URL
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [User, setUser] = useState<FriendProps | undefined>();
  const location = useLocation();
  const [toBeRemovedId, settoBeRemoved] = useState('');
  
  const removeMessage = (id: string) => {
    settoBeRemoved(id);
  }
  useEffect(() => {
    if(UserId && (location.pathname.startsWith(`/friends/${UserId}`))){
    getUser(auth.token, UserId || '').then((response) => {
      setUser(response.data);
    }).catch((error: any) => {
      enqueueSnackbar("We couldn't load user info. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    })}
    fetchAllMessages();
  }, [UserId]);

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
        attachment: response.data.attachment
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
          <UserAvatar name={User?.username} />
        </div>
        {User?.username}
      </div>
      <div className='items-center mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 border-tertiary w-full'>
        {messages.map(({ id, authorId, body, creationDate, attachment }: MessageProps) => (
          <Message
            id={id}
            authorId={authorId}
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
      name={UserId || 'this friend'}
      widthmsg={15}//temporary hardcoded value, I was not the creator of this code so will wait for the original creator to fix this
      refreshMessages={fetchAllMessages}
      />
    </div>
  );

}


export default FriendMessage;
