import { Theme, EmojiStyle } from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { HiGif } from "react-icons/hi2";
import { IoRefreshOutline, IoSend } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import Picker from 'emoji-picker-react';
import useAuth from "../Hooks/useAuth";
import { addFavoriteGif, deleteFavoriteGif, getFavoriteGifs, getGifs } from "../Api/axios";
import useDebounce from "../Hooks/useDebounce";
import { FaStar } from "react-icons/fa";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { AuthorProps } from "./Channel";

export interface GifProps {
  description?: string;
  gifUrl: string;
  gifWidth: number;
  gifHeight: number;
  previewUrl: string;
  previewWidth: number;
  previewHeight: number;
  author: AuthorProps;
  tenorId?: string;
}

// input field at the bottom of the page
const TextBar = ({ addMessage, name, widthmsg, refreshMessages, author }: { addMessage: (message: string, file: File | null, author: AuthorProps) => void, name: string, widthmsg: number, author: AuthorProps, refreshMessages: () => void }) => {
  const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [gifMenuOpen, setGifMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue && !file) return;
    const messageToSend = inputValue || "attachment";
    addMessage(messageToSend, file, author);
    setInputValue('');
    setFile(null);
  };

  const handleEmojiClick = (emoji: any) => {
    setInputValue(inputValue + emoji.emoji);
  };

  return (
    <form onSubmit={handleFormSubmit} className='flex w-auto flex-row items-center justify-between fixed bottom-3 rounded-lg right-1 shadow-lg bg-secondary px-2 h-12 m-2 mx-4' style={{ left: `calc(max(230px,15%))`, marginRight: `${widthmsg + 1.5}%` }}>
      {/* This is a button that will open file attachment menu */}
      <button type="button" tabIndex={0} onClick={handleFileInputClick}>
        <RiAttachment2 size='22' className='text-gray-300 mx-2 hover:text-gray-200' />
      </button>
      {file && <p className='text-gray-300 mx-2'>{file.name}</p>}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, application/pdf, image/gif"
      />
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
        {gifMenuOpen && <GifMenu addMessage={addMessage} author={author}/>}
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

const GifMenu = ({ addMessage, author }: { addMessage: (message: string, file: File | null, author: AuthorProps) => void, author: AuthorProps}) => {

  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [keyword, setKeyword] = useState("");
  const [favoriteGifs, setFavoriteGifs] = useState<GifProps[]>([]);
  const [gifs, setGifs] = useState<GifProps[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);
  const [file, setFile] = useState<File | null>(null);

  const fetchGifs = async () => {
    try {
      const response = await getGifs(auth.token, keyword);
      const formattedGifs = response.data.gifs.map((gif: any): GifProps => ({
        description: gif.description,
        gifUrl: gif.gif.url,
        previewUrl: gif.preview.url,
        gifWidth: gif.gif.dims.width,
        gifHeight: gif.gif.dims.height,
        previewHeight: gif.preview.dims.height,
        previewWidth: gif.preview.dims.width,
        author: gif.author,
        tenorId: gif.tenorId,
      }));
      setGifs(formattedGifs);
    }
    catch (error: any) {
    }
  }

  const fetchFavoriteGifs = async () => {
    try {
      const response = await getFavoriteGifs(auth.token);
      const formattedGifs = response.data.map((gif: any): GifProps => ({
        description: gif.description,
        gifUrl: gif.gif.url,
        previewUrl: gif.preview.url,
        gifWidth: gif.gif.dims.width,
        gifHeight: gif.gif.dims.height,
        previewHeight: gif.preview.dims.height,
        previewWidth: gif.preview.dims.width,
        author: gif.author,
      }));
      setFavoriteGifs(formattedGifs);
    }
    catch (error: any) {
    }
  }

  const checkIfFavorite = (gifUrl: string) => {
    return favoriteGifs.some((favoriteGif) => favoriteGif.gifUrl === gifUrl);
  }

  const addFavorite = async (gif: GifProps) => {
    try {
      await addFavoriteGif(auth.token, gif);
      setFavoriteGifs([...favoriteGifs, gif]);
    }
    catch (error: any) {
    }
  }

  const deleteFavorite = async (gifUrl: string) => {
    try {
      await deleteFavoriteGif(auth.token, gifUrl);
      setFavoriteGifs(favoriteGifs.filter((favoriteGif) => favoriteGif.gifUrl !== gifUrl));
    }
    catch (error: any) {
    }
  }

  useEffect(() => {
    let isMounted = true; // not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    if (isMounted) {
      fetchFavoriteGifs();
    };

    return () => {
      isMounted = false;
      controller.abort();
    };
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
      <section className="h-[440px] my-3 mx-auto overflow-y-scroll">
        <ul className="flex-col columns-2 gap-1 py-1">
          {!keyword && (
            <li>
              {favoriteGifs.map((gif) => (
                <div key={gif.gifUrl} className='m-2 break-inside-avoid'>
                    <Gif gif={gif} addMessage={addMessage} checkIfFavorite={checkIfFavorite} addFavorite={addFavorite} deleteFavorite={deleteFavorite} author={author}/>
                </div>
              ))}
            </li>
          )}
          {keyword && (
            <li>
              {gifs.map((gif) => (
                <div key={gif.gifUrl} className='m-2 break-inside-avoid'>
                    <Gif gif={gif} addMessage={addMessage} checkIfFavorite={checkIfFavorite} addFavorite={addFavorite} deleteFavorite={deleteFavorite} author={author}/>
                </div>
              ))}
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

export interface GifProps2 {
  gif: GifProps;
  addMessage: (message: string, file: File | null, author: AuthorProps) => void;
  checkIfFavorite: (gifUrl: string) => boolean;
  addFavorite: (gif: GifProps) => void;
  deleteFavorite: (gifUrl: string) => void;
  author: AuthorProps;
}


const Gif = ({ gif, addMessage, checkIfFavorite, addFavorite, deleteFavorite, author}: GifProps2) => {
  return (
    <div className='group relative'>
      <div style={{width: '180px', height: (gif.previewHeight / gif.previewWidth * 180)}}> { /* to properly load the gif while also using lazy load, image needs a fixed sized, because before loading it has 0 widht and height so it loads */}
      <LazyLoadComponent>
        <video
          autoPlay
          loop
          muted
          playsInline // for iOS xD
          preload="none"
          poster="/myphpol.png"
          className='object-cover rounded shadow-lg w-[180px] h-full'
          onClick={() => addMessage(gif.gifUrl, null, author)}>
          <source src={gif.previewUrl} type="video/mp4"/> 
        </video>
      </LazyLoadComponent>

      {checkIfFavorite(gif.gifUrl) ? (
        <button className='text-xl absolute top-0 text-yellow-500 p-2 rounded hover:bg-red-700 m-2' onClick={() => deleteFavorite(gif.gifUrl)}>
          <FaStar />
        </button>
      ) : (
        <button className='invisible group-hover:visible text-xl absolute top-0 text-white bg-slate-400 p-2 rounded hover:bg-slate-600 m-2' onClick={() => addFavorite(gif)}>
          <FaStar />
        </button>)}
        </div>
    </div>
  );
}
