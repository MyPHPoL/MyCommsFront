import React from "react";
import { useParams } from 'react-router-dom';
import "../index.css";
import { servers } from "../App";

export interface ServerProps {
    id: string;
    name: string;
    description?: string;
    picture?: string;
    ownerId: string;
}

function Server() {
    const { ServerId } = useParams();
    const Server = servers.find((server) => server.id === ServerId);
    return (
        <div className='md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-20 bg-tertiary'>
            <div className='text-white text-3xl m-2'>{Server?.name}</div>
            <div className='text-white text-1xl m-2'>{Server?.description}</div>
            <div className='text-white text-1xl m-2'>{Server?.ownerId}</div>
        </div>
      );
  };

export default Server;