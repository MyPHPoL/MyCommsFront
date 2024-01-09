import React, { useState } from 'react';
import './RegisterForm.css';
import { FaUser, FaLock, FaEnvelope,FaEye } from "react-icons/fa";

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
        <body className="bg-gradient-to-r from-main to-second bg-cover">
            <div className="box">
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="email" required placeholder='E-mail' title="Please enter a valid email address" minLength={8} maxLength={32} />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="text" required placeholder='Username'
                        title="Please enter a valid username"
                         minLength={8} maxLength={32} />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type={passwordShown ? "text" : "password"} required placeholder='Password'
                        pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$"
                        title="Password should contain: (between 8 to 32 characters, at least one uppercase letter, and a special sign)" value={password} onChange={handlePasswordChange} />
                        <FaEye className='icon cursor-pointer' onClick={togglePasswordVisiblity}/>
                    </div>
                    <div className="input-box">
                        <input type={passwordShown ? "text" : "password"} required placeholder='Repeat password' value={repeatPassword} onChange={handleRepeatPasswordChange} />
                        <FaLock className='icon' />
                    </div>
                    {!passwordsMatch && <p className="text-center pb-10">Passwords do not match</p>}
                    <button type="submit" className="btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold">Register</button>

                    <div className="register-link text-sm text-center mt-5 mb-4">
                        <p className='text-white no-underline font-semibold'>Already a MyPhPol community member?<br></br><a className='text-white no-underline font-semibold hover:underline' href="#">Login</a></p>
                    </div>
                </form>
            </div>
        </body>
    );
}

export default RegisterForm;