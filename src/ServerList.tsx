import React from 'react';
import Server from './Server';

interface ServerListProps {
    servers: any[];
}

export default function ServerList({servers}: ServerListProps) {
    return(
        <div>
            {servers.map(el=><Server id={el.id} name={el.name} ownerId={el.ownerId} description={el.description} picture={el.picture}/>)}<br></br>
        </div>
    );
}