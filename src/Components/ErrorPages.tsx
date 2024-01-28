import React from "react";
import { Link } from "react-router-dom";
//here we will redirect to the error pages
export default function ErrorPages() {
    const currentUrl = window.location.href;
    const errorCode = currentUrl.slice(-3);
    var errorUrl = "https://http.cat/" + errorCode + ".jpg";

    return (
        <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
            <Link to={'/home'} >
                <img src={errorUrl} alt={errorCode} className="w-screen h-screen">

                </img>
            </Link>
        </div>
    );

};
//the route part might need changes
