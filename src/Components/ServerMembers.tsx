import React from "react";
import { Route, Link, Routes } from "react-router-dom";

import Server from "./Server";

interface ServerMembersProps {
  items: any[];
}

export default function ServerMembers({ items }: ServerMembersProps) {
  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
        <ul className='m-4 first:my-0 last:my-0 flex flex-row'>
          {items.map(({ id, name, picture }) => (
            <li className="mr-1" key={id}>
              <Link to={id}>
                <MemberList name={name} picture={picture} />
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


interface MemberListProps {
  name: string;
  picture?: string;
}

export var colors = [
  "#d4ac0d",
  "#d35400",
  "#a9cce3",
  "#d7bde2",
  "#28b463",
  "#34495e",
  "#abebc6",
  "#eaecee",
  "#633974",
  "#ebdef0",
  "#17a589",
  "#2e86c1",
  "#FF5733",
  "#330045",
];

// buttons for servers or friends (dynamically changing background color or server picture as background)
const MemberList = ({ name, picture }: MemberListProps) => (
  <div
    className='group font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'
    style={{
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    }}>
    {picture ? (
      <picture
        className='group bg-center bg-cover w-full h-full rounded-full hover:bg-center hover:bg-cover hover:w-full hover:h-full'
        style={{ backgroundImage: `url(${picture})` }}></picture>
    ) : (
      name[0].toUpperCase()
    )}

    <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left'>
      {name}
    </span>
  </div>
);
