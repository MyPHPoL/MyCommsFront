import React, { useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import { serverChannels, users, servers } from "../fakedb";
import Channel from "./Channel";
import ServerMembers from "./ServerMembers";

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
            <div className="justify-center flex flex-col m-1">
            <div className="justify-center flex flex-col m-1">
            <button onClick={() => setShowMembers(!showMembers)}>
                <ChannelButton name='ShowMembers'></ChannelButton>
            </button>
            {showMembers && <ServerMembers/>}
          </div>
          </div>
          <div className={showMembers ? 'right-[0%]' : 'right-[95%]'}>
  </div>
      </div>
      <Routes>
        <Route path="/:ChannelId/*" element={<Channel />} />
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

export default Server;