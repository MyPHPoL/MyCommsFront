import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import Channel, { ChannelProps } from "./Channel";
import ServerMembers from "./ServerMembers";
import { MdRememberMe } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { ChannelButton, IconButton } from "./IconLib";
import { getChannels, getServer } from "../Api/axios";
import { enqueueSnackbar } from 'notistack';
import { MdMoreHoriz } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import useAuth from "../Hooks/useAuth";

export interface ServerProps {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  ownerId: string;
}

function Server() {

  const { ServerId } = useParams();
  const [server, setServer] = useState<ServerProps | undefined>();
  const [channels, setChannels] = useState<ChannelProps[] | undefined>();
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  // const Server = test12.find((server) => server.id === ServerId);
  // const ServerOwner = users.find((user) => user.id === Server?.ownerId);
  const [showMembers, setShowMembers] = useState(false);
  const [widthmsg, setWidthmsg] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showChannels, setShowChannels] = useState(false);


  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    const fetchServer = async () => {
      try {
        const response = await getServer(auth.token, ServerId || '');
        isMounted && setServer(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load this server. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }

    const fetchChannels = async () => {
      try {
        const response = await getChannels(auth.token, ServerId || '');
        isMounted && setChannels(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load this servers channel list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }

    fetchServer();
    fetchChannels();

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServerId]);

  return (
    <div>
      <div className="md:flex h-full w-[300px] -z-20 flex-col fixed inset-y-0 top-20 left-0 bg-tertiary overflow-visible">
        <div className="flex items-center text-white text-3xl m-2 truncate h-10">
          {server?.picture ? (
            <img src={server?.picture} alt="No img" className="w-10 h-10 mr-2" />
          ) : null}
          {server?.name}
          <div className="flex items-center text-white  text-3xl m-2 mr-0 truncate h-10">
            <div>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <IconButton
                  icon={<MdMoreHoriz size={30} />}
                  name="ShowMembers"
                ></IconButton>
              </button>
            </div>

            {dropdownOpen && (
              <div className="origin-top-right flex absolute h-auto right-[-300px]  mt-9 w-full rounded-md shadow-lg  bg-primary ring-1 ring-white ring-opacity-50 ">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu
                "
                >
                  <button
                    className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-tertiary"
                    role="menuitem"
                    onClick={() => {
                      setShowMembers(!showMembers);
                      setWidthmsg(widthmsg === 0 ? 8 : 0);
                    }}
                  >
                    <MdRememberMe size={25} /> Show Members
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-tertiary"
                    role="menuitem"
                  >
                    <FaRegPlusSquare size={25} />  Add Channel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-white text-1xl m-2 truncate">
          {server?.description}
        </div>
        <div className="my-1 ml-2 xl:w-auto">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input type="search" className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal text-neutral-700 outline-none transition duration-200 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200" placeholder="Search" />
            <span className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
              <FaSearch size={20} />
            </span>
          </div>
          <button className="flex m-2 text-white font-semibold" onClick={() => setShowChannels(!showChannels)}>
            PH Channel Group <IoMdArrowDropdown size='25' />
          </button>
          {showChannels && (
            <ul>
              {channels?.map(({ id, name }) => (
                <li key={id}>
                  <Link to={''+id}>
                    <div className="justify-left flex flex-col m-1">
                      <button>
                        <ChannelButton name={`#${name}`}></ChannelButton>
                      </button>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Routes>
          <Route path="/:ChannelId/*" element={<Channel widthmsg={widthmsg} />} />
        </Routes>
      </div>
      {showMembers && <ServerMembers />}
    </div>
  );
}

export default Server;
