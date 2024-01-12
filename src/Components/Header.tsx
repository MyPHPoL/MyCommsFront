import { Avatar } from "@mui/material";
import { Route, Link, Routes } from 'react-router-dom';
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import { servers, friends } from "../fakedb";

function Header() {
    const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

    return (
        <div>
            <nav className="float-left h-20 w-full fixed bg-primary">
                <label className="float-left text-white text-3xl font-bold leading-[80px] pl-12">MyCommsPoL</label>
                <ul className="float-left mr-10 flex leading-[80px] space-x-4 text-white uppercase">
                    <li><Link to="/Servers" onClick={() => setActiveSidebar('servers')}>Servers</Link></li>
                    <li><Link to="/Friends" onClick={() => setActiveSidebar('friends')}>Friends</Link></li>
                    <li className="relative flex items-center justify-center mx-auto"><Avatar alt='test user' src="https://cdn.7tv.app/emote/6362932bbb563bf696e11394/4x.webp" sx={{ width: 56, height: 56 }} /></li>
                    <label style={{borderRight: '2px solid white', borderRadius: '50%'}}></label>
                </ul>
                <div className="my-2">
                {activeSidebar === 'servers' && <Sidebar items={servers} />}
                {activeSidebar === 'friends' && <Sidebar items={friends} />}
                </div>
            </nav>
        </div>
    );
}

export default Header;