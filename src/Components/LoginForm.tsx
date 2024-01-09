import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
const LoginForm = () => {
    return (
        <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-cover">
        <div className="box">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" required placeholder='Username' />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="text" required placeholder='Password' />
                    <FaLock className='icon'/>
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p>Not a MyPhPol community member?<a href="#">Register</a></p>
                </div>
            </form>
        </div>
        </body>
    );
}

export default LoginForm;