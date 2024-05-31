import React, { useEffect, useRef, useState } from "react";
import { friends, messages } from "../fakedb";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile, FaUserFriends } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { HiGif } from "react-icons/hi2";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import { IconButton, UserAvatar } from "./IconLib";
import { MessageProps } from "./Channel";
import { Message } from "./Message";
import Server, { ServerProps } from "./Server";
import FriendMessage, { FriendProps } from "./FriendMessage";

interface DashBoardProps {
    friends: FriendProps[] | undefined;
    servers: ServerProps[] | undefined;
    mode: string;
    removeServer: (id: string) => void;
  }
  
  function Dashboard({ friends, servers, removeServer, mode }: DashBoardProps) {
    const renderFriends = () => {
      return friends?.map(({ id, username, picture }) => (
        <Link to={`/friends/${id}`}>
          <div
            key={id}
            className='flex-col flex w-full pt-2 pb-4 pl-[20px] h-auto text-5xl shadow-sg tracking-wider font-semibold text-white items-start'>
            <div className='flex mx-2 mr-2'>
              <UserAvatar
                name={username}
                picture={
                  picture
                    ? "https://localhost:7031/file/" +
                      picture
                    : undefined
                }
              />
              <div className='ml-2'> {username}</div>
            </div>
          </div>
        </Link>
      ));
    };
  
    const renderServers = () => {
        return servers?.map(({ id, name, description, picture }) => (
                <div
                    key={id}
                    className='flex-col flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-start'>
                    <Link to={`/server/${id}`}>
                        <div className='flex mx-2 mr-2 bg-tertiary p-2 rounded-full items-center px-5  hover:bg-yellow-500 hover:text-primary align-middle transition-all duration-300 ease-linear'>
                            <UserAvatar
                                name={name}
                                picture={
                                    picture
                                        ? "https://localhost:7031/file/" + picture
                                        : undefined
                                }
                            />
                            <div className='pl-2'>
                                {name} {description && `| ${description}`}
                            </div>
                        </div>
                    </Link>
                </div>
            ));
    };
  
    return (
      <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
        <h1 className='text-5xl font-bold mb-4 text-white mx-2 pl-[20px]'>
          {mode === "friends" ? "Your Friends" : "Your Servers"}
        </h1>
        {mode === "friends" ? renderFriends() : renderServers()}
      </div>
    );
  }
  
  export default Dashboard;
