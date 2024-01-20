import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ServerButton } from "./IconLib";

import FriendMessage from "./FriendMessage";

interface TopbarProps {
  items: any[];
}

export default function TopbarFriend({ items }: TopbarProps) {
  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
        <ul className='m-4 first:my-0 last:my-0 flex flex-row'>
          {items.map(({ id, name, picture }) => (
            <li className="mr-1" key={id}>
              <Link to={id}>
                <ServerButton name={name} picture={picture} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route path='/:UserId/*' element={<FriendMessage />} />
      </Routes>
    </div>
  );
}
