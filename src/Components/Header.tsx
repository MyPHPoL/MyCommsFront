import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import TopbarServer from "./TopbarServer";
import { IconButton } from "./IconLib";
import { IoServer } from "react-icons/io5";
import { FaEnvelope, FaEye, FaLock, FaUser, FaUserFriends } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import SidebarBasic from "./TopbarBasic";
import TopbarFriend from "./TopbarFriend";
import useAuth from '../Hooks/useAuth';
import { editUser, getFriends, getServers, registerUser } from "../Api/axios";
import { ServerProps } from "./Server";
import { FriendProps } from "./FriendMessage";
import { FaRegUser } from "react-icons/fa";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useTitle } from '../Hooks/useTitle';
import { IoLogInOutline } from "react-icons/io5";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from './DialogStyles';
import { MAIL_REGEX, PWD_REGEX, USER_REGEX } from './RegisterForm';

function Header() {
  const [activeTopbar, setActiveTopbar] = useState<string | null>(null);
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const { setAuth }: { setAuth: any } = useAuth();
  const [servers, setServers] = useState<ServerProps[] | undefined>();
  const [friends, setFriends] = useState<FriendProps[] | undefined>();
  const [tmpServer, setTmpServer] = useState<ServerProps | undefined>();
  const [toRemoveId, setToRemoveId] = useState('');
  const [openSettings, setOpenSettings] = useState(false);

  const handleDialogClose = () => {
    setOpenSettings(false);
  };

  const removeServer = (id: string) => {
    setToRemoveId(id);
    console.log('removed')
  }
  const pushServer = (server: ServerProps) => {
    setTmpServer(server);
  }
  useEffect(() => {
    if (tmpServer) {
      if (servers) {
        setServers([...servers, tmpServer]);
      }
    }
  }, [tmpServer])

  useEffect(() => {
    if (servers) {
      if (toRemoveId) {
        // toRemoveId is string but server.id is number thus != instead of !==
        setServers(servers.filter((server) => server.id != toRemoveId))
      }
    }
  }, [toRemoveId])

  useEffect(() => {
    let isMounted = true; // something, something not to render when component is unmounted
    const controller = new AbortController(); // cancels request when component unmounts

    const fetchServers = async () => {
      try {
        const response = await getServers(auth.token);
        isMounted && setServers(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load your server list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await getFriends(auth.token);
        isMounted && setFriends(response.data);
      } catch (error: any) {
        enqueueSnackbar("We couldn't load your friend list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    };

    fetchServers();
    fetchFriends();

    return () => {
      isMounted = false;
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    setAuth({}); // clear auth context
    <Navigate to='/home' />;
  };

  const changeAuth = (id: string, email: string, username: string, password: string, token: string) => {
    setAuth({ id, email, username, password, token });
  }

  useTitle('MyCommsPoL - Home');

  return (
    <div>
      <nav className="float-left h-20 w-full fixed bg-primary">
        <ul className="float-left  flex leading-[80px] text-white uppercase">
          <li className="float-left text-white text-3xl font-bold leading-[80px] pl-12">{auth.username}</li>
          <li className="relative flex items-center justify-center ml-3">
            <button onClick={toggleDropdown}>
              <IconButton icon={<FaRegUser size={30} />} name="UserSettings" ></IconButton>
            </button></li>
          <li className="relative flex items-center justify-center mx-auto" id="dropdown-button">

            {/* dropdown that is toggled by above button, currently test values, new content to have tailwind classes like "test" */}
            <div id="dropdown-menu" className="hidden divide-y top-[40px] left-[-5px] z-10 divide-primary absolute text-white w-[8rem] border border-white bg-secondary mt-2 rounded-xl text-base">
              <div className="py-2 flex px-2 align-center cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-t-xl text-center justify-center items-center space-x-2">
                <IoMdSettings size='20' />
                <span onClick={() => setOpenSettings(true)}>Settings</span>
              </div>
              <div className="py-2 px-2 cursor-pointer hover:text-primary hover:bg-yellow-500 rounded-b-xl text-center flex justify-center items-center space-x-2" onClick={logout}>
                <IoLogInOutline size='20' />
                <span>Log out</span>
              </div>
            </div>
          </li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
          <li className="relative flex items-center justify-center mx-auto mr-1"><button onClick={() => setActiveTopbar('servers')}><IconButton icon={<IoServer size={30} />} name="Server List"></IconButton></button></li>
          <li className="relative flex items-center justify-center mx-auto"><button onClick={() => setActiveTopbar('friends')}><IconButton icon={<FaUserFriends size={30} />} name="Friend List"></IconButton></button></li>
          <label style={{ borderRight: '2px solid grey', borderRadius: '50%', margin: '15px' }}></label>
        </ul>
        <div className="my-2 flex">
          <SidebarBasic handleAddServer={pushServer} />
          {activeTopbar === 'servers' && <TopbarServer servers={servers} removeServer={removeServer} />}
          {activeTopbar === 'friends' && <TopbarFriend friends={friends} />}
        </div>
      </nav>
      <SnackbarProvider autoHideDuration={3000} />
      <SettingsDialog
        open={openSettings}
        handleClose={handleDialogClose}
        userData={auth}
        changeAuth={changeAuth}
      />
    </div>
  );
  function toggleDropdown() {
    const dropdown = document.querySelector('#dropdown-menu');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }
}

// copied 90% from RegisterForm.tsx works, so i dont care, maybe refactor later, but probably not
const SettingsDialog = ({open, handleClose, userData, changeAuth}: {open: boolean, handleClose: () => void, userData: {}, changeAuth: (id: string, email: string, username: string, password: string, token: string) => void })  => {
  let classes = useStyles();
  const [email, setEmail] = useState((userData as { email: string }).email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState((userData as { username: string }).username);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [newPassword, setPassword] = useState((userData as { password: string }).password);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState((userData as { password: string }).password);
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

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

  // clear error message
  useEffect(() => {
      setErrMsg("");
  }, [email, username, newPassword, repeatPassword]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
  };

  const resetSettings = () => {
      setEmail((userData as { email: string }).email);
      setUsername((userData as { username: string }).username);
      setPassword((userData as { password: string }).password);
      setRepeatPassword((userData as { password: string }).password);
  };

  const handleSubmit = async (e: any) => {
      e.preventDefault();

      // incase JS hack check again if all data is valid
      const v1 = USER_REGEX.test(username);
      const v2 = MAIL_REGEX.test(email);
      const v3 = PWD_REGEX.test(newPassword);
      const v4 = newPassword === repeatPassword;
      if (!v1 || !v2 || !v3 || !v4) {
          setErrMsg("Not all data is valid.");
          return;
      }
      if (username === (userData as { username: string }).username && email === (userData as { email: string }).email && newPassword === (userData as { password: string }).password && repeatPassword === (userData as { password: string }).password) {
          handleClose();
          return;
      }
      try {
        if (newPassword === (userData as { password: string }).password) {
          await editUser((userData as { token: string }).token, username, email, null, (userData as { password: string }).password);
          changeAuth((userData as { id: string }).id, email, username, (userData as { password: string }).password, (userData as { token: string }).token);
          handleClose();
        } else {
          await editUser((userData as { token: string }).token, username, email, newPassword, (userData as { password: string }).password);
          changeAuth((userData as { id: string }).id, email, username, newPassword, (userData as { token: string }).token);
          handleClose();
        }
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
                  <label className='text-white mt-7'>Password</label>
                  <div className='relative w-[500px] h-12 mb-7'>
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

export default Header;