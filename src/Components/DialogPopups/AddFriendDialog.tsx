import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import { inviteFriendName } from "../../Api/axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddFriendDialog: React.FC<DialogProps> = ({ open, handleClose }) => {
  const { auth }: { auth: any } = useAuth();
  const [nameValue, setInputValue] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddFriend = () => {
    if (isNameValueValid) {
      sendInvite();
      handleClose();
    }
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }

  const sendInvite = async () => {
    try {
      const response = await inviteFriendName(auth.token, nameValue);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleError(error.response.status);
        }
        if (error.response.status === 404) {
          enqueueSnackbar("This user does not exist", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        }
        if (error.response.status === 400) {
          enqueueSnackbar("You are already friends", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
        }
      } else {
        enqueueSnackbar("Network error. Please try again later.", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Type the username to add</DialogTitle>
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
          id="AddFriendUsermame"
          label="Friend Username"
          type="text"
          fullWidth
          value={nameValue}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddFriend} sx={dialogStyles.styleButton}>
          Confirm
        </Button>
        <Button onClick={handleClose} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendDialog;