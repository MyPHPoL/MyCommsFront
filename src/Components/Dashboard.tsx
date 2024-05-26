import React, { useEffect, useRef, useState } from "react";
import { friends, messages } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { UserAvatar } from "./IconLib";
import { MessageProps } from "./Channel";
import { Message } from "./Message";
import Server, { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";

interface DashBoardProps {
  friends: FriendProps[] | undefined;
  servers: ServerProps[] | undefined;
  removeServer: (id: string) => void;
}

function Dashboard({ friends, servers, removeServer }: DashBoardProps) {

  return (
      <div className='md:flex h-auto w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
          {friends &&
              friends.map(({ id, username, picture }) => (
                  <div
                      key={id}
                      className='flex-col flex w-full pt-2 pb-4 pl-[20px] bg-tertiary h-auto text-5xl shadow-sg tracking-wider font-semibold text-white items-center'>
                      <div className='flex mx-2'>
                          <UserAvatar name={username} />
                      </div>
                      {username}
                  </div>
              ))}
          {servers &&
              servers.map(({ id, name, description }) => (
                  <Link to={`/server/${id}`}>
                      <div
                          key={id}
                          className='flex-col flex w-full pt-2 pb-4 pl-[20px] bg-tertiary h-auto text-5xl shadow-sg tracking-wider font-semibold text-white items-center'>
                          <div className='flex mx-2'>
                              <UserAvatar name={name} />
                          </div>
                          {name} | {description}
                      </div>
                  </Link>
              ))}

          <Routes>
              <Route
                  path=':ServerId/*'
                  element={<Server removeServer={removeServer} />}
              />
          </Routes>
      </div>
  );
}


export default Dashboard;
