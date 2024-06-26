import { enqueueSnackbar } from "notistack";
import useAuth from "../../Hooks/useAuth";
import React from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { dialogStyles } from "./DialogStyles";
import { ChannelProps } from "../Channel";
import { createChannel } from "../../Api/axios";
import { useNavigate } from 'react-router-dom';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  passedId: string;
  pushChannel: (channel: ChannelProps) => void;
}

const CustomCheckbox = withStyles({
  root: {
    color: '#ffffff',
    '&$checked': {
      color: '#FBC02D',
    },
  },
  checked: {},
})(Checkbox);

const CreateServerDialog: React.FC<DialogProps> = ({ open, handleClose, passedId, pushChannel }) => {
  const { auth }: { auth: any } = useAuth();
  const navigate = useNavigate();
  const [nameValue, setInputValue] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const [description, setDescription] = React.useState('');
  const isChannelDescriptionValid = description.length < 64;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const addChannel = async () => {
    try {
      const response = await createChannel(auth.token, nameValue, description, passedId ?? '');
      const newChannel = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        serverId: response.data.serverId,
      };
      if (pushChannel) {
        pushChannel(newChannel);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        handleError(error.response.status);
      }
      if (error.response.status === 409) {
        enqueueSnackbar("Channel with this name already exists", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
      else {
        enqueueSnackbar("There was an error while creating channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  }
  const handleAddChannel = () => {
    if (isNameValueValid && isChannelDescriptionValid) {
      addChannel();
      closeDialog();
    } // If the input is valid we handle adding channel and close the dialog, otherwise we don't close it
  }

  const closeDialog = () => {
    setInputValue("");
    setDescription("");
    handleClose();
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Add new channel</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
        <TextField
          InputProps={{
            sx: dialogStyles.inputField
          }}
          InputLabelProps={{
            sx: dialogStyles.inputLabel
          }}
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
      <DialogActions>
        <Button onClick={handleAddChannel} sx={dialogStyles.styleButton}>
          Confirm
        </Button>
        <Button onClick={closeDialog} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateServerDialog;