import { Avatar } from "@mui/material";
import { Route, Link, Routes } from 'react-router-dom';
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import { servers, friends } from "../fakedb";
import { IoServer } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function Header() {
    const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
    
    return (
        <div>
            <nav className="float-left h-20 w-full fixed bg-primary">
                <ul className="float-left  flex leading-[80px] text-white uppercase">
                    <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">Amonra</li>
                    <li className="relative flex items-center justify-center mx-4"><Avatar alt='test user' src="https://cdn.7tv.app/emote/6362932bbb563bf696e11394/4x.webp" sx={{ width: 56, height: 56 }} /></li>
                    <li className="relative flex items-center justify-center mx-auto">
                      <div id="dropdown-button">
                        <a onClick={toggleDropdown}>
                        <IconButton icon={<IoMdSettings size={30}/>} name="Settings" ></IconButton>
                        </a>
                      </div>
                    </li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                    <li className="relative flex items-center justify-center mx-auto mr-1"><a onClick={() => setActiveSidebar('servers')}><IconButton icon={<IoServer size={30}/>} name="ServerList"></IconButton></a></li>
                    <li className="relative flex items-center justify-center mx-auto"><a onClick={() => setActiveSidebar('friends')}><IconButton icon={<FaUserFriends size={30}/>} name="FriendList"></IconButton></a></li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                </ul>
                <div id="dropdown-menu" className="hidden absolute text-white top-[10px] left-[320px] w-400 border border-gray-900 bg-secondary shadow-md mt-2 rounded-3xl">
                        <div className="py-4 px-4 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-3xl">Settings</div>
                        <div className="py-4 px-4 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-3xl text-center">Log out</div>
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