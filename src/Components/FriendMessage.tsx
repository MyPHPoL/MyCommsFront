import React, { useEffect, useRef, useState } from "react";
import { friends } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { UserAvatar } from "./IconLib";

export interface FriendProps {
  id: string;
  username: string;
  picture?: string;
}

// for testing purposes (interface may change when we will connect app to the backend)
export interface MessageProps {
  id: string,
  author: string,
  content: string,
  timestamp: string
}

function FriendMessage() {
    const { UserId } = useParams(); // userId is the name of the variable in the URL
    const User = friends.find((friend: FriendProps) => friend.id === UserId);
    const [Messages, setMessages] = useState([]);
    const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
    const addMessage = (newMessage: MessageProps) => {
      
    };
  
    useEffect(() => {
      chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
    },);
  
    return (
      <div className='md:flex h-auto w-full -z-20 flex-col fixed inset-y-0 top-20 left-[20px]'>
        <div className='flex-row flex m-2  text-5xl shadow-sg tracking-wider font-semibold text-white ml-2 pb-2 items-center'>
          Chat with: 
          <div className='flex mx-2'>
            <UserAvatar name={User?.username} picture={User?.email}/>
          </div>
          {User?.username}
        </div>
        <div className='items-center mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16'>
          {Messages.map(({ id, author, content, timestamp }) => (
            <Message
              key={id}
              id={id}
              author={author}
              content={content}
              timestamp={timestamp}
            />
          ))}
      <div ref={chatWindowRef}/>
      </div>
      <TextBar
        addMessage={addMessage}
        name={User?.username || 'this channel' }
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
      author: 'current user', // replace with the current username
      content: inputValue,
      timestamp: new Date().toDateString(),
    };

    // Clear the input field and add the new message
    addMessage(newMessage);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[20px] shadow-lg bg-secondary px-2 h-12 m-2 mx-4'>
      <button>
        <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      {/* This will be a button to refresh chat when backend is working, needed for tests, might be removed in further implementation*/}
      <button>
      <IoRefreshOutline size='22' className='text-gray-300 mx-2 hover:text-gray-200'/>
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

const Message = ({ author, content, timestamp }: MessageProps) => (
  <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer'>
    <div className='flex flex-col justify-start ml-auto border-tertiary border-[1px] hover:bg-tertiary'>
      <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
        {author}
        <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
          {timestamp}
        </small>
      </p>
      <p className='text-lg text-left text-white mr-auto whitespace-normal'>
        {content}
      </p>
    </div>
  </div>
);

export default FriendMessage;
