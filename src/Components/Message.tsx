import { getUsername } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import { MessageProps } from "./Channel";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import CustomDialog from "./DialogTemplate";

export const Message = ({ id, authorId, body, creationDate }: MessageProps) => {
  const [username, setUsername] = useState('');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("Add Channel");
  const [dialogId, setPassedId] = useState("");

  // get username from authorId
  getUsername(auth.token, authorId).then((res) => {
    const username: string = res;
    setUsername(username);
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  //changed to accept Id so it can be used for both channels and servers
  const setDialogTypeAndOpen = (type: string, passedId: string) => {
    setDialogType(type);
    setPassedId(passedId);
    handleDialogOpen();
  }

  const removeMessage = (id: string) => {
    // remove message
  };


  return (
    <div className='w-full flex-row justify-evenly py-3 px-8 m-0 cursor-pointer border-tertiary border-b-2 hover:bg-tertiary'>
      <div className='flex flex-col justify-start ml-auto border-tertiary'>

        <p className='text-left font-semibold text-white mr-2 cursor-pointer'>
          {username}
          <small className='text-xs text-left font-semibold text-gray-500 ml-2'>
            {new Date(creationDate).toLocaleDateString()} {new Date(creationDate).toLocaleTimeString()}
          </small>
          <button className="ml-2 text-xs text-white rounded-lg radius-10 hover:bg-red-600"
            onClick={() => setDialogTypeAndOpen("deleteMessage", id)}>
            <MdDeleteForever size={25} />
          </button>
        </p>
        <p className='text-lg float-left text-white mr-auto whitespace-normal'>
          {body}
        </p>
      </div>
      <CustomDialog open={dialogOpen} handleClose={handleDialogClose} type={dialogType} passedId={dialogId} removeMessage={removeMessage} />
    </div>
  )
};