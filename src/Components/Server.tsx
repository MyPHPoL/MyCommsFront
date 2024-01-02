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
    let { id } = useParams();
    return(
    // Now you can use this id to fetch server data or do something else
    <div className='align-middle text-white'>
        <h1>Server {id}</h1>
    </div>
    );
  };

export default Server;