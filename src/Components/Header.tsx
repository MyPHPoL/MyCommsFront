import { Avatar } from "@mui/material";
import React, {useState} from "react";
import TopbarServer from "./TopbarServer";
import { servers, friends } from "../fakedb";
import { IoServer } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import SidebarBasic from "./TopbarBasic";
import TopbarFriend from "./TopbarFriend";
import { IconButton } from "./IconLib";

function Header() {
    const [activeTopbar, setActiveTopbar] = useState<string | null>(null);
    
    return (
        <div>
            <nav className="float-left h-20 w-full fixed bg-primary">
                <ul className="float-left  flex leading-[80px] text-white uppercase">
                    <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">Test User</li>
                    <li className="relative flex items-center justify-center mx-4"><Avatar alt='test user' src="https://cdn.7tv.app/emote/6362932bbb563bf696e11394/4x.webp" sx={{ width: 56, height: 56 }} /></li>
                    <li className="relative flex items-center justify-center mx-auto">
                      <div id="dropdown-button">
                        <a onClick={toggleDropdown}>
                        <IconButton icon={<IoMdSettings size={30}/>} name="Settings" ></IconButton>
                        </a>
                      </div>
                      {/* dropdown that is toggled by above button, currently test values, new content to have tailwind classes like "test" */} 
                      <div id="dropdown-menu" className="hidden divide-y top-[40px] left-[42px] z-10 divide-primary absolute text-white w-300 border border-gray-900 bg-secondary shadow-md mt-2 rounded-xl text-base">
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-xl text-center">Settings</div>
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 text-center">test</div>
                        <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-xl text-center">Log out</div>
                      </div>
                    </li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                    <li className="relative flex items-center justify-center mx-auto mr-1"><a onClick={() => setActiveTopbar('servers')}><IconButton icon={<IoServer size={30}/>} name="ServerList"></IconButton></a></li>
                    <li className="relative flex items-center justify-center mx-auto"><a onClick={() => setActiveTopbar('friends')}><IconButton icon={<FaUserFriends size={30}/>} name="FriendList"></IconButton></a></li>
                    <label  style={{borderRight: '2px solid grey', borderRadius: '50%', margin: '15px'}}></label>
                </ul>
                
                <div className="my-2 flex">
                <SidebarBasic />
                {activeTopbar === 'servers' && <TopbarServer items={servers} />}
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