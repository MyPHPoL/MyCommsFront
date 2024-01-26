
import { Navigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from "react";
import TopbarServer from "./TopbarServer";
import { IconButton } from "./IconLib";
import { friends } from "../fakedb";
import { IoServer } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import SidebarBasic from "./TopbarBasic";
import TopbarFriend from "./TopbarFriend";
import DataContext from "../context/AuthProvider";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { ServerProps } from "./Server";
import { FaRegUser } from "react-icons/fa";
import CustomDialog from './DialogTemplate';

const SERVER_LIST_URL = '/Server/GetServers';

function Header() {
  const [activeTopbar, setActiveTopbar] = useState<string | null>(null);
  const { auth }: { auth: any } = useContext(DataContext); // id, username, email, password, token
  const { setAuth }: { setAuth: any } = useContext(AuthContext);
  const [servers, setServers] = useState<ServerProps[] | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // for user authentication (should be moved to axios.ts later)
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` }
  };

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    const getServers = async () => {
      try {
        const response = await axios.get(SERVER_LIST_URL, config);
        isMounted && setServers(response.data);
      } catch (error: any) {
        console.log(error); // TODO: handle error
      }
    };

    getServers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []); // WITHOUT THIS ARRAY, IT WILL INFINITELY LOOP

  const logout = async () => {
    setAuth({}); // clear auth context
    <Navigate to='/home' />;
  };

  return (
    <div>
      <nav className="float-left h-20 w-full fixed bg-primary">
        <ul className="float-left  flex leading-[80px] text-white uppercase">
          <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">{auth.username}</li>
          <li className="relative flex items-center justify-center ml-3"><FaRegUser size={30} /></li>
          <li className="relative flex items-center justify-center mx-4"></li>
          <li className="relative flex items-center justify-center mx-auto" id="dropdown-button">
            <button onClick={toggleDropdown}>
              <IconButton icon={<IoMdSettings size={30} />} name="Settings" ></IconButton>
            </button>
            {/* dropdown that is toggled by above button, currently test values, new content to have tailwind classes like "test" */}
            <div id="dropdown-menu" className="hidden divide-y top-[40px] left-[42px] z-10 divide-primary absolute text-white w-300 border border-gray-900 bg-secondary shadow-md mt-2 rounded-xl text-base">
              <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-xl text-center">Settings</div>
              <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 text-center">test</div>
              <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-xl text-center" onClick={logout}>Log out</div>
            </div>
          </li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
          <li className="relative flex items-center justify-center mx-auto mr-1"><button onClick={() => setActiveTopbar('servers')}><IconButton icon={<IoServer size={30} />} name="ServerList"></IconButton></button></li>
          <li className="relative flex items-center justify-center mx-auto"><button onClick={() => setActiveTopbar('friends')}><IconButton icon={<FaUserFriends size={30} />} name="FriendList"></IconButton></button></li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
          {/* basic dialog window usage */}
          <button onClick={handleDialogOpen}><IconButton icon={<IoMdSettings size={30} />} name="Dialog" ></IconButton></button>
            {/* to change the type of the dialog used, please change type accordingly (future versions might change the call parameter) */}
            <CustomDialog open={dialogOpen} handleClose={handleDialogClose} type="Create Server"/>
        </ul>
        <div className="my-2 flex">
          <SidebarBasic />
          {activeTopbar === 'servers' && <TopbarServer servers={servers} />}
          {activeTopbar === 'friends' && <TopbarFriend items={friends} />}
        </div>
      </nav>
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