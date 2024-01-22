import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // 3 to 23 characters, letters, numbers, underscores, hyphens allowed
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/; // 8 to 32 characters, must include uppercase and lowercase letters, a number and a special character

// eslint-disable-next-line no-useless-escape
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email regex

const REGISTER_URL = '/Account/Register';

const RegisterForm = () => {

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [repeatPassword, setRepeatPassword] = useState("");
    const [validRepeatPassword, setValidRepeatPassword] = useState(false);
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // check if username is valid
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    // check if email is valid
    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email));
    }, [email]);

    // check if password and repeat password are valid
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidRepeatPassword(password === repeatPassword);
    }, [password, repeatPassword]);

    // clear error message
    useEffect(() => {
        setErrMsg("");
    }, [email, username, password, repeatPassword]);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // incase JS hack check again if all data is valid
        const v1 = USER_REGEX.test(username);
        const v2 = MAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);
        const v4 = password === repeatPassword;
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Not all data is valid.");
            return;
        }
        try {
            await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                    confirmPassword: repeatPassword,
                }),
            );
            setSuccess(true);
            // clear input fields
            setEmail("");
            setUsername("");
            setPassword("");
            setRepeatPassword("");
        } catch (error: any) {
            if(!error?.response){
                setErrMsg("No server response. Please try again later.");
            }
            else if(error.response?.status === 500){
                setErrMsg("E-mail or username is already taken!");
            }
            else{
                setErrMsg("Something went wrong. Please try again later.");
            };
        }; 
    };

    return (
        <>
        {success ? (
            <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
                <div className='w-[28rem] bg-transparent backdrop-blur-xl text-white rounded-lg pt-7 pb-7 pl-10 pr-10 border-2 border-solid border-slate-600'>
                    <h1 className='text-4xl	text-center font-semibold'>
                        Success!
                    </h1>
                    <p className='text-base text-center mt-5 mb-4'>
                        You have successfully registered to MyCommsPoL!<br/>
                        Welcome to MyPHPoL community!
                    </p>
                    <Link to='/Login'>
                        <button className='btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold'>
                            Login
                        </button>
                    </Link>
                </div>
            <Routes>
                <Route path='/Login' element={<LoginPage />} />
            </Routes>
            </div>
        ) : (
        <div className=' w-full h-full bg-gradient-to-r from-main to-second bg-cover flex justify-center items-center min-h-screen min-w-screen'>
            <div className='w-[26rem] bg-transparent backdrop-blur-xl text-white rounded-lg pt-7 pb-7 pl-10 pr-10 border-2 border-solid border-slate-600'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-4xl	text-center font-semibold'>
                        Register
                    </h1>
                    <p className={errMsg ? 'bg-red-500 to-black font-bold p-2 mt-7 rounded-s-3xl rounded-e-3xl text-center' : "absolute left-[-9999px]"} aria-live="assertive">{errMsg}</p>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            id='email'
                            type='email'
                            required
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby='emailnote'
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='emailnote'
                            className={
                                emailFocus && email && !validEmail
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            Must be a valid e-mail address.
                        </p>
                        <FaEnvelope className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            type='text'
                            id='username'
                            autoComplete='off'
                            required
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='uidnote'
                            className={
                                usernameFocus && username && !validUsername
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            3 to 23 characters.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <FaUser className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            id='password'
                            type={passwordShown ? "text" : "password"}
                            autoComplete='off'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='pwdnote'
                            className={
                                passwordFocus && !validPassword
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            8 to 32 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label='exclamation mark'>!</span>{" "}
                            <span aria-label='at symbol'>@</span>{" "}
                            <span aria-label='hashtag'>#</span>{" "}
                            <span aria-label='dollar sign'>$</span>{" "}
                            <span aria-label='percent'>%</span>
                        </p>
                        <FaEye
                            className='text-base -translate-y-1/2 top-1/2 right-5 absolute cursor-pointer'
                            onClick={togglePasswordVisiblity}
                        />
                    </div>
                    <div className='relative w-full h-12 mt-7'>
                        <input
                            id='repeatPassword'
                            type={passwordShown ? "text" : "password"}
                            autoComplete='off'
                            required
                            placeholder='Repeat password'
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            aria-invalid={
                                validRepeatPassword ? "false" : "true"
                            }
                            aria-describedby='repeatnote'
                            onFocus={() => setRepeatPasswordFocus(true)}
                            onBlur={() => setRepeatPasswordFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='repeatnote'
                            className={
                                repeatPasswordFocus && !validRepeatPassword
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            Must match the password above.
                        </p>
                        <FaLock className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <br />
                    <button
                        disabled={!validEmail || !validUsername || !validPassword || !validRepeatPassword ? true : false}
                        type='submit'
                        className='btn w-full h-11 bg-white border-none outline-none rounded-s-3xl rounded-e-3xl shadow cursor-pointer text-base text-slate-800 font-bold disabled:bg-slate-500'>
                        Register
                    </button>

                    <div className='register-link text-sm text-center mt-5 mb-4'>
                        <p className='text-white no-underline font-semibold'>
                            Already a MyPHPoL community member?<br></br>
                            <button>
                                <Link
                                    className='text-white no-underline font-semibold hover:underline'
                                    to='/Login'>
                                    Login
                                </Link>
                            </button>
                        </p>
                    </div>
                </form>
            </div>
            <Routes>
                <Route path='/Login' element={<LoginPage />} />
            </Routes>
        </div>
        )};
        </>
    );
};
//the route part might need changes
export default RegisterForm;