import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import { users, servers } from "../fakedb";


function ServerMembers() {
  const { ServerId } = useParams();
  const Server = servers.find((server) => server.id === ServerId);
  
  // Find the members of the server
  const ServerMembers = Server?.users.map(userId => users.find(user => user.id === userId)) || [];

  return (
    <div>
      <div className="md:flex h-auto w-[9%] -z-20 flex-col fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
        <ul>
          {ServerMembers.map((user) => ( // Map over the members
            user && ( // Check if the user is defined
              <li key={user.id}>
                <div className="justify-center text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-5 bg-secondary py-2 px-4 shadow w-full justify-self-center">
                  PH {user.name} 
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