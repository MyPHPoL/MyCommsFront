import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import { inviteFriendName } from "../../Api/axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { FriendProps } from "../FriendMessage";


interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedId?: string;

}

const AddFriendDialog: React.FC<DialogProps> = ({ open, handleClose, type, passedId, actions }) => {
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
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
    } else {
    }
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }


  const sendInvite = async () => {
    try {
      const response = await inviteFriendName(auth.token, nameValue);

      //handleNewFriend(newFriend);
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
        // Handle network errors here
        enqueueSnackbar("Network error. Please try again later.", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  };

  return (

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Type the username to add</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
        {/* Currently joining server is based on typing its name into the join, it will probably be changed in the future */}
        {/* once more, the server name value is used, poggies */}
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
        {actions ? actions : (
          <>
            {/* Confirm button, closes the dialog */}
            <Button onClick={handleAddFriend} sx={dialogStyles.styleButton}>
              Confirm
            </Button>
            {/* Cancel button, closes the dialog */}
            <Button onClick={handleClose} sx={dialogStyles.styleButton}>
              Cancel
            </Button>

          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendDialog;//yee yee ahh code just for the project to not throw error because this file was empty