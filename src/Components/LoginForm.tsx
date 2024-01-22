import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import RegisterPage from "../Pages/RegisterPage";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = '/Account/Login';

const LoginForm = () => {
    
    const { setAuth }: { setAuth: any } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    email: email,
                    password: password,
                }),
            );
            const id = response?.data?.user.id;
            const username = response?.data?.user.username;
            const token = response?.data?.token;
            setAuth({ id, username, email, password, token });
            setSuccess(true);
            
        } catch (error: any) {
            if(!error?.response){
                setErrMsg("No server response. Please try again later.");
            }
            else if(error.response?.status === 400){
                setErrMsg("Invalid e-mail or password!");
            }
            else{
                setErrMsg("Something went wrong. Please try again later.");
            };
        } 
    }; 

    return (
        <>
        {success ? (
            <div>
                <Navigate to='/home' />
            </div>
        ) : (
        <div className='w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
            <div className='w-[26rem] bg-transparent backdrop-blur-xl text-white rounded-lg pt-7 pb-7 pl-10 pr-10 border-2 border-solid border-slate-600'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-4xl	text-center font-semibold'>Login</h1>
                    <p className={errMsg ? 'bg-red-500 to-black font-bold p-2 mt-7 rounded-s-3xl rounded-e-3xl text-center z-10' : "absolute left-[-9999px]"} aria-live="assertive">{errMsg}</p>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            type='text'
                            required
                            placeholder='E-mail'
                            autoComplete="off"
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <FaUser className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            type='password'
                            required
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <FaLock className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <br />
                    <button
                        disabled={ email === "" || password === "" ? true : false}
                        type='submit'
                        className='btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold disabled:bg-slate-500'>
                        Login
                    </button>
                    </form>

                    <div className='text-sm text-center mt-5 mb-4'>
                        <p className='text-white no-underline font-semibold'>
                            Not a MyPHPoL community member?<br></br>
                            <button>
                                <Link
                                    className='text-white no-underline font-semibold hover:underline'
                                    to='/Register'>
                                    Register
                                </Link>
                            </button>
                        </p>
                    </div>
            </div>
            <Routes>
                <Route path='/Register' element={<RegisterPage />} />
            </Routes>
        </div>
        )};
        </>
    );
};

export default LoginForm;

