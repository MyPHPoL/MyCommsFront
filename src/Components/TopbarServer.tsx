import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ServerButton } from "./IconLib";

import Server, { ServerProps } from "./Server";

interface TopbarProps {
  servers?: ServerProps[];
}

export default function TopbarServer({ servers }: TopbarProps) {
  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
        <ul className='m-4 first:my-0 last:my-0 flex flex-row'>
          {servers?.map(({ id, name, picture }) => (
            <li className="mr-1" key={id}>
              <Link to={id}>
                <ServerButton name={name} picture={picture} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route path='/:ServerId/*' element={<Server />} />
      </Routes>
    </div>
  );
}


