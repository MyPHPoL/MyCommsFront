import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./IconLib";
import { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";
import { MdDeleteForever } from "react-icons/md";

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
  
    return (
      <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
        {mode === "friends" ? renderFriends() : null }
        {mode === "servers" ? RenderServers(servers || []) : null }
      </div>
    );
  }
  
  export default Dashboard;

  function RenderServers (servers: ServerProps[]) {

    const [filteredServers, setFilteredServers] = useState(servers);

    // servers didn't want to load at first so i added this useEffect. it probably won't be necessary in the friends function
    useEffect(() => {

      let isMounted = true; // something, something not to render when component is unmounted
      const controller = new AbortController(); // cancels request when component unmounts

      isMounted && setFilteredServers(servers);

      return () => {
        isMounted = false;
        controller.abort();
      };

    }, [servers]);

    // easy way to filter servers by name
    const handleFilter = (event: any) => {
      const value = event.target.value;
      const filtered = servers.filter(server => server.name.includes(value));
      setFilteredServers(filtered);
    };

    return <>
      <h1 className='text-5xl font-bold my-4 text-white mx-2 pl-[20px]'> Your Servers </h1>
      <div className='relative w-[600px] h-12 my-2 pl-[20px]'>
        <input
            onChange={handleFilter}
            type='text'
            placeholder='Filter servers by name...'
            autoComplete='off'
            className='placeholder:color-white w-[600px] text-white h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
        />
      </div>
      {filteredServers?.map(({ id, name, description, picture }) => (
        <div
          key={id}
          className='group flex-row flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-center'>
          <Link to={`/server/${id}`}>
            <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] hover:bg-yellow-500 hover:text-primary align-middle transition-all duration-300 ease-linear'>
              <UserAvatar
                name={name}
                picture={
                  picture
                    ? "https://localhost:7031/file/" + picture
                    : undefined
                }
              />
              <div className='pl-2'>
                {name}
                <div className='text-base font-normal overflow-clip'>{description}</div>
              </div>
            </div>
          </Link>
          <button className="invisible group-hover:visible px-4 py-2 ml-0 text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                  onClick={() => console.log(id)}>
                  <MdDeleteForever size={25} /> 
          </button>
        </div>
      ))}
    </>
};
