import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import { users, servers, test12 } from "../fakedb";
import { UserAvatar } from "./IconLib";

function ServerMembers() {
  const { ServerId } = useParams();
  const Server = test12.find((server) => server.id === ServerId);
  
  // Find the members of the server
  const ServerMembers = Server?.users.map(userId => users.find(user => user.id === userId)) || [];

  return (
    <div className="flex flex-col items-start">
      <div className="md:flex h-auto w-[9%] -z-20 flex-col fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
        <ul className="w-full">
          {ServerMembers.map((user) => (
            user && (
              <li key={user.id} className="w-full">
                <div className="text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-2 bg-secondary py-2 px-4 shadow w-full items-start">
                  <div className="flex justify-start items-center w-full">
                    <UserAvatar name={user.name} picture={user.picture} />   
                    <span className="ml-2">{user.name}</span>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}


export default ServerMembers;