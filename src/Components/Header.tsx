import { Avatar } from "@mui/material";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React from "react";
import Sidebar from "./Sidebar";
import { servers } from "../App";
import { friends } from "../App";

function Header() {
    return (
        <Router>
            <nav className="h-20 w-full fixed bg-primary">
                <label className="text-white text-3xl font-bold leading-[80px] pl-12">MyCommsPoL</label>
                <ul className="float-right mr-10 flex leading-[80px] space-x-4 text-white uppercase">
                    <li><Link to="/Servers">Servers</Link></li>
                    <li><Link to="/Friends">Friends</Link></li>
                    <li className="relative flex items-center justify-center mx-auto"><Avatar alt='test user' src="https://cdn.7tv.app/emote/6362932bbb563bf696e11394/4x.webp" sx={{ width: 56, height: 56 }} /></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/Servers" element={<Sidebar items={servers} />} />
                <Route path="/Friends" element={<Sidebar items={friends} />} />
            </Routes>
        </Router>
    );
}

export default Header;