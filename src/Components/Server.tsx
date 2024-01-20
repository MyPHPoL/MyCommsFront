import React, { useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import { serverChannels, users, servers } from "../fakedb";
import Channel from "./Channel";
import ServerMembers from "./ServerMembers";
import { MdRememberMe } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { ChannelButton, IconButton } from "./IconLib";

export interface ServerProps {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  ownerId: string;
  users: string[];
}

function Server() {
  const { ServerId } = useParams();
  console.log(ServerId)
  const Server = servers.find((server) => server.id === ServerId);
  const ServerOwner = users.find((user) => user.id === Server?.ownerId);
  const [showMembers, setShowMembers] = useState(false);
  const [widthmsg, setWidthmsg] = useState(0);

  const Channels = serverChannels.find(
    (channel) => channel.serverId === ServerId
  );
  return (
    <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-0 bg-tertiary ">
      <div className="flex items-center text-white text-3xl m-2 truncate h-10">
        {Server?.picture ? (
          <img src={Server?.picture} alt="No img" className="w-10 h-10 mr-2" />
        ) : null}
        {Server?.name}
        <div className="flex  items-center text-white  text-3xl m-2 mr-0 truncate h-10">
          <button className='flex-end' onClick={() => {setShowMembers(!showMembers); setWidthmsg(widthmsg === 0 ? 8 : 0)}}>
                  <IconButton icon={<MdRememberMe size={30}/>} name="ShowMembers"></IconButton>
          </button>
          {showMembers && <ServerMembers/>}
          </div>
      </div>
      <div className="text-white text-1xl m-2 truncate">
        {Server?.description}
      </div>
      <div className="text-white text-1xl m-2">
        Server created by: {ServerOwner?.name}
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
        {Channels?.channels.map(({id, name}) => (
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