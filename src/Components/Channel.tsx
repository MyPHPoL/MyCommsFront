import React, { useState } from "react";
import { channels, messages } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";

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

class ChannelClass extends React.Component<{ChannelId: string}, any> {
  chatWindowRef = React.createRef<HTMLDivElement>();
  state = {
    channelId: this.props.ChannelId as string,
    channel: channels.find((channel) => channel.id === this.props.ChannelId) as ChannelProps,
    messages: messages as MessageProps[],
  };

  addMessage = (message: MessageProps) => {
    this.setState((prevState: { messages: MessageProps[]; }) => ({
      messages: [...prevState.messages, message]
    }),
    () => {
      if (this.chatWindowRef.current) {
        this.chatWindowRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    );
  };

  render() {
    const { messages } = this.state;
    return (
      <div className='md:flex h-auto w-auto -z-20 flex-col fixed inset-y-0 top-20 left-[320px]'>
        <div className='text-5xl shadow-sg tracking-wider font-semibold text-white ml-2'>
          {this.state.channel?.name} | {this.state.channel?.description}
        </div>
        <div className='items-center mt-0 ml-0 mx-auto px-0 pb-16 overflow-y-auto'>
          {messages.map(({ id, author, content, timestamp }) => (
            <Message
              key={id}
              id={id}
              author={author}
              content={content}
              timestamp={timestamp}
            />
          ))}
          <div ref={this.chatWindowRef} />
        </div>
        <TextBar addMessage={this.addMessage}/>
      </div>
    );
  }
}

// input field at the bottom of the page
const TextBar = ({ addMessage }: { addMessage: (message: MessageProps) => void }) => {
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
      author: 'current user', // replace with the current users name
      content: inputValue,
      timestamp: new Date().toDateString(),
    };

    // Clear the input field and add the new message
    addMessage(newMessage);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[320px] shadow-lg bg-gray-600 px-2 h-12 m-2 mx-4'>
      <button>
        <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter message...'
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

export default ChannelClass;
