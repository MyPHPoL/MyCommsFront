import React from "react";
import { Route, Link, Routes, useMatch, useRoutes } from "react-router-dom";
import { ServerButton } from "./IconLib";

import Server, { ServerProps } from "./Server";

interface TopbarProps {
  servers?: ServerProps[];
}

export default function TopbarServer({ servers }: TopbarProps) {

  const match = useMatch("/:ServerId/*");
  const server = servers?.find((server) => server.id === match?.params.ServerId);

  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
        <ul className='m-4 first:my-0 last:my-0 flex flex-row'>
          {servers?.map((server) => (
            <li className="mr-1" key={server.id}  onClick={(event) => console.log(server)}>
              <Link to={server.id}>
                <ServerButton name={server.name} picture={server.picture} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        {server && <Route path="/:ServerId/*" element={<Server {...server}/>}/>}
      </Routes>
    </div>
  );
}


