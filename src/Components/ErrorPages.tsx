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
    var errorUrl = "https://http.cat/" + errorCode + ".jpg";
    
    return (
        <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
            <Link to={'/home'} >
            <img src={errorUrl} alt={errorCode} className= "w-screen h-screen">

            </img>
            </Link>
        </div>
    );
    
};
//the route part might need changes
