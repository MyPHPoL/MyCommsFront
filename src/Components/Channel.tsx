import React from 'react';
import { useParams } from 'react-router-dom';
import { channels } from '../fakedb';
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";

export interface ChannelProps {
    id: string;
    name: string;
    description?: string;
}

function Channel() {
    const { ChannelId } = useParams();
    const Channel: ChannelProps | undefined = channels.find((channel) => channel.id === ChannelId);
    return (
        <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-[380px]'>
            <div className='text-5xl shadow-sg tracking-wider font-semibold text-white ml-2 my-auto;'>You are at {Channel?.name} channel!</div>
            <TextBar></TextBar>
        </div>
    );
};

// input field at the bottom of the page
const TextBar = () => (
  <div
    className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[380px] shadow-lg bg-gray-600 px-2 h-12 m-2 mx-4;'>
    <button><RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200'/></button>
    <input
      type="text"
      placeholder="Enter message..."
      className="font-semibold w-full bg-transparent outline-none ml-0 mr-auto text-gray-300 placeholder-gray-500 cursor-text;"
    />
    <button><HiGif size='22' className='text-gray-300 mx-2 hover:text-gray-200'/></button>
    <button><FaRegSmile size='22' className='text-gray-300 mx-2 hover:text-gray-200'/></button>
    <button><IoSend size='22' className='text-gray-300 mx-2 hover:text-gray-200'/></button>
  </div>
);

export default Channel;
  