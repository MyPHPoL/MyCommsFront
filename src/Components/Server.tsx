import React, { useContext, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import Channel, { ChannelProps } from "./Channel";
import ServerMembers from "./ServerMembers";
import { MdRememberMe } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { ChannelButton, IconButton } from "./IconLib";
import { useEffect } from "react";
import { getChannels, getServer } from "../Api/axios";
import DataContext from "../Context/AuthProvider";
import { enqueueSnackbar } from 'notistack';

export interface ServerProps {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  ownerId: string;
}

function Server() {

  const { ServerId } = useParams();
  const [server, setServer] = useState<ServerProps | undefined>();
  const [channels, setChannels] = useState<ChannelProps[] | undefined>();
  const { auth }: { auth: any } = useContext(DataContext); // id, username, email, password, token
  const [showMembers, setShowMembers] = useState(false);
  const [widthmsg, setWidthmsg] = useState(0);

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    const fetchServer = async () => {
        try {
            const response = await getServer(auth.token, ServerId || '');
            isMounted && setServer(response.data);
        } catch (error: any) {
          enqueueSnackbar("We couldn't load this server. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
        }
    }

    const fetchChannels = async () => {
        try {
            const response = await getChannels(auth.token, ServerId || '');
            isMounted && setChannels(response.data);
        } catch (error: any) {
          enqueueSnackbar("We couldn't load this servers channel list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
        }
    }

    fetchServer();
    fetchChannels();

    return () => {
        isMounted = false;
        controller.abort();
    };

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [ServerId]);

  return (
    <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-0 bg-tertiary ">
      <div className="flex items-center text-white text-3xl m-2 truncate h-10">
        {server?.picture ? (
          <img src={server?.picture} alt="No img" className="w-10 h-10 mr-2" />
        ) : null}
        {server?.name}
        <div className="flex  items-center text-white  text-3xl m-2 mr-0 truncate h-10">
          <button className='flex-end' onClick={() => {setShowMembers(!showMembers); setWidthmsg(widthmsg === 0 ? 8 : 0)}}>
                  <IconButton icon={<MdRememberMe size={30}/>} name="ShowMembers"></IconButton>
          </button>
          {showMembers && <ServerMembers/>}
          </div>
      </div>
      <div className="text-white text-1xl m-2 truncate">
        {server?.description}
      </div>
      <div className="my-1 ml-2 xl:w-auto">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <input type="search" className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal text-neutral-700 outline-none transition duration-200 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200" placeholder="Search" />
              <span className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
                  <FaSearch size={20}/>
              </span>
          </div>
      </div>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-1 mx-auto my-4 bg-gray-200 border-0"></hr>
        <span className="absolute px-3 font-semibold text-gray-300 -translate-x-1/2 bg-tertiary left-1/2">
          All Channels
        </span>
      </div>
      <ul>
        {channels?.map(({id, name}) => (
          <li key={id}>
            <Link to={id}>
              <div className="justify-left flex flex-col m-1">
                <button>
                  <ChannelButton name={`#${name}`} ></ChannelButton>
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="items-center align-center flex flex-col ml-1">
        <button>
          <IconButton icon={<FaRegPlusSquare size={30}/>} name="AddChannel"></IconButton>
        </button>
      </div>
              <Routes>
                <Route path="/:ChannelId/*" element={<Channel widthmsg={widthmsg}/>} />
              </Routes>
      </div>
  );
}

export default Server;