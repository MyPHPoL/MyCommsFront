import React, { useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import { serverChannels, users, servers } from "../fakedb";
import Channel from "./Channel";
import ServerMembers from "./ServerMembers";
import { MdRememberMe } from "react-icons/md";

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
  const Server = servers.find((server) => server.id === ServerId);
  const ServerOwner = users.find((user) => user.id === Server?.ownerId);
  const [showMembers, setShowMembers] = useState(false);
  const [widthmsg, setWidthmsg] = useState(0);

  const Channels = serverChannels.find(
    (channel) => channel.serverId === ServerId
  );
  return (
    <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-0 bg-tertiary">
      <div className="flex items-center text-white text-3xl m-2 truncate h-10">
        {Server?.picture ? (
          <img src={Server?.picture} alt="No img" className="w-10 h-10 mr-2" />
        ) : null}
        {Server?.name}
        <div className="flex items-center text-white text-3xl m-2 truncate h-10 align-right">
          <button onClick={() => {setShowMembers(!showMembers); setWidthmsg(widthmsg === 0 ? 10 : 0)}}>
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
              <div className="justify-center flex flex-col m-1">
                <button>
                  <ChannelButton name={name}></ChannelButton>
                </button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="justify-center flex flex-col m-1">
        <button>
          <NewChannelButton text={"Add Channel"}></NewChannelButton>
        </button>
              </div>
              <Routes>
                <Route path="/:ChannelId/*" element={<Channel widthmsg={widthmsg}/>} />
              </Routes>
          </div>
  );
}

// button that redirects to a specific channel
const ChannelButton = ({ name }: { name: string }) => (
  <div className="bg-secondary hover:brightness-75 text-gray-300 font-semibold py-2 px-4 border border-gray-300 rounded-full shadow w-full justify-self-center">
    {name}
  </div>
);

// same as channel button but with dashed border
const NewChannelButton = ({ text }: { text: string }) => (
  <div className="bg-secondary hover:brightness-75 text-gray-300 font-semibold py-2 px-4 border border-dashed border-gray-300 rounded-full shadow w-full justify-self-center">
    {text}
  </div>
);

interface IconButtonProps {
  icon: any;
  name: string;
}

const IconButton = ({ icon, name }: IconButtonProps) => (
  <div className='font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 bg-secondary group hover:bg-yellow-500 text-white hover:text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'>
    {icon}

    <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left'>
      {name}
    </span>
  </div>
);


export default Server;