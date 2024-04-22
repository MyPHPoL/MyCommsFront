import React, { useEffect, useRef, useState } from "react";
import { friends, messages } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { UserAvatar } from "./IconLib";
import { MessageProps } from "./Channel";
import { Message } from "./Message";

export interface FriendProps {
  id: string;
  username: string;
  picture?: string;
}

function FriendMessage() {
  const { UserId } = useParams(); // userId is the name of the variable in the URL
  const User = friends.find((friend: FriendProps) => friend.id === UserId);
  const [Messages, setMessages] = useState<MessageProps[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const addMessage = (newMessage: MessageProps) => {

  };

  useEffect(() => {
    setMessages(messages);
  }, [UserId]);

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
  },);

  return (
    <div className='md:flex h-auto w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
      <div className='flex-row flex w-full pt-2 pb-4 pl-[20px] bg-tertiary h-auto text-5xl shadow-sg tracking-wider font-semibold text-white items-center'>
        Chat with:
        <div className='flex mx-2'>
          <UserAvatar name={User?.username} picture={User?.email} />
        </div>
        {User?.username}
      </div>
      <div className='items-center mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 border-tertiary w-full'>
        {Messages.map(({ id, authorId, body, creationDate, attachment }: MessageProps) => (
          <Message
            key={id}
            id={id}
            authorId={authorId}
            body={body}
            creationDate={creationDate}
            attachment={attachment}
          />
        ))}
        <div ref={chatWindowRef} />
      </div>
      <TextBar
        addMessage={addMessage}
        name={User?.username || 'this channel'}
      />
    </div>
  );
}

// input field at the bottom of the page
const TextBar = ({ addMessage, name, }: { addMessage: (message: MessageProps) => void, name: string }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    // Create a new message object
    const newMessage: MessageProps = {
      id: 'newid', // replace with a real id
      authorId: 'current user', // replace with the current username
      body: inputValue,
      creationDate: new Date().toDateString(),
      attachment: null,
    };

    // Clear the input field and add the new message
    addMessage(newMessage);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-[20px] left-[20px] shadow-lg bg-secondary px-2 h-12 m-2 mx-4'>
      <button>
        <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      {/* This will be a button to refresh chat when backend is working, needed for tests, might be removed in further implementation*/}
      <button>
        <IoRefreshOutline size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Enter message on ${name}`}
        className='w-full bg-transparent outline-none ml-0 mr-auto text-gray-300 placeholder-gray-500 cursor-text'
      />
      <button>
        <HiGif size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      <button>
        <FaRegSmile size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      <button type='submit'>
        <IoSend size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
    </form>
  );
};

export default FriendMessage;
