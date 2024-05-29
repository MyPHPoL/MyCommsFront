import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
import React from "react";

interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedId?: string;

}

const AddFriendDialog: React.FC<DialogProps> = ({ open, handleClose, type, passedId, actions }) => {
  const [nameValue, setInputValue] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddFriend = () => {
    if (isNameValueValid) {
      handleClose();
    } else {
    }
  }
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