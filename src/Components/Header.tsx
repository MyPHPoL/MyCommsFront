import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import TopbarServer from "./TopbarServer";
import { IconButton, UserAvatar } from "./IconLib";
import { IoServer } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import TopbarFriend from "./TopbarFriend";
import useAuth from '../Hooks/useAuth';
import { getFriends, getServers, getCurrent } from "../Api/axios";
import { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";
import { FaRegUser } from "react-icons/fa";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useTitle } from '../Hooks/useTitle';
import { IoLogInOutline } from "react-icons/io5";
import SettingsDialog from './DialogPopups/EditUserDialog';
import Dashboard from './Dashboard';

function Header() {
  const [activeTopbar, setActiveTopbar] = useState<string | null>('servers');
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const { setAuth }: { setAuth: any } = useAuth();
  const [servers, setServers] = useState<ServerProps[] | undefined>();
  const [friends, setFriends] = useState<FriendProps[] | undefined>();
  const [tmpServer, setTmpServer] = useState<ServerProps | undefined>();
  const [toRemoveId, setToRemoveId] = useState('');
  const [openSettings, setOpenSettings] = useState(false);

  const handleDialogClose = () => {
    setOpenSettings(false);
  };

  const removeServer = (id: string) => {
    setToRemoveId(id);
    console.log('removed')
  }

  const pushServer = (server: ServerProps) => {
    setTmpServer(server);
  }

  useEffect(() => {
    if (tmpServer) {
      if (servers) {
        setServers([...servers, tmpServer]);
      }
    }
  }, [tmpServer])

  useEffect(() => {
    if (servers) {
      if (toRemoveId) {
        // toRemoveId is string but server.id is number thus != instead of !==
        // eslint-disable-next-line eqeqeq
        setServers(servers.filter((server) => server.id != toRemoveId))
      }
    }
  }, [toRemoveId])

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    const fetchServers = async () => {
      try {
        const response = await getServers(auth.token);
        isMounted && setServers(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load your server list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await getFriends(auth.token);
        isMounted && setFriends(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load your friend list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    fetchServers();
    fetchFriends();

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    navigate('/login')
    localStorage.clear();
    setAuth({}); // clear auth context
  };

  const changeAuth = async (token: string) => {
    try {
      const response = await getCurrent(token);
      const id = response?.data?.id;
      const username = response?.data?.username;
      const avatar = response?.data?.avatar;
      const email = response?.data?.email;
      setAuth({ id, username, email, token, avatar });
      localStorage.setItem("auth", JSON.stringify({ id, username, email, token, avatar }));
    } catch (error) {
      console.error(error);
    }
  }

  useTitle('MyCommsPoL - Home');

  return (
    <div>
      <nav className="float-left h-20 w-full fixed bg-primary">
        <ul className="float-left  flex leading-[80px] text-white uppercase">
          <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">{auth.username}</li>
          <li className="relative flex items-center justify-center ml-3" >
            {auth.avatar ? <UserAvatar name={auth.username} picture={"https://localhost:7031/file/" + auth.avatar} /> : <div></div>}
          </li>
          <li className="relative flex items-center justify-center ml-3">
            <button onClick={toggleDropdown}>
              <IconButton icon={<FaRegUser size={30} />} name="UserSettings" ></IconButton>
            </button></li>
          <li className="relative flex items-center justify-center mx-auto" id="dropdown-button">

            {/* dropdown that is toggled by above button, currently test values, new content to have tailwind classes like "test" */}
            <div id="dropdown-menu" className="hidden divide-y top-[40px] left-[-5px] z-10 divide-primary absolute text-white w-[8rem] border border-white bg-secondary mt-2 rounded-xl text-base">
              <div className="py-2 flex px-2 align-center cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-xl text-center justify-center items-center space-x-2">
                <IoMdSettings size='20' />
                <span onClick={() => setOpenSettings(true)}>Settings</span>
              </div>
              <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-xl text-center flex justify-center items-center space-x-2" onClick={logout}>
                <IoLogInOutline size='20' />
                <span>Log out</span>
              </div>
            </div>
          </li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
          <li className="relative flex items-center justify-center mx-auto mr-1"><button onClick={() => { if (activeTopbar === 'servers') setActiveTopbar('friends'); setActiveTopbar('servers'); navigate('/home') }}><IconButton icon={<IoServer size={30} />} name="Server List"></IconButton></button></li>
          <li className="relative flex items-center justify-center mx-auto"><button onClick={() => { setActiveTopbar('friends'); navigate('/home'); }}><IconButton icon={<FaUserFriends size={30} />} name="Friend List"></IconButton></button></li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
        </ul>
        <div className="my-2 flex">
          {activeTopbar === 'servers' && <TopbarServer handleAddServer={pushServer} servers={servers} removeServer={removeServer} />}
          {activeTopbar === 'friends' && <TopbarFriend friends={friends} />}
        </div>
      </nav>
      <SnackbarProvider autoHideDuration={3000} />
      <SettingsDialog
        open={openSettings}
        handleClose={handleDialogClose}
        changeAuth={changeAuth}
      />
      {useLocation().pathname === '/home' && <Dashboard friends={friends} servers={servers} removeServer={removeServer} mode={activeTopbar || 'null'} handleAddServer={pushServer} />}
    </div>
  );
  function toggleDropdown() {
    const dropdown = document.querySelector('#dropdown-menu');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }


}


export default Header;
