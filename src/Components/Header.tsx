import { Avatar } from "@mui/material";
import React, {useContext, useState} from "react";
import Sidebar from "./Sidebar";
import { servers, friends } from "../fakedb";
import { IoServer } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import DataContext from "../context/AuthProvider";

function Header() {
    const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
    const { auth } : { auth: any } = useContext(DataContext); // id, username, email, password, token
    
    return (
        <div>
            <nav className="float-left h-20 w-full fixed bg-primary">
                <ul className="float-left  flex leading-[80px] text-white uppercase">
                    <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">{ auth.username }</li>
                    <li className="relative flex items-center justify-center mx-4"><Avatar alt='test user' src="https://cdn.7tv.app/emote/6362932bbb563bf696e11394/4x.webp" sx={{ width: 56, height: 56 }} /></li>
                    <li className="relative flex items-center justify-center mx-auto mr-1" id="dropdown-button"><button onClick={toggleDropdown}> <IconButton icon={<IoMdSettings size={30}/>} name="Settings" ></IconButton></button></li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                    <li className="relative flex items-center justify-center mx-auto mr-1"><button onClick={() => setActiveSidebar('servers')}><IconButton icon={<IoServer size={30}/>} name="ServerList"></IconButton></button></li>
                    <li className="relative flex items-center justify-center mx-auto"><button onClick={() => setActiveSidebar('friends')}><IconButton icon={<FaUserFriends size={30}/>} name="FriendList"></IconButton></button></li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                </ul>
                <div id="dropdown-menu" className="hidden divide-y divide-primary absolute text-white top-[40px] left-[315px] w-400 border border-gray-900 bg-secondary shadow-md mt-2 rounded-xl">
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-xl text-center">Settings</div>
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 text-center">test</div>
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-xl text-center">Log out</div>
                      </div>
                <div className="my-2">
                {activeSidebar === 'servers' && <Sidebar items={servers} />}
                {activeSidebar === 'friends' && <Sidebar items={friends} />}
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

interface IconButtonProps {
    icon: any;
    name: string;
  }

  const IconButton = ({ icon, name }: IconButtonProps) => (
    <div className='font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 bg-secondary group hover:bg-yellow-500 text-white hover:text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'>
      {icon}
  
      <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left'>
        {name}
      </span>
    </div>
  );

export default Header;