import React from "react";
import { useParams } from 'react-router-dom';
import "../index.css";

export interface ServerProps {
    id: string;
    name: string;
    description?: string;
    picture?: string;
    ownerId: string;
}

function Server() {
    const { ServerId } = useParams();
    console.log(ServerId);
    return (
        <div className='text-white size-11 left-10 top-10'>
            {ServerId}
        </div>
      );
  };

export default Server;