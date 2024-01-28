import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import { registerUser } from "../Api/axios";
import { useTitle } from "../Hooks/useTitle";
//here we will redirect to the error pages
export default function ErrorPages () {
    const currentUrl = window.location.href;
    const errorCode = currentUrl.slice(-3);
    switch (errorCode) {
        case '401':
    return (
        <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
            <Link to={'/home'} >
            <img src="https://media1.tenor.com/m/Uchu16G3yHAAAAAC/nuh-uh-meme-nuh-uh-gif.gif" className= "w-screen h-screen">

            </img>
            </Link>
        </div>
    );
    //temporary error page
    default:
    return (
    <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
        <Link to={'/home'} >
            <div className= "w-screen h-screen">
               <div className="text-white"> click anywhere to go back to home</div>
            </div>
        </Link>
    </div>
    );
    }
};
//the route part might need changes
