import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./IconLib";
import { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";
import { MdDeleteForever } from "react-icons/md";
import DeleteServerConfirmation from "./DialogPopups/DeleteServerConfirmation";
import { FaDoorOpen } from "react-icons/fa6";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import CreateServerDialog from "./DialogPopups/CreateServerDialog";
import JoinServerDialog from "./DialogPopups/JoinServerDialog";
import useAuth from "../Hooks/useAuth";
import { TiUserAdd } from "react-icons/ti";
import AddFriendDialog from "./DialogPopups/AddFriendDialog";
import { enqueueSnackbar } from 'notistack';
import { acceptInvite, getIncomingInvites, getOutgoingInvites, rejectInvite, removeFriend } from "../Api/axios";
import { IoClose } from "react-icons/io5";
import { IconType } from "react-icons";
import LeaveServerConfirmation from "./DialogPopups/LeaveServerConfirmation";
import RemoveFriendConfirmation from "./DialogPopups/RemoveFriendConfirmation";
import { Remove } from "@mui/icons-material";

interface DashBoardProps {
  friends: FriendProps[] | undefined;
  servers: ServerProps[] | undefined;
  mode: string;
  removeServer: (id: string) => void;
  handleAddServer: (server: ServerProps) => void;
  removeFriend: (id: string) => void;
}

interface InviteProps {
  id: string;
  username: string;
  picture?: string;
  creationDate: string;
}

function Dashboard({ friends, servers, removeServer, removeFriend, mode, handleAddServer }: DashBoardProps) {

  const RenderFriends: React.FC<DashBoardProps> = ({ friends = [] }) => {
    const [filteredFriends, setFilteredFriends] = useState(friends);
    const [incInvites, setIncInvites] = useState<InviteProps[]>();
    const [outInvites, setOutInvites] = useState<InviteProps[]>();
    const [addOpen, setAddOpen] = useState(false);
    const [removeFriendOpen, setRemoveFriendOpen] = useState(false);
    const [dialogId, setPassedId] = useState("");
    const [filteredIncInvites, setFilteredIncInvites] = useState(incInvites);
    const [filteredOutInvites, setFilteredOutInvites] = useState(outInvites);
    const { auth }: { auth: any } = useAuth(); // id, username, email, password, token


    const handleFilter = (event: any) => {
      const value = event.target.value;
      const filtered = friends.filter(friend => friend.username.includes(value));
      setFilteredFriends(filtered);
    };

    const handleFilterIncInvites = (event: any) => {
      const value = event.target.value;
      const filtered = incInvites?.filter(friend => friend.username.includes(value));
      setFilteredIncInvites(filtered);
    };

    const handleFilterOutInvites = (event: any) => {
      const value = event.target.value;
      const filtered = outInvites?.filter(friend => friend.username.includes(value));
      setFilteredOutInvites(filtered);
    }

    useEffect(() => {

      let isMounted = true; // something, something not to render when component is unmounted
      const controller = new AbortController(); // cancels request when component unmounts

      const fetchIncInvites = async () => {
        try {
          const response = await getIncomingInvites(auth.token);
          if (isMounted && response.data) {
            const invites = response.data.map((invite: any) => invite.inviter);

            setIncInvites(invites);
          }
        } catch (error: any) {
          enqueueSnackbar("We couldn't load your incoming invites. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        }
      };

      const fetchOutInvites = async () => {
        try {
          const response = await getOutgoingInvites(auth.token);
          if (isMounted && response.data) {
            const invites = response.data.map((invite: any) => invite.invitee);

            setOutInvites(invites);
          }
        } catch (error: any) {

          enqueueSnackbar("We couldn't load your outgoing invites. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        }
      };


      if (!addOpen) {
        fetchIncInvites();
        fetchOutInvites();
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    }, [addOpen]);

    useEffect(() => {
      setFilteredFriends(friends);
    }, [friends]);

    useEffect(() => {
      setFilteredIncInvites(incInvites);
    }, [incInvites]);

    useEffect(() => {
      setFilteredOutInvites(outInvites);
    }, [outInvites]);



    const handleInviteAccept = async (user: FriendProps) => {
      try {
        await acceptInvite(auth.token, user.id);
        friends.push(user);
        setIncInvites(incInvites?.filter((invite) => invite.id !== user.id));
      }
      catch (error: any) {
        enqueueSnackbar("We couldn't accept this invite. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    const handleInviteReject = async (user: FriendProps) => {
      try {
        await rejectInvite(auth.token, user.id);
        setIncInvites(incInvites?.filter((invite) => invite.id !== user.id));
      }
      catch (error: any) {
        enqueueSnackbar("We couldn't reject this invite. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    // it should work after adding axios function
    const handleRemoveFriendOpen = (id: string) => {
      setPassedId(id);
      setRemoveFriendOpen(true);
    }

    const handleRemoveFriendClose = () => {
      console.log('closed')
      setRemoveFriendOpen(false);
    }

    const handleAddOpen = () => {
      setAddOpen(true);
    };

    const handleAddClose = () => {
      setAddOpen(false);
    };

    return (
      <div className="flex">
        <div className="w-[600px] pl-[20px]">
          <h1 className='text-5xl font-bold my-4 text-white mx-2'> Your Friends </h1>
          <div className='relative w-full h-12 my-2'>
            <input
              onChange={handleFilter}
              type='text'
              placeholder='Filter your friends by their name...'
              autoComplete='off'
              className='placeholder:color-white w-[500px] text-white h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
            />
          </div>
          <div className='overflow-y-auto h-[calc(100vh-210px)]'>
            {filteredFriends?.map(({ id, username, avatar }) => (
              <div
                key={id}
                className='group flex-row flex w-full pt-2 pb-4 h-auto text-2xl font-semibold text-white items-center'>
                <Link to={`/friends/${id}`}>
                  <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[500px] hover:bg-yellow-500 hover:text-primary align-middle duration-300 ease-linear'>

                    <UserAvatar
                      name={username}
                      picture={
                        avatar
                          ? "https://localhost:7031/file/" + avatar
                          : undefined
                      }
                    />

                    <div className='pl-2'>
                      {username}


                    </div>
                  </div>
                </Link>
                <button className="invisible group-hover:visible px-4 py-2 ml-0 text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                  onClick={() => handleRemoveFriendOpen(id)}>
                  <MdDeleteForever size={25} />
                </button>
              </div>
            ))}

            <button className="w-[500px]" onClick={() => handleAddOpen()}>
              <BigBlueButtonAtTheBottom Icon={TiUserAdd} text="Click here to add a friend!" subText="All you need is their username!" />
            </button>
          </div>
          <AddFriendDialog
            open={addOpen}
            handleClose={handleAddClose}
          />
          <RemoveFriendConfirmation
            open={removeFriendOpen}
            handleClose={handleRemoveFriendClose}
            deleteFriend={removeFriend}
            passedId={dialogId}
          />
        </div>

        <div className="w-[600px]">
          <h1 className='text-5xl font-bold my-4 text-white mx-2 pl-[20px]'> Your Incoming Invites </h1>
          <div className='relative w-[500px] h-12 my-2 pl-[20px]'>
            <input
              onChange={handleFilterIncInvites}
              type='text'
              placeholder='Filter your inivtes by the invitee...'
              autoComplete='off'
              className='placeholder:color-white w-[500px] text-white h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
            />
          </div>
          <div className='overflow-y-auto h-[calc(100vh-210px)]'>
            {filteredIncInvites?.map((user: FriendProps) => (
              <div
                key={user.id}
                className='group flex-row flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-center'>
                <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[500px] hover:bg-yellow-500 hover:text-primary align-middle duration-300 ease-linear'>
                  <UserAvatar
                    name={user.username}
                    picture={
                      user.avatar
                        ? "https://localhost:7031/file/" + user.avatar
                        : undefined
                    }
                  />
                  <div className='pl-2'>
                    {user.username}
                  </div>
                  <button className="invisible group-hover:visible absolute right-20 px-4 py-2 text-right text-sm text-white rounded-full bg-tertiary hover:bg-green-600 transition-all duration-300 ease-linear"
                    onClick={() => handleInviteAccept(user)}>
                    <IoMdCheckmark size={25} />
                  </button>
                  <button className="invisible group-hover:visible absolute right-2 px-4 py-2 text-right text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                    onClick={() => handleInviteReject(user)}>
                    <IoClose size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[720px]">
          <h1 className='text-5xl font-bold my-4 text-white mx-2 pl-[20px]'> Your Outgoing Invites </h1>
          <div className='relative w-[600px] h-12 my-2 pl-[20px]'>
            <input
              onChange={handleFilterOutInvites}
              type='text'
              placeholder='Filter your inivtes by the receiver...'
              autoComplete='off'
              className='placeholder:color-white w-[600px] text-white h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
            />
          </div>
          <div className='overflow-y-auto h-[calc(100vh-210px)]'>
            {filteredOutInvites?.map(({ id, username, picture }) => (
              <div
                key={id}
                className='group flex-row flex w-full pt-2 pb-4 pl-[20px] h-auto text-2xl font-semibold text-white items-center'>
                <div className='relative flex mr-2 bg-tertiary p-2 rounded-full items-center px-5 w-[600px] align-middle duration-300 ease-linear'>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const RenderServers: React.FC<DashBoardProps> = ({ servers = [], removeServer, handleAddServer }) => {

    const [filteredServers, setFilteredServers] = useState(servers);
    const [serverDeleteOpen, setServerDeleteOpen] = useState(false);
    const [serverLeaveOpen, setServerLeaveOpen] = useState(false);
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

    // deleting servers when owner stuff
    const handleServerDeleteOpen = (id: string) => {
      setPassedId(id);
      setServerDeleteOpen(true);
    }

    const handleServerDeleteClose = () => {
      setServerDeleteOpen(false);
    }

    // leaving servers when not owner stuff
    const handleServerLeaveOpen = (id: string) => {
      setPassedId(id);
      setServerLeaveOpen(true);
    }

    const handleServerLeaveClose = () => {
      setServerLeaveOpen(false);
    }

    // joining server
    const handleJoinOpen = () => {
      setJoinOpen(true);
    };

    const handleJoinClose = () => {
      setJoinOpen(false);
    };

    // creating server
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
        <div className='overflow-y-auto h-[calc(100vh-210px)] pl-[20px]'>
          {filteredServers?.map(({ id, name, description, picture, ownerId }) => (
            <div
              key={id}
              className='group flex-row flex w-full pt-2 pb-4 h-auto text-2xl font-semibold text-white items-center'>
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
              {auth.id === ownerId &&
                <button className="invisible group-hover:visible px-4 py-2 ml-0 text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                  onClick={() => handleServerDeleteOpen(id)}>
                  <MdDeleteForever size={25} />
                </button>
              }
              {auth.id !== ownerId &&
                <button className="invisible group-hover:visible px-4 py-2 ml-0 text-sm text-white rounded-full bg-tertiary hover:bg-red-600 transition-all duration-300 ease-linear"
                  onClick={() => handleServerLeaveOpen(id)}>
                  <MdDeleteForever size={25} />
                </button>
              }
            </div>
          ))}
          <button className="w-[600px]" onClick={() => handleJoinOpen()}>
            <BigBlueButtonAtTheBottom Icon={FaDoorOpen} text="Click here to join a server!" subText="All you need is a server name!" />
          </button>
          <button className="w-[600px]" onClick={() => handleCreateOpen()}>
            <BigBlueButtonAtTheBottom Icon={IoMdAdd} text="Create a new server" subText="Click here to create a new server!" />
          </button>
        </div>
        <DeleteServerConfirmation
          open={serverDeleteOpen}
          handleClose={handleServerDeleteClose}
          removeServer={removeServer}
          passedId={dialogId}
        />
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
        <LeaveServerConfirmation
          open={serverLeaveOpen}
          handleClose={handleServerLeaveClose}
          removeServer={removeServer}
          passedId={dialogId}
        />
      </div>
    );
  }

  return (
    <div className='md:flex h-full w-full -z-20 flex-col fixed inset-y-0 top-20 left-0'>
      {mode === "friends" ? <RenderFriends {...{ friends, servers, removeServer, removeFriend, mode, handleAddServer }} /> : null}
      {mode === "servers" ? <RenderServers {...{ friends, servers, removeServer, removeFriend, mode, handleAddServer }} /> : null}
    </div>
  );
};
export default Dashboard;

// 1 button style for easier editing :)
const BigBlueButtonAtTheBottom = ({ Icon, text, subText }: { Icon: IconType, text: string, subText: string }) => (
  <div className="pt-2 pb-4 h-auto text-2xl font-semibold text-white">
    <div className='w-full flex mr-2 bg-tertiary shadow-lg p-2 rounded-full items-center px-5 border-dashed border-2 hover:bg-yellow-500 hover:text-primary duration-300 ease-linear'>
      <Icon className="mx-3" size="32" />
      <div className='pl-2'>
        <div className="float-left">{text}</div><br></br>
        <div className='text-base font-normal overflow-clip float-left'>{subText}</div>
      </div>
    </div>
  </div>
);