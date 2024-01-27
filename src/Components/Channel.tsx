import React, { useEffect, useRef, useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { enqueueSnackbar } from "notistack";
import useAuth from "../Hooks/useAuth";
import { getAllMessages, getChannelInfo, getUsername, sendMessage } from "../Api/axios";
import Picker from 'emoji-picker-react';
import { EmojiStyle,Theme } from 'emoji-picker-react';

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
}

function Channel({widthmsg}: {widthmsg:number}) {

  const { ChannelId } = useParams(); // ChannelId is the name of the variable in the URL
  const [channelInfo, setChannelInfo] = useState<ChannelProps | undefined>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null); // used to scroll to the bottom of the chat
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  
  // will add message to the database and then to the messages array (if successful)
  const addMessage = async (body: string) => {
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

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    if(isMounted){
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
    chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
  },);

  return (
    <div className='md:flex h-aut -z-20 flex-col fixed inset-y-0 top-20 left-[15%] w-full' style={{ marginRight: `${widthmsg}%` }}>
      <div className='text-5xl shadow-sg tracking-wider font-semibold text-white w-full pl-5 h-[60px] bg-tertiary'>
        {channelInfo?.name} | {channelInfo?.description}
      </div>
      <div className='items-center mt-0 ml-0 mx-auto px-0 overflow-y-auto mb-16 border-tertiary w-full'>
        {messages?.map(({ id, authorId, body, creationDate }) => (
          <Message
            key={id}
            id={id}
            authorId={authorId}
            body={body}
            creationDate={creationDate}
          />
        ))}
      <div ref={chatWindowRef} />
      </div>
      <TextBar
        refreshMessages={fetchAllMessages}
        addMessage={addMessage}
        name={channelInfo?.name || 'this channel' }
        widthmsg={widthmsg}
      />
    </div>
  );
}

// input field at the bottom of the page
const TextBar = ({ addMessage, name, widthmsg, refreshMessages }: { addMessage: (message: string) => void, name: string, widthmsg: number, refreshMessages: () => void }) => {
  const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    // Clear the input field and add the new message
    addMessage(inputValue);
    setInputValue('');
  };

  const handleEmojiClick = (emoji: any) => {
    setInputValue(inputValue + emoji.emoji);
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 left-[16%] shadow-lg bg-secondary px-2 h-12 m-2 mx-4' style={{ marginRight: `${widthmsg+1.5}%` }}>
      {/* This is a button that will open file attachment menu */}
      <button>
        <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      {/* This is a button to refresh all channel messages */}
      <button onClick={refreshMessages}>
      <IoRefreshOutline size='22' className='text-gray-300 mx-2 hover:text-gray-200'/>
      </button>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Enter message on ${name}`}
        className='w-full bg-transparent outline-none ml-0 mr-auto text-gray-300 placeholder-gray-500 cursor-text'
      />
      {/* This is a button that will open GIF menu */}
      <button>
        <HiGif size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      <div className="absolute bottom-full right-1 my-2">
      {emojiMenuOpen && <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} emojiStyle={EmojiStyle.NATIVE} />}
      </div>

      {/* This is a button that opens emoji menu */}
      <button type="button" onClick={()=> setEmojiMenuOpen(!emojiMenuOpen)}>
        <FaRegSmile size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>

      {/* This is a button that sends a message */}
      <button type='submit'>
        <IoSend size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
    </form>
  );
};

const Message = ({ authorId, body, creationDate }: MessageProps) => {
  const [username, setUsername] = useState('');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token

  // get username from authorId
  getUsername(auth.token, authorId).then((res) => {
    const username: string = res;
    setUsername(username);
  });

  return(
  <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-[1px] hover:bg-tertiary'>
    <div className='flex flex-col justify-start ml-autoborder-tertiary'>
      <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
        {username}
        <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
          {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
        </small>
      </p>
      <p className='text-lg text-left text-white mr-auto whitespace-normal'>
        {body}
      </p>
    </div>
  </div>
  )
};

export default Channel;
