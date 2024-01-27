import React, { useState } from "react";
import "../index.css";
import { UserAvatar } from "./IconLib";
import { IoMdArrowDropdown } from "react-icons/io";
import { UserProps } from "./User";

interface ServerMembersProps {
  serverMembers: UserProps[];
}

function ServerMembers({ serverMembers }: ServerMembersProps) {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="flex flex-col items-start">
      <div className="md:flex h-auto w-[9%] -z-20 flex-col text-sm fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
        <button className="flex m-2 text-white text-xl font-semibold items-center" onClick={() => setShowMembers(!showMembers)}>
          All Members <IoMdArrowDropdown size='25' />
        </button>
        {showMembers && (
          <ul>
            {serverMembers.map((user) => ( // Fix the map function
              <li key={user.id} className="w-full">
                <div className="text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-2 bg-secondary py-2 px-4 shadow w-full items-start">
                  <div className="flex justify-start items-center w-full">
                    <div className="scale-75"><UserAvatar name={user.username}/></div>
                    <span className="ml-2">{user.username}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServerMembers;