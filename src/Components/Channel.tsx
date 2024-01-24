import React, { useEffect, useRef, useState } from "react";
import { channels, messages } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";

export interface ChannelProps {
  id: string;
  name: string;
  description?: string;
}

// for testing purposes (interface may change when we will connect app to the backend)
export interface MessageProps {
  id: string,
  author: string,
  content: string,
  timestamp: string
}

function Channel({widthmsg}: {widthmsg:number}) {
  const { ChannelId } = useParams(); // ChannelId is the name of the variable in the URL
  const Channel = channels.find((channel) => channel.id === ChannelId);
  const [Messages, setMessages] = useState(messages || []);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const addMessage = (newMessage: MessageProps) => {
    setMessages((Messages) => [...Messages, newMessage]);
  };

  useEffect(() => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
  },);

  return (
    <div className='md:flex h-auto w-auto -z-20 flex-col fixed inset-y-0 top-20 left-[320px]' style={{ marginRight: `${widthmsg}%` }}>
      <div className='text-5xl shadow-sg tracking-wider font-semibold text-white ml-2 pb-2'>
        {Channel?.name} | {Channel?.description}
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
        name={Channel?.name || 'this channel' }
        widthmsg={widthmsg}
      />
    </div>
  );
}

// input field at the bottom of the page
const TextBar = ({ addMessage, name, widthmsg }: { addMessage: (message: MessageProps) => void, name: string, widthmsg: number }) => {
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
    <form onSubmit={handleFormSubmit} className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[320px] shadow-lg bg-gray-600 px-2 h-12 m-2 mx-4' style={{ marginRight: `${widthmsg+1.5}%` }}>
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
    <div className='flex flex-col justify-start ml-auto;'>
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

export default Channel;
