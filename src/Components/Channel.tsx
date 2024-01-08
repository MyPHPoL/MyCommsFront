import React from "react";
import { useParams } from "react-router-dom";
import { channels } from "../fakedb";
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
  const Channel: ChannelProps | undefined = channels.find(
    (channel) => channel.id === ChannelId
  );
  return (
    <div className='md:flex h-auto w-auto -z-20 flex-col fixed inset-y-0 top-20 left-[380px]'>
      <div className='text-5xl shadow-sg tracking-wider font-semibold text-white ml-2'>
        {Channel?.name} | {Channel?.description}
      </div>
      <div className='items-center mt-0 ml-0 mx-auto px-0 pb-16 overflow-y-scroll'>
        <Message author='chuj' content='Hello world!' timestamp='20:00' />
        <Message author='servedren' content='Hello world!' timestamp='13:00' />
        <Message
          author='sos carbonare'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat blandit magna vel dapibus. Suspendisse quam risus, egestas eu ligula at, pretium consequat eros. Sed accumsan risus consectetur tristique commodo. Duis et laoreet neque, eu bibendum ipsum. Vivamus ultrices eu orci eu porttitor. '
          timestamp='22:00'
        />
        <Message
          author='syadaisu'
          content='Vestibulum dignissim tortor vel nisl luctus tincidunt. Aliquam dolor nulla, rhoncus vitae venenatis sed, vestibulum in quam. Mauris nisi magna, bibendum nec commodo non, tempus nec lacus. Phasellus posuere pretium sapien, ac feugiat leo ullamcorper vitae. Maecenas pulvinar ipsum ut posuere placerat. In in pulvinar elit, ut convallis nisi. Vestibulum elementum consectetur lectus, placerat vestibulum mauris viverra vitae. Donec ac quam et mi dapibus iaculis dignissim ut turpis. Quisque tristique dui sit amet urna placerat rhoncus. '
          timestamp='08:00'
        />
        <Message
          author='chuj'
          content='Maecenas tempus vitae nulla et blandit. Suspendisse volutpat ullamcorper tortor eget dapibus. Etiam imperdiet augue vel magna lacinia, ut iaculis nunc bibendum. Morbi sed nibh a justo hendrerit congue et eu elit. Suspendisse in neque est. Vivamus ac tortor gravida, mattis elit vitae, commodo augue. Donec interdum, nunc quis rutrum ultrices, orci augue vehicula magna, non dictum nunc risus a turpis. Suspendisse sed purus id mi venenatis porta ut id quam. Nullam condimentum vestibulum augue nec cursus. '
          timestamp='20:00'
        />
        <Message author='test' content='short message' timestamp='09:27' />
        <Message
          author='chuj'
          content='Maecenas tempus vitae nulla et blandit. Suspendisse volutpat ullamcorper tortor eget dapibus. Etiam imperdiet augue vel magna lacinia, ut iaculis nunc bibendum. Morbi sed nibh a justo hendrerit congue et eu elit. Suspendisse in neque est. Vivamus ac tortor gravida, mattis elit vitae, commodo augue. Donec interdum, nunc quis rutrum ultrices, orci augue vehicula magna, non dictum nunc risus a turpis. Suspendisse sed purus id mi venenatis porta ut id quam. Nullam condimentum vestibulum augue nec cursus. '
          timestamp='21:00'
        />
      </div>
      <TextBar></TextBar>
    </div>
  );
}

// input field at the bottom of the page
const TextBar = () => (
  <div className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[380px] shadow-lg bg-gray-600 px-2 h-12 m-2 mx-4'>
    <button>
      <RiAttachment2
        size='22'
        className='text-gray-300 mx-2 hover:text-gray-200 '
      />
    </button>
    <input
      type='text'
      placeholder='Enter message...'
      className='font-semibold w-full bg-transparent outline-none ml-0 mr-auto text-gray-300 placeholder-gray-500 cursor-text'
    />
    <button>
      <HiGif size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
    </button>
    <button>
      <FaRegSmile
        size='22'
        className='text-gray-300 mx-2 hover:text-gray-200'
      />
    </button>
    <button>
      <IoSend size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
    </button>
  </div>
);

const Message = ({
  author,
  content,
  timestamp,
}: {
  author: string;
  content: string;
  timestamp: string;
}) => (
  <div className='w-full flex-row justify-evenly py-4 px-8 m-0 cursor-pointer'>
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
