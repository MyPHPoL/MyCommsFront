import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import { serverChannels, users, servers } from "../fakedb";
import Channel from "./ChannelParams";

export interface ServerProps {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  ownerId: string;
}

class ServerClassTmp extends React.Component<{ServerId: string}, any> {
    state: any = 
    {
            serverId: this.props.ServerId as string,
            server: servers.find((server) => server.id === this.props.ServerId) as ServerProps,
            serverOwner: users.find((user) => user.id === this.state.server?.ownerId),
            channels: serverChannels.find((channel) => channel.serverId === this.props.ServerId), 

    };
    render() {
        return (
        <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-20 bg-tertiary">
            <div className="flex items-center text-white text-3xl m-2 truncate h-10">
            {this.state.server?.picture ? (
                <img src={this.state.server?.picture} alt="No img" className="w-10 h-10 mr-2" />
            ) : null}
            {this.state.server?.name}
            </div>
            <div className="text-white text-1xl m-2 truncate">
            {this.state.server?.description}
            </div>
            <div className="text-white text-1xl m-2">
            Server created by: {this.state.serverOwner?.name}
            </div>
            <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-1 mx-auto my-4 bg-gray-200 border-0"></hr>
            <span className="absolute px-3 font-semibold text-gray-300 -translate-x-1/2 bg-tertiary left-1/2">
                All Channels
            </span>
            </div>
            <ul>
            {this.state.channels?.channels.map(({id, name}: {id: string, name: string}) => (
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
            <Route path="/:ChannelId/*" element={<Channel />} />
            </Routes>
        </div>
        );
    }
    }

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

export default ServerClassTmp;