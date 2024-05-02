import { getUsername, getFile } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import { MessageProps } from "./Channel";
import React, { useState } from "react";

export const Message = ({ authorId, body, creationDate, attachment }: MessageProps) => {
  const [username, setUsername] = useState('');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const getFileUrl = (attachment: string) => `https://localhost:7031/file/${attachment}`;
  const gifRegex: RegExp = /^https:\/\/(?:media1*)?\.?tenor\.com\/.*/g; //check if the sent message fits tenor gif format
  const youtubeRegex: RegExp = /(^https:\/\/www\.youtube\.com\/watch\?v=).*/g; //check if the sent message fits youtube video format
  const shortYoutubeRegex: RegExp = /(^https:\/\/youtu\.be\/).*/g; //check if the sent message fits mobile youtube video format (needs to be converted in order to work)
  var isYoutube: boolean = body.match(youtubeRegex) ? true : false;
  if(shortYoutubeRegex.test(body)){
    body = body.replace('youtu.be/', 'youtube.com/watch?v=');
    isYoutube = true;
  }
  getUsername(auth.token, authorId).then((res) => {
    const username: string = res;
    setUsername(username);
  });
  const isGif: boolean = body.match(gifRegex) ? true : false;
  
  if (isGif) {
    return (
      <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
            {username}
            <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
              {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
            </small>
          </p>
          <img loading="lazy" src={body} className='w-1/4 object-scale-down max-h-96 max-w-96' alt="attachement"/>
        </div>
      </div>
    )//gif limited to smaller size, 
  } else if (attachment) {
    const attachmentUrl = 'Check';
    return (
      <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
            {username}
            <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
              {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
            </small>
          </p>
          <p className='text-lg float-left text-white mr-auto whitespace-normal'>
            {body}
          </p>
          {attachment && <img loading="lazy" src={getFileUrl(attachment)} className='w-1/4 object-scale-down max-h-96 max-w-96' alt="attachement"/>}
        </div>
      </div>
    )
  } else if (isYoutube) {
    return (
      <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
            {username}
            <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
              {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
            </small>
          </p>
          <iframe loading="lazy" width="560" height="315" src={body.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
        </div>
      </div>
    )
  } else {
    return (
      <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>

          <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
            {username}
            <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
              {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
            </small>
          </p>
          <p className='text-lg float-left text-white mr-auto whitespace-normal'>
            {body}
          </p>
        </div>
      </div>
    )
  }
};

