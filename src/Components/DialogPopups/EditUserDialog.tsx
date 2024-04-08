import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { MuiFileInput } from "mui-file-input";
import { useState, useEffect } from "react";
import { FaEnvelope, FaUser, FaEye, FaLock } from "react-icons/fa";
import { editUser } from "../../Api/axios";
import { USER_REGEX, MAIL_REGEX, PWD_REGEX } from "../RegisterForm";
import { useStyles } from "./DialogStyles";
import CloseIcon from '@mui/icons-material/Close'
import React from "react";
import useAuth from "../../Hooks/useAuth";

// copied 90% from RegisterForm.tsx works, so i dont care, maybe refactor later, but probably not
const SettingsDialog = ({open, handleClose, changeAuth}: {open: boolean, handleClose: () => void, changeAuth: (token: string) => void })  => {
    let classes = useStyles();
    const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
    const [email, setEmail] = useState(auth.email);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
  
    const [username, setUsername] = useState(auth.username);
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
  
    const [oldPassword, setOldPassword] = useState("");
    const [oldvalidPassword, oldsetValidPassword] = useState(false);
    const [oldpasswordFocus, oldsetPasswordFocus] = useState(false);
  
    const [newPassword, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
  
    const [repeatPassword, setRepeatPassword] = useState("");
    const [validRepeatPassword, setValidRepeatPassword] = useState(false);
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState("");
    const [file, setFile] = React.useState<File | null>(null);
  
    const handlePictureChange = (newFile: File | null): void => {
      setFile(newFile);
    }
  
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
        setValidPassword(PWD_REGEX.test(newPassword));
        setValidRepeatPassword(newPassword === repeatPassword);
    }, [newPassword, repeatPassword]);
  
    // check if old password is valid
    useEffect(() => {
        if (oldPassword) {
            setValidPassword(PWD_REGEX.test(oldPassword));
        }
    }, [oldPassword]);
  
    // clear error message
    useEffect(() => {
        setErrMsg("");
    }, [email, username, newPassword, repeatPassword]);
  
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
  
    const resetSettings = () => {
        setEmail(auth.email);
        setUsername(auth.username);
        setPassword("");
        setOldPassword("");
        setRepeatPassword("");
        setFile(null);
    };
  
    const handleSubmit = async (e: any) => {
        e.preventDefault();
  
        if ((username === auth.username || !username) && (email === auth.email || !email) && !oldPassword && !newPassword && !repeatPassword && !file) {
            setErrMsg("No changes made.");
            return;
        }
        if(oldPassword && newPassword != repeatPassword){
            setErrMsg("New password and repeat password do not match.");
            return;
        }
        if(!oldPassword && (newPassword || repeatPassword)){
            setErrMsg("Please enter your old password to update password.");
            return;
        }
        try {
        if(!oldPassword && !newPassword && !repeatPassword){
            await editUser(auth.token, email, username, null, null, file);
        }
        if(oldPassword && newPassword && repeatPassword){
            await editUser(auth.token, email, username, oldPassword, newPassword, file);
        }
          changeAuth(auth.token);
          setFile(null);
          handleClose();
        } catch (error: any) {
            if (!error?.response) {
                setErrMsg("No server response. Please try again later.");
            } else if (error.response?.status === 500) {
                setErrMsg("E-mail or username is already taken!");
            } else {
                setErrMsg("Something went wrong. Please try again later.");
            }
        }
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.dialogPaper }}>
                <DialogTitle classes={{ root: classes.title }}>
                    Change user settings
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.inputField}>
                        Change your e-mail address, username or password.
                    </DialogContentText>
                    <p
                        className={
                            errMsg
                                ? "bg-red-500 to-black font-bold p-2 mt-7 rounded-s-3xl rounded-e-3xl text-center"
                                : "absolute left-[-9999px]"
                        }
                        aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label className='text-white mt-7'>E-mail</label>
                    <div className='relative w-full h-12 mb-7'>
                        <input
                            type='text'
                            required
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            autoComplete='off'
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
                    <label className='text-white mt-7'>Username</label>
                    <div className='relative w-full h-12 mb-7'>
                        <input
                            value={username}
                            type='text'
                            required
                            placeholder='Username'
                            autoComplete='off'
                            onChange={(e) => setUsername(e.target.value)}
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
                    <label className='text-white mt-7'>Old Password</label>
                    <div className='relative h-12 mb-7'>
                        <input
                            value={oldPassword}
                            type={passwordShown ? "text" : "password"}
                            required
                            placeholder='Password'
                            autoComplete='off'
                            onChange={(e) => setOldPassword(e.target.value)}
                            aria-invalid={oldvalidPassword ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={() => oldsetPasswordFocus(true)}
                            onBlur={() => oldsetPasswordFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <FaEye
                            className='text-base -translate-y-1/2 top-1/2 right-5 absolute cursor-pointer'
                            onClick={togglePasswordVisiblity}
                        />
                    </div>
                    <label className='text-white mt-7'>New Password</label>
                    <div className='relative h-12 mb-7'>
                        <input
                            value={newPassword}
                            type={passwordShown ? "text" : "password"}
                            required
                            placeholder='Password'
                            autoComplete='off'
                            onChange={(e) => setPassword(e.target.value)}
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
                            Must include uppercase and lowercase letters, a number
                            and a special character.
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
                    <label className='text-white mt-7'>Confirm Password</label>
                    <div className='relative w-full h-12 mb-7'>
                        <input
                            id='repeatPassword'
                            type={passwordShown ? "text" : "password"}
                            autoComplete='off'
                            required
                            placeholder='Repeat password'
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            aria-invalid={validRepeatPassword ? "false" : "true"}
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
                    <label className='text-white mt-7'>Change Avatar</label>
                    <div className='relative w-full h-12 mb-7 border-white'>
                      <MuiFileInput value={file} inputProps={{ accept: '.png, .jpeg .jpg' }}  onChange={handlePictureChange} 
                      clearIconButtonProps={{
                        title: "Remove",
                        children: <CloseIcon fontSize="small" />
                      }}
                      placeholder="Insert a file"
                      className={classes.inputField}
                      />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.styleButton}>
                        Cancel
                    </Button>
                    <Button onClick={resetSettings} className={classes.styleButton}>
                        Reset
                    </Button>
                    <Button onClick={handleSubmit} className={classes.styleButton}>
                        Change Settings
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  }

  export default SettingsDialog;