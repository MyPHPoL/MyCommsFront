import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import { inviteFriendName } from "../../Api/axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface DialogProps {
  open: boolean;
  username: string;
  handleClose: () => void;
}

const AddFriendFromListDialog: React.FC<DialogProps> = ({ open, username, handleClose}) => {
  const { auth }: { auth: any } = useAuth();
  const navigate = useNavigate();

  const handleAddFriend = () => {
      sendInvite();
      handleClose();
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }

  const sendInvite = async () => {
    try {
      const response = await inviteFriendName(auth.token, username);
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
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Are you sure you want to invite {username} to friends?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddFriend} sx={dialogStyles.styleButton}>
          Yes
        </Button>
        <Button onClick={handleClose} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddFriendFromListDialog;