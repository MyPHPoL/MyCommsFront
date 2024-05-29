import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "../index.css";
import Channel, { ChannelProps } from "./Channel";
import ServerMembers from "./ServerMembers";
import { MdRememberMe } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { ChannelButton, IconButton } from "./IconLib";
import { getChannels, getServer, getServerMembers } from "../Api/axios";
import { enqueueSnackbar } from 'notistack';
import { MdMoreHoriz } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDescription } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import ServerDescDialog from './DialogPopups/ServerDescDialog';
import EditChannelDialog from "./DialogPopups/EditChannelDialog";
import { MdDeleteForever } from "react-icons/md";
import { UserProps } from "./User";
import { IconContext } from 'react-icons';
import { useTitle } from "../Hooks/useTitle";
import { MdEdit } from "react-icons/md";
import DeleteChannelConfirmation from "./DialogPopups/DeleteChannelConfirmation";
import DeleteServerConfirmation from "./DialogPopups/DeleteServerConfirmation";
import EditServerDialog from "./DialogPopups/EditServerDialog";
import { useLocation } from 'react-router-dom';
import { Add } from "@mui/icons-material";
import AddChannelDialog from "./DialogPopups/AddChannelDialog";
export interface ServerProps {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  ownerId: string;
}

interface AdditionalProps {
  removeServer: (id: string) => void;
}

