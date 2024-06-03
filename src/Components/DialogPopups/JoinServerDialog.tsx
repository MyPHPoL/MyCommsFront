import { enqueueSnackbar } from "notistack";
import { ServerProps } from "../Server";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
import { joinServer } from "../../Api/axios";

interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  handleJoinServer: (server: ServerProps) => void;
}

const JoinServerDialog: React.FC<DialogProps> = ({ open, handleClose, actions, handleJoinServer }) => {
  const { auth }: { auth: any } = useAuth();
  const [nameValue, setInputValue] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  const handleAccept = () => {
    if (isNameValueValid) {
      serverJoin();
      closeDialog();
    } else {
    }
  }
  const serverJoin = async () => {
    try {
      const response = await joinServer(auth.token, nameValue);
      const newServer = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        isPublic: response.data.isPublic,
        ownerId: response.data.ownerId,
        picture: response.data.picture,
      };
      handleJoinServer(newServer);
    } catch (error: any) {
      if (error.response.status === 401) {
        handleError(error.response.status);
      }
      if (error.response.status === 404) {
        enqueueSnackbar("This server does not exist", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
      if (error.response.status === 400) {
        enqueueSnackbar("You are already in this server", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  }
  const closeDialog = () => {
    setInputValue('');
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Type the server name to join</DialogTitle>
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
          id="JoinServerName"
          label="Server name"
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
            <Button onClick={handleAccept} sx={dialogStyles.styleButton}>
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

export default JoinServerDialog;