import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { deleteChannel, deleteServer, editServer } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { useStyles } from "./DialogStyles";
import { ChannelProps } from "../Channel";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import React from "react";

interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedName: string;
  passedDesc: string;
  serverId: string;
  setChannelEdit?: (editedChannel: ChannelProps) => void;
}
const EditServerDialog: React.FC<DialogProps> = ({open, handleClose, actions, passedName, passedDesc, serverId}) => {
    const nameRegex = /^.{1,32}$/;
    const descRegex = /^.{0,128}$/;
    const { auth }: { auth: any } = useAuth();
    const classes = useStyles();
    const [name, setName] = useState(passedName);
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [description, setDescription] = useState(passedDesc);
    const [validDescription, setValidDescription] = useState(false);
    const [descriptionFocus, setDescriptionFocus] = useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [errMsg, setErrMsg] = useState("");

    const handlePictureChange = (newFile: File | null): void => {
        setFile(newFile);
      }
  // clear error message
  useEffect(() => {
    setErrMsg("");
}, [name, description]);


const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name === passedName && description === passedDesc && !file) {
        handleClose();
        return;
    }
    try {
      if (description === passedDesc) {
        await editServer(auth.token, serverId, name, passedDesc, file);
      } else {
        await editServer(auth.token, serverId, name, description, file);
      }
      setFile(null);
      handleClose();
    } catch (error: any) {
        if (!error?.response) {
            setErrMsg("No server response. Please try again later.");
        } else if (error.response?.status === 500) {
            setErrMsg("Server name already taken!");
        } else {
            setErrMsg("Something went wrong. Please try again later.");
        }
    }
};
    useEffect(() => {
        setValidName(nameRegex.test(name));
    }, [name]);
    useEffect(() => {
        setValidDescription(descRegex.test(description));
      }, [description]);
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.dialogPaper }}>
                <DialogTitle classes={{ root: classes.title }}>
                    Change server details
                </DialogTitle>
                <DialogContent>
                    <p
                        className={
                            errMsg
                                ? "bg-red-500 to-black font-bold p-2 mt-7 rounded-s-3xl rounded-e-3xl text-center"
                                : "absolute left-[-9999px]"
                        }
                        aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label className='text-white mt-7'>Server name</label>
                    <div className='relative w-full h-12 mb-7'>
                        <input
                            type='text'
                            required
                            placeholder='Server name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={validName ? "false" : "true"}
                            autoComplete='off'
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='emailnote'
                            className={
                                nameFocus && name && !validName
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            The server name must be between 0 and 32 characters.
                        </p>
                        <FaEnvelope className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
                    </div>
                    <label className='text-white mt-7'>Description</label>
                    <div className='relative w-full h-12 mb-7'>
                        <input
                            value={description}
                            type='text'
                            required
                            placeholder='Description'
                            autoComplete='off'
                            onChange={(e) => setDescription(e.target.value)}
                            onFocus={() => setDescriptionFocus(true)}
                            onBlur={() => setDescriptionFocus(false)}
                            className='placeholder:color-white w-full h-full border-2 border-solid border-slate-600 bg-transparent outline-none color-white rounded-s-3xl rounded-e-3xl pt-5 pr-11 pb-5 pl-5'
                        />
                        <p
                            id='uidnote'
                            className={
                                descriptionFocus && description && !validDescription
                                    ? "text-xs rounded-lg bg-black text-white p-1 relative -bottom-2.5 z-10"
                                    : "absolute left-[-9999px]"
                            }>
                            3 to 23 characters.
                            <br />
                        </p>
                        <FaUser className='text-base -translate-y-1/2 top-1/2 right-5 absolute' />
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
                    <Button onClick={handleSubmit} className={classes.styleButton}>
                        Apply Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
  export default EditServerDialog;
