import React from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import { users, test12} from "../fakedb";
import { TfiLayoutPlaceholder } from "react-icons/tfi";


function ServerMembers() {
  const { ServerId } = useParams();
  const Server = test12.find((server) => server.id === ServerId);
  
  // Find the members of the server
  const ServerMembers = Server?.users.map(userId => users.find(user => user.id === userId)) || [];

  return (
    <div>
      <div className="md:flex h-auto w-[9%] -z-20 flex-col fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
        <ul>
          {ServerMembers.map((user) => ( // Map over the members
            user && ( // Check if the user is defined
              <li key={user.id}>
                <div className="justify-center  text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-2 bg-secondary py-2 px-4 shadow w-full justify-self-center">
                  <div className="flex flex-row">
                    <TfiLayoutPlaceholder className="mx-2" size={30}></TfiLayoutPlaceholder>
                    {user.name}
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