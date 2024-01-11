import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope,FaEye } from "react-icons/fa";
import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';

const RegisterForm = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    };

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

    const passwordsMatch = password === repeatPassword;

    return (
        <div className=" w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen">
            <div className="w-[26rem] bg-transparent backdrop-blur-xl text-white rounded-lg pt-7 pb-7 pl-10 pr-10 border-2 border-solid border-slate-600">
                <form action="">
                    <h1 className='text-4xl	text-center font-semibold'>Register</h1>
                    <div className="relative w-full h-12 mt-7">
                        <input type="email" required placeholder='E-mail' title="Please enter a valid email address" minLength={8} maxLength={32} 
                        className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                        <FaEnvelope className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <div className="relative w-full h-12 mt-7">
                        <input type="text" required placeholder='Username'
                        title="Please enter a valid username"
                         minLength={8} maxLength={32} 
                         className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                        <FaUser className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <div className="relative w-full h-12 mt-7">
                        <input type={passwordShown ? "text" : "password"} required placeholder='Password'
                        pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$"
                        title="Password should contain: (between 8 to 32 characters, at least one uppercase letter, and a special sign)" value={password} onChange={handlePasswordChange} 
                        className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                        <FaEye className='text-base -translate-y-1/2 top-1/2 right-5 absolute cursor-pointer' onClick={togglePasswordVisiblity}/>
                    </div>
                    <div className="relative w-full h-12 mt-7">
                        <input type={passwordShown ? "text" : "password"} required placeholder='Repeat password' value={repeatPassword} onChange={handleRepeatPasswordChange} 
                        className="placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5"/>
                        <FaLock className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div><br/>
                    {!passwordsMatch && <p className="text-center pb-10">Passwords do not match</p>}
                    <button type="submit" className="btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold">Register</button>

                    <div className="register-link text-sm text-center mt-5 mb-4">
                        <p className='text-white no-underline font-semibold'>Already a MyPHPoL community member?<br></br><button><Link  className='text-white no-underline font-semibold hover:underline' to="/Login">Login</Link></button></p>
                    </div>
                </form>
            </div>
        <Routes>
            <Route path="/Login" element={<LoginPage />} />
        </Routes>
        </div>
    );
}

export default RegisterForm;