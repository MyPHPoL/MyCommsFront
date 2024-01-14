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
      <div className="md:flex h-auto w-auto -z-20 flex-col fixed inset-y-0 top-20 right-[20] bg-black">
        <ul>
          {ServerMembers.map((user) => ( // Map over the members
            user && ( // Check if the user is defined
              <li key={user.id}>
                <div className="justify-center flex flex-col m-1">
                  {user.name} // Display the member's name
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