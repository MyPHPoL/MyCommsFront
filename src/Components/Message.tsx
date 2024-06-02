import { getUsername, getFile } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import DeleteMessageConfirmation from "./DialogPopups/DeleteMessageConfirmation";

export interface MessagePropsWithDelete {
  id: string,
  authorId: string,
  body: string,
  creationDate: string
  attachment: string | null
  removeMessage: (id: string) => void
}

export const Message = ({ id, authorId, body, creationDate, attachment, removeMessage }: MessagePropsWithDelete) => {
  const [username, setUsername] = useState('');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const getFileUrl = (attachment: string) => `https://localhost:7031/file/${attachment}`;
  const gifRegex: RegExp = /^https:\/\/(?:media1*)?\.?tenor\.com\/.*/g; //check if the sent message fits tenor gif format
  const youtubeRegex: RegExp = /(^https:\/\/www\.youtube\.com\/watch\?v=).*/g; //check if the sent message fits youtube video format
  const shortYoutubeRegex: RegExp = /(^https:\/\/youtu\.be\/).*/g; //check if the sent message fits mobile youtube video format (needs to be converted in order to work)
  var isYoutube: boolean = body.match(youtubeRegex) ? true : false;
  const steamWidget: boolean = body.match(/(^https:\/\/store\.steampowered\.com\/widget\/).*/g) ? true : false;
  const steamApp: boolean = body.match(/(^https:\/\/store\.steampowered\.com\/app\/).*/g) ? true : false;
  const [fileType, setFileType] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if(shortYoutubeRegex.test(body)){
    body = body.replace('youtu.be/', 'youtube.com/watch?v=');
    isYoutube = true;
  }
  getUsername(auth.token, authorId).then((res) => {
    const username: string = res;
    setUsername(username);
  });
  const isGif: boolean = body.match(gifRegex) ? true : false;
  
  if(steamApp){
  body = body.replace('/app/', '/widget/')
  }


  useEffect(() => {
    if (attachment) {
      getFile(auth.token, attachment).then(response => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const fileReader = new FileReader();
  
        fileReader.onloadend = () => {
          const result = fileReader.result as string;
          const mimeType = result.split(':')[1].split(';')[0];
          setFileType(mimeType);
        };
  
        fileReader.onerror = () => {
          console.error('Failed to read file');
        };
  
        fileReader.readAsDataURL(blob);
      });
    }
  }, [attachment, auth.token]);

  if (isGif) {
    return (
      <div className='group w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
            <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
              {username}
              <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
                {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
              </small>
            </p>
            <img loading="lazy" src={body} className='w-1/4 object-scale-down max-h-96 max-w-96' alt="attachement" />
          </div>
        </div>
        <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
      </div>
    )
  } else if (attachment) {
    
    if (fileType === 'application/pdf') {
      return (
        <div className='group w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
          <div className='flex flex-col justify-start ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
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
            <div className='flex items-center text-left font-semibold text-white mr-2 cursor-pointer' onClick={() => window.open(getFileUrl(attachment), '_blank')}>
              <FaFilePdf className='w-6 h-6 mr-2' />
              <p>PDF File</p>
            </div>
          </div>
          <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
        </div>
      );
    } else {
    return (
      <div className='group w-full py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary text-ellipsis truncate break-all'>
        <div className='flex flex-col ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
            <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
              {username}
              <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
                {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
              </small>
            </p>
          </div>
          <p className='text-lg float-left text-white mr-auto whitespace-normal'>
            {body}
          </p>
          {attachment && <img loading="lazy" src={getFileUrl(attachment)} className='w-1/4 object-scale-down max-h-96 max-w-96' alt="attachement" />}
        </div>
        <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
      </div>
    )
  }
  } else if (isYoutube) {
    return (
      <div className='group w-full py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
        <div className='flex flex-col ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
            <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
              {username}
              <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
                {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
              </small>
            </p>
          </div>
          <iframe title="youtube-link" loading="lazy" width="560" height="315" src={body.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
        </div>
        <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
      </div>
    )
  } else if (steamWidget || steamApp) { 
    return (
      <div className='group w-full flex-row py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary text-ellipsis truncate break-all'>
        <div className='flex flex-col ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
            <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
              {username}
              <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
                {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
              </small>
            </p>
          </div>
          <iframe title="steam-link" loading="lazy" width="646" height="190" src={body}></iframe>
        </div>
        <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
      </div>
    )
  } else {
    return (
      <div className='group w-full justify-evenly flex-row py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary text-ellipsis truncate break-all'>
        <div className='flex flex-col ml-auto border-tertiary'>
          <div>
            {(auth.id === authorId) ?
              <button className="invisible group-hover:visible w-7 h-7 text-xs float-right text-white rounded-lg radius-10 hover:bg-red-600 self-end"
                onClick={() => handleDialogOpen()}>
                <MdDeleteForever size={25} />
              </button> : null}
            <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
              {username}
              <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
                {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
              </small>
            </p>
            <p className='justify-start ml-auto text-lg float-left text-white mr-auto whitespace-normal'>
              {body}
            </p>
          </div>
        </div>
        <DeleteMessageConfirmation open={dialogOpen} handleClose={handleDialogClose} passedId={id} removeMessage={removeMessage} />
      </div>
    )
  }
};

