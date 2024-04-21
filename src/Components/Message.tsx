import { getUsername } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import { MessageProps } from "./Channel";
import React, { useState } from "react";

export const Message = ({ authorId, body, creationDate }: MessageProps) => {
  const [username, setUsername] = useState('');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const gifRegex: RegExp = /^(https\:\/\/media\.tenor\.com\/).*(\.gif)/g; //check if the sent message fits tenor gif format
  
  // get username from authorId
  getUsername(auth.token, authorId).then((res) => {
    const username: string = res;
    setUsername(username);
  });
  const isGif: boolean = body.match(gifRegex) ? true : false;

  if(isGif) {
    return (
      <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
            {username}
            <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
              {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
            </small>
          </p>
          <img src={body} className='w-1/4 object-scale-down max-h-96 max-w-96'></img> 
        </div>
      </div>
    )//gif limited to smaller size, 
  }else{
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