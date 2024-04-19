import { Theme, EmojiStyle } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { IoRefreshOutline, IoSend } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import Picker from 'emoji-picker-react';
import useAuth from "../Hooks/useAuth";
import { getFavoriteGifs, getGifs } from "../Api/axios";
import useDebounce from "../Hooks/useDebounce";

export interface GifProps {
    description?: string;
    url: string;
    tenorId?: string;
}

// input field at the bottom of the page
const TextBar = ({ addMessage, name, widthmsg, refreshMessages }: { addMessage: (message: string) => void, name: string, widthmsg: number, refreshMessages: () => void }) => {
    const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [gifMenuOpen, setGifMenuOpen] = useState(false);
  
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
      <form onSubmit={handleFormSubmit} className='flex w-auto flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 shadow-lg bg-secondary px-2 h-12 m-2 mx-4' style={{ left: `calc(max(230px,15%))`, marginRight: `${widthmsg + 1.5}%` }}>
        {/* This is a button that will open file attachment menu */}
        <button tabIndex={0}>
          <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
        </button>
        {/* This is a button to refresh all channel messages */}
        <button onClick={refreshMessages}>
          <IoRefreshOutline size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
        </button>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Enter message on ${name}`}
          className='w-full bg-transparent outline-none ml-0 mr-auto text-gray-300 placeholder-gray-500 cursor-text'
        />
        {/* This is a button that will open GIF menu */}
        <button onClick={() => [setGifMenuOpen(!gifMenuOpen), setEmojiMenuOpen(false)]}>
          <HiGif size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
        </button>

        <div className="absolute bottom-full right-1 my-2">
          {gifMenuOpen && <GifMenu addMessage={addMessage} />}
        </div>

        <div className="absolute bottom-full right-1 my-2">
          {emojiMenuOpen && <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} emojiStyle={EmojiStyle.NATIVE} skinTonesDisabled={true} />}
        </div>
  
        {/* This is a button that opens emoji menu */}
        <button type="button" onClick={() => [setEmojiMenuOpen(!emojiMenuOpen), setGifMenuOpen(false)]}>
          <FaRegSmile size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
        </button>
  
        {/* This is a button that sends a message */}
        <button type='submit'>
          <IoSend size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
        </button>
      </form>
    );
  };
  
  export default TextBar;

  const GifMenu = ({addMessage}: {addMessage: (message: string) => void}) => {

    const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
    const [keyword, setKeyword] = useState("");
    const [favoriteGifs, setFavoriteGifs] = useState<GifProps[]>([]);
    const [gifs, setGifs] = useState<GifProps[]>([]);
    const debouncedKeyword = useDebounce(keyword, 500);

    const fetchGifs = async () => {
        try {
            const response = await getGifs(auth.token, keyword);
            setGifs(response.data.gifs);
            console.log(response.data.gifs);
        }
        catch (error: any) {
        }
    }

    const fetchFavoriteGifs = async () => {
        try {
            const response = await getFavoriteGifs(auth.token);
            setFavoriteGifs(response.data);
        }
        catch (error: any) {
        }
    }

    useEffect(() => {
      let isMounted = true; // something, something not to render when component is unmounted
      const controller = new AbortController(); // cancels request when component unmounts
  
      if (isMounted) {
        fetchFavoriteGifs();
        console.log(favoriteGifs);
      };
  
      return () => {
        isMounted = false;
        controller.abort();
      };
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (debouncedKeyword) {
        fetchGifs();
      };
    }, [debouncedKeyword]);

    return (
      <div className="h-[500px] w-[400px] rounded-lg shadow-lg bg-secondary">
        <div className='relative w-full h-12 mt-7 p-2'>
          <input
            type='text'
            placeholder='Search on Tenor'
            onChange={(e) => setKeyword(e.target.value)}
            className='text-white placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
          />
        </div>
        <section className="h-[480px] flex flex-col pb-3 mx-auto">
          <ul className="flex flex-column overflow-y-scroll my-4">
            {!keyword && (
              <li>
                {favoriteGifs.map((gif) => (
                  <div key={gif.url} className='w-auto h-32 m-2 float-left'>
                    <img src={gif.url} alt={gif.description} className='w-auto h-full' onClick={() => addMessage(gif.url)} />
                  </div>
                ))}
              </li>
            )}
            {keyword && (
              <li>
                {gifs.map((gif) => (
                  <div key={gif.url} className='w-auto h-32 m-2 float-left'>
                    <img src={gif.url} alt={gif.description} className='w-auto h-full' onClick={() => addMessage(gif.url)} />
                  </div>
                ))}
              </li>
            )}
          </ul>
        </section>
      </div>
    );
  };