function Server({ removeServer }: AdditionalProps) {

  const { ServerId } = useParams();
  const [server, setServer] = useState<ServerProps | undefined>();
  const [channels, setChannels] = useState<ChannelProps[] | undefined>();
  const [serverMembers, setServerMembers] = useState<UserProps[]>([]);
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token

  const [showMembers, setShowMembers] = useState(false);
  const [widthmsg, setWidthmsg] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showChannels, setShowChannels] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogType, setDialogType] = useState("Add Channel");
  const [dialogId, setPassedId] = useState("");
  const [tmpChannel, setTmpChannel] = useState<ChannelProps | undefined>();
  const [toBeRemovedId, settoBeRemoved] = useState('');
  const [toBeEditedChannel, setToBeEditedChannel] = useState<ChannelProps>();
  const [editedChannel, setEditedChannel] = useState<ChannelProps | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serverDeleteOpen, setServerDeleteOpen] = useState(false);
  const [serverEditOpen, setServerEditOpen] = useState(false);
  const [editDesc, setEditDesc] = useState(server?.description ?? "");
  const [editName, setEditName] = useState(server?.name ?? "");
  const location = useLocation();
  
  const handleServerEditOpen = () => {
    setServerEditOpen(true);
  }
  const handleServerEditClose = () => {
    setServerEditOpen(false);
  }
  const handleServerDeleteOpen = () => {
    setServerDeleteOpen(true);
  }
  const handleServerDeleteClose = () => {
    setServerDeleteOpen(false);
  }

  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  }

  const handleDialogEditOpen = () => {
    setDialogEditOpen(true);
  };

  const handleDialogEditClose = () => {
    setDialogEditOpen(false);
  };
  const handleDialogAddOpen = () => {
    setDialogAddOpen(true);
  };
  const handleDialogAddClose = () => {
    setDialogAddOpen(false);
  };
  //changed to accept Id so it can be used for both channels and servers
  const setDialogTypeAndOpen = (type: string, passedId: string) => {
    setDialogType(type);
    setPassedId(passedId);
    if (type === "EditChannel") {
      setToBeEditedChannel(channels?.find((channel) => channel.id === passedId));
    }
    if(type === "Add Channel"){
      handleDialogAddOpen();
    }else{
    handleDialogEditOpen();
    }
  }

  const pushChannel = (channel: ChannelProps) => {
    setTmpChannel(channel);
  }

  const removeChannel = (id: string) => {
    settoBeRemoved(id);
  }

  const handleRemoveServer = (id: string) => {
    setPassedId(id);
    handleServerDeleteOpen();
  }
  const handleEditServer = (id: string) => {
    setEditName(server?.name ?? "");
    setEditDesc(server?.description ?? "");
    setPassedId(id);
    handleServerEditOpen();
  }

  const setChannelEdit = (channel: ChannelProps) => {
    setEditedChannel(channel);
  }
  const handleDelete = (channelId: string) => {
    setPassedId(channelId);
    handleDeleteOpen();
  }
  useEffect(() => {
    if (editedChannel) {
      if (channels) {
        setChannels(channels.map((channel) => channel.id === editedChannel.id ? editedChannel : channel));
      }
    }
  }, [editedChannel])

  useEffect(() => {
    if (tmpChannel) {
      console.log(tmpChannel);
      if (channels) {
        setChannels([...channels, tmpChannel]);
      }
    }
  }, [tmpChannel])

  useEffect(() => {
    if (toBeRemovedId) {
      if (channels) {
        setChannels(channels.filter((channel) => channel.id !== toBeRemovedId));
      }
    }
  }, [toBeRemovedId])

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

    const fetchServerMembers = async () => {
      try {
        const response = await getServerMembers(auth.token, ServerId || '');
        isMounted && setServerMembers(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load this servers member list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }

    if (location.pathname.startsWith(`/server/${ServerId}`)) {
      fetchServer();
      fetchChannels();
      fetchServerMembers();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ServerId]);

  useTitle(`MyCommsPoL | ${server?.name}`)

  return (
    <div>
      <div className="md:flex h-full w-[15%] min-w-[230px] -z-20 flex-col fixed inset-y-0 top-20 left-0 bg-tertiary overflow-visible">
        <div className="flex items-center text-white text-3xl m-2 h-10">
          <div className='flex items-center overflow-hidden text-ellipsis whitespace-nowrap'>
            {server?.picture ? (
              <img src={"https://localhost:7031/file/" + server.picture} alt="No img" className="w-10 h-10 mr-2" />
            ) : null}
            <div>{server?.name}</div>
          </div>
          <div className="flex items-center text-white text-3xl m-2 mr-0 h-10">
            <div className="scale-75">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <IconButton
                  icon={<MdMoreHoriz size={30} />}
                  name="Server Options"
                ></IconButton>
              </button>
            </div>

            {dropdownOpen && (
              <div className="origin-top-right flex absolute h-auto left-[100%] top-[-75px] mt-[76px] w-auto rounded-md shadow-lg bg-primary ring-1 ring-white ring-opacity-50 ">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu">
                  <button
                    className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-tertiary"
                    role="menuitem"
                    onClick={() => {
                      setShowMembers(!showMembers);
                      setWidthmsg(widthmsg === 0 ? 15 : 0);
                    }}>
                    <MdRememberMe size={25} /> Show Members
                  </button>
                  {(auth.id === server?.ownerId) ?
                    <button
                      className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-tertiary"
                      role="menuitem"
                      onClick={() => setDialogTypeAndOpen("Add Channel", ServerId ?? '')}>
                      <FaRegPlusSquare size={25} />  Add Channel
                    </button>
                    : null}
                  <div
                    className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-tertiary"
                    role="menuitem"
                    onClick={() => setOpenDialog(true)}>
                    <MdDescription size={25} /><ServerDescDialog
                      open={openDialog}
                      handleClose={() => setOpenDialog(false)}
                      serverName={server?.name}
                      serverDescription={server?.description} />
                  </div>
                  {(auth.id === server?.ownerId) ?
                    <button
                      className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-red-600"
                      role="menuitem"
                      onClick={() => handleEditServer(ServerId ?? '')}
                    >
                      <MdEdit size={25} /> Edit server
                    </button>
                    : null}
                  {(auth.id === server?.ownerId) ?
                    <button
                      className="flex items-center px-4 py-2 text-sm w-full text-white hover:bg-red-600"
                      role="menuitem"
                      onClick={() => handleRemoveServer(ServerId ?? '')}
                    >
                      <MdDeleteForever size={25} /> Delete Server
                    </button>
                    : null}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="my-1 ml-2 xl:w-auto">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input type="search" className="flex flex-grow w-[83%] m-0 rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal text-neutral-700 outline-none transition duration-200 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200" placeholder="Search" />
            <div className="flex-shrink-0 w-[17%] flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200">
              <FaSearch size={20} />
            </div>
          </div>
          <button className="flex my-2 text-white font-semibold" onClick={() => setShowChannels(!showChannels)}>
            All Channels
            <IconContext.Provider value={{ className: showChannels ? 'rotate-180' : '' }}>
              <IoMdArrowDropdown className="transition-transform duration-300 ease-in-out" size='25' />
            </IconContext.Provider>
          </button>
          {showChannels && (
            <ul>
              {channels?.map(({ id, name, description }) => (
                <li key={id} tabIndex={-1}>
                  <Link to={'' + id} tabIndex={-1}>
                    <div className="justify-left flex mr-2 mb-1 max-w-[280px]">
                      <button className={`w-full min-w-[80px] ${auth.id === server?.ownerId ? 'max-w-[9.3rem]' : ''}`}>
                        <ChannelButton name={`#${name}`}></ChannelButton>
                      </button>
                      {(auth.id === server?.ownerId) ?
                        <button className="px-4 py-2 ml-1 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-yellow-600"
                          onClick={() => setDialogTypeAndOpen("EditChannel", id)}>
                          <MdEdit size={25} />
                        </button> : null}
                      {(auth.id === server?.ownerId) ? //narazie tak bd
                        <button className="px-4 py-2 ml-1 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-red-600"
                          onClick={() => handleDelete(id)}>
                          <MdDeleteForever size={25} />
                        </button> : null}
                    </div>
                  </Link>
                  <EditChannelDialog open={dialogEditOpen} handleClose={handleDialogEditClose} passedId={dialogId} pushChannel={pushChannel} setChannelEdit={setChannelEdit} passedDescription={description} passedName={name} serverId={ServerId}/>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Routes>
          <Route path="/:ChannelId/*" element={<Channel widthmsg={widthmsg} />} />
        </Routes>
      </div>

      {showMembers && <ServerMembers serverMembers={serverMembers} ownerId={server?.ownerId} serverId={server?.id} />}
      <EditServerDialog open={serverEditOpen} handleClose={handleServerEditClose} serverId={dialogId} passedDesc={editDesc} passedName={editName} />
      <DeleteChannelConfirmation open={deleteDialogOpen} handleClose={handleDeleteClose} removeChannel={removeChannel} passedId={dialogId} />
      <AddChannelDialog open={dialogAddOpen} handleClose={handleDialogAddClose} passedId={dialogId} pushChannel={pushChannel} />
      <DeleteServerConfirmation open={serverDeleteOpen} handleClose={handleServerDeleteClose} removeServer={removeServer} passedId={dialogId} />
    </div>
  );
}

export default Server;
