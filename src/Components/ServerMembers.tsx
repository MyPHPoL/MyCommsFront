import React from "react";
import "../index.css";
import { UserAvatar } from "./IconLib";
import { UserProps } from "./User";

interface ServerMembersProps {
  serverMembers: UserProps[];
}

function ServerMembers({ serverMembers }: ServerMembersProps) {

  return (
    <div className="flex flex-col items-start">
      <div className="md:flex h-auto w-[300px] -z-20 flex-col text-sm fixed inset-y-0 top-20 right-0 bg-tertiary align:right">
        <div className="flex m-2 text-white text-xl font-semibold items-center">
          All Members
        </div>
        <ul>
          {serverMembers.map((user) => ( // Fix the map function
            <li key={user.id} className="w-full">
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white mr-2 pl-2 border-[1px] border-tertiary hover:bg-secondary py-2 px-4 shadow w-full items-start">
                <div className="flex justify-start items-center w-full">
                  <div className="scale-75"><UserAvatar name={user.username} /></div>
                  <span className="ml-2">{user.username}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServerMembers;