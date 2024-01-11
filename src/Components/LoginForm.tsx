import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, Route, Routes } from 'react-router-dom';
import RegisterPage from '../Pages/RegisterPage';
const LoginForm = () => {
    return (
        <body className="w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen">
        <div className="w-[26rem] bg-transparent backdrop-blur-xl text-white rounded-lg pt-7 pb-7 pl-10 pr-10 border-2 border-solid border-slate-600">
            <form action="">
                <h1 className='text-4xl	text-center font-semibold'>Login</h1>
                <div className="relative w-full h-12 mt-7">
                    <input type="text" required placeholder='Username' 
                    className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                    <FaUser className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                </div>
                <div className="relative w-full h-12 mt-7">
                    <input type="text" required placeholder='Password' 
                    className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                    <FaLock className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                </div>
                <br/>
                <button type="submit" className="btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold">Login</button>
                
                <div className="text-sm text-center mt-5 mb-4">
                    <p className='text-white no-underline font-semibold'>Not a MyPHPoL community member?<br></br><button><Link  className='text-white no-underline font-semibold hover:underline' to="/Register">Register</Link></button></p>
                </div>
            </form>
        </div>
        <Routes>
                <Route path="/Register" element={<RegisterPage />} />
        </Routes>
        </body>
    );
}

export default LoginForm;