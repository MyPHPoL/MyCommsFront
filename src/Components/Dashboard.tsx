import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./IconLib";
import { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";
import { MdDeleteForever } from "react-icons/md";
import DeleteServerConfirmation from "./DialogPopups/DeleteServerConfirmation";
import { FaDoorOpen } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import CreateServerDialog from "./DialogPopups/CreateServerDialog";
import JoinServerDialog from "./DialogPopups/JoinServerDialog";
import useAuth from "../Hooks/useAuth";
import { TiUserAdd } from "react-icons/ti";
import AddFriendDialog from "./DialogPopups/AddFriendDialog";

interface DashBoardProps {
    friends: FriendProps[] | undefined;
    servers: ServerProps[] | undefined;
    mode: string;
    removeServer: (id: string) => void;
    handleAddServer: (server: ServerProps) => void;
  }
  
  function Dashboard({ friends, servers, removeServer, mode, handleAddServer }: DashBoardProps) {

    const RenderFriends: React.FC<DashBoardProps> = ({ friends = [] }) => {
      const [filteredFriends, setFilteredFriends] = useState(friends);
      const [addOpen, setAddOpen] = useState(false);


      const handleFilter = (event: any) => {
        const value = event.target.value;
        const filtered = friends.filter(friend => friend.username.includes(value));
        setFilteredFriends(filtered);
      };

      const handleAddOpen = () => {
        setAddOpen(true);
      };
  
      const handleAddClose = () => {
        setAddOpen(false);
      };
   
      

      return (
      <div className="w-[720px]">
      <h1 className='text-5xl font-bold my-4 text-white mx-2 pl-[20px]'> Your Friends </h1>
      <div className='relative w-[600px] h-12 my-2 pl-[20px]'>
        <input
            onChange={handleFilter}
            type='text'
            placeholder='Filter your friends by their name...'
            autoComplete='off'
            className='placeholder:color-white w-[600px] text-white h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
        />
      </div>
      <div className='overflow-y-auto h-[700px]'>
      {filteredFriends?.map(({ id, username, picture }) => (
        <div
          key={id}
          className='group flex-row flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-center'>
          <Link to={`/server/${id}`}>
            <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] hover:bg-yellow-500 hover:text-primary align-middle duration-300 ease-linear'>
              <UserAvatar
                name={username}
                picture={
                  picture
                    ? "https://localhost:7031/file/" + picture
                    : undefined
                }
              />
              <div className='pl-2'>
                {username}
                <div className='text-base font-normal overflow-clip'></div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <div className="w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white">
        <button className='flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] border-dashed border-2 hover:bg-yellow-500 hover:text-primary duration-300 ease-linear'
        onClick={() => handleAddOpen()}>
          <TiUserAdd className="mx-3" size="32" />
          <div className='pl-2'>
            <div className="float-left">Click here to add a friend!</div><br></br>
            <div className='text-base font-normal overflow-clip float-left'>All you need is their username!</div>        
          </div>
        </button>
      </div>
      
    </div>
      <AddFriendDialog
        open={addOpen}
        handleClose={handleAddClose}
        />
    </div>
      );
    }
  

    const RenderServers: React.FC<DashBoardProps> = ({ servers = [], removeServer, handleAddServer }) => {

    const [filteredServers, setFilteredServers] = useState(servers);
    const [serverDeleteOpen, setServerDeleteOpen] = useState(false);
    const [dialogId, setPassedId] = useState("");
    const [joinOpen, setJoinOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const { auth }: { auth: any } = useAuth(); // id, username, email, password, token

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

    const handleServerDeleteOpen = (id: string) => {
      setPassedId(id);
      setServerDeleteOpen(true);
    }
    
    const handleServerDeleteClose = () => {
      setServerDeleteOpen(false);
    }

    const handleJoinOpen = () => {
      setJoinOpen(true);
    };

    const handleJoinClose = () => {
      setJoinOpen(false);
    };
    const handleCreateOpen = () => {
      setCreateOpen(true);
    };
  
    const handleCreateClose = () => {
      setCreateOpen(false);
    };

    return (
    <div className="w-[720px]">
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
      <div className='overflow-y-auto h-[700px]'>
      {filteredServers?.map(({ id, name, description, picture, ownerId }) => (
        <div
          key={id}
          className='group flex-row flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-center'>
          <Link to={`/server/${id}`}>
            <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] hover:bg-yellow-500 hover:text-primary align-middle duration-300 ease-linear'>
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
          { auth.id === ownerId &&
          <button className="invisible group-hover:visible px-4 py-2 ml-0 text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                  onClick={() => handleServerDeleteOpen(id)}>
                  <MdDeleteForever size={25} /> 
          </button>
          }
        </div>
      ))}
      <div className="w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white">
        <button className='flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] border-dashed border-2 hover:bg-yellow-500 hover:text-primary duration-300 ease-linear'
        onClick={() => handleJoinOpen()}>
          <FaDoorOpen className="mx-3" size="32" />
          <div className='pl-2'>
            <div className="float-left">Click here to join a server!</div><br></br>
            <div className='text-base font-normal overflow-clip float-left'>All you need is a server name!</div>        
          </div>
        </button>
      </div>
      <div className="w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white">
        <button className='flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] border-dashed border-2 hover:bg-yellow-500 hover:text-primary duration-300 ease-linear'
        onClick={() => handleCreateOpen()}>
          <IoMdAdd className="mx-3" size="32" />
          <div className='pl-2'>
              <div className="float-left">Click here to create a new server!</div><br></br>
              <div className='text-base font-normal overflow-clip float-left'>Perfect new server just a click away!</div>   
          </div>
        </button>
      </div>
    </div>
      <DeleteServerConfirmation 
        open={serverDeleteOpen} 
        handleClose={handleServerDeleteClose} 
        removeServer={removeServer} 
        passedId={dialogId} />
      <CreateServerDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleAddServer={handleAddServer}
      />
      <JoinServerDialog
        open={joinOpen}
        handleClose={handleJoinClose}
        handleJoinServer={handleAddServer}
      />
    </div>
    );
}

return (
  <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
    {mode === "friends" ? <RenderFriends {...{friends, servers, removeServer, mode, handleAddServer}} /> : null }
    {mode === "servers" ? <RenderServers {...{friends, servers, removeServer, mode, handleAddServer}} /> : null }
  </div>
);
};
export default Dashboard;