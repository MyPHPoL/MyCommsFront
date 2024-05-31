import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { createChannel, editChannel } from "../../Api/axios";
import { dialogStyles } from '../DialogPopups/DialogStyles';
import { ChannelProps } from '../Channel';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';

/* Define the props for the CustomDialog component */
interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedId?: string;
  pushChannel?: (channel: ChannelProps) => void;
  passedName?: string;
  passedDescription?: string;
  serverId?: string;
  setChannelEdit: (editedChannel: ChannelProps) => void;
}

/* Define the CustomDialog component */
const EditChannelDialog: React.FC<DialogProps> = ({ open, handleClose, type, passedId, actions, passedName, passedDescription,serverId, setChannelEdit }) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [nameValue, setInputValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const isChannelDescriptionValid = description.length < 64;
  const didNameValueChange = nameValue !== passedName;
    // clear error message
    useEffect(() => {
        setErrMsg("");
    }, [nameValue, description]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const channelEdit = async () => {
    if(passedId !== undefined && serverId !== undefined) 
    try {
        
        var editedChannelId = passedId;
        const response = await editChannel(auth.token, nameValue, description, passedId);
        const editedChannel = {
          id: editedChannelId,
          name: nameValue,
          description: description,
          serverId: serverId,
        };
          setChannelEdit(editedChannel)
    } catch (error: any) {
      if (error.response.status === 409) {
        enqueueSnackbar("Channel name must be unique", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
      else {
        enqueueSnackbar("There was an error while editing channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  }
  const closeDialog = () => {
    setInputValue("");
    setDescription("");
    handleClose();
  }
  const handleEditChannel = () => {
    if (isNameValueValid && isChannelDescriptionValid && didNameValueChange) {
      channelEdit();
      closeDialog();
    } else {
      enqueueSnackbar("You cannot use the same channel name", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      //throw error
    }
  }
    //the future is now, all dialogs have been moved to separate components, this one stays for a bit longer because it has useful functions for a channel edit dialog, when it is created, this one will perish
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
        <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Edit channel</DialogTitle>
        <DialogContent sx={dialogStyles.inputField}>
          <TextField
            InputProps={{
              sx: dialogStyles.inputField
            }}
            InputLabelProps={{
              sx: dialogStyles.inputLabel
            }}
            placeholder={passedName}
            autoFocus
            margin="dense"
            id="AddChannelName"
            label="Channel name"
            type="text"
            fullWidth
            value={nameValue}
            onChange={handleInputChange}
          />
          <TextField
            InputProps={{
              sx: dialogStyles.inputField
            }}
            InputLabelProps={{
              sx: dialogStyles.inputLabel
            }}
            placeholder={passedDescription}
            autoFocus
            margin="dense"
            id="AddChannelDescription"
            label="Channel description"
            type="text"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
              {/* Confirm button, closes the dialog */}
              <Button onClick={handleEditChannel} sx={dialogStyles.styleButton}>
                Confirm
              </Button>
              {/* Cancel button, closes the dialog */}
              <Button onClick={closeDialog} sx={dialogStyles.styleButton}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );

}

/* Export the CustomDialog component */
export default EditChannelDialog;