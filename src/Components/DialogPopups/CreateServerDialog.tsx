import { enqueueSnackbar } from "notistack";
import { createServer } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import React from "react";
import { ServerProps } from "../Server";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { dialogStyles } from "./DialogStyles";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  handleAddServer: (server: ServerProps) => void;
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

const CreateServerDialog: React.FC<DialogProps> = ({ open, handleClose, handleAddServer }) => {
  const { auth }: { auth: any } = useAuth();
  const [nameValue, setInputValue] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const [description, setDescription] = React.useState('');
  const isServerDescriptionValid = (description.length < 128);
  const [isPublic, setIsPublic] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  }

  const serverCreate = async () => {
    try {
      const response = await createServer(auth.token, nameValue, description, isPublic);
      const newServer = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        isPublic: response.data.isPublic,
        ownerId: response.data.ownerId,
      };
      handleAddServer(newServer);
    } catch (error: any) {
      if (error.response.status === 409) {
        enqueueSnackbar("Server with this name already exists", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
      else {
        enqueueSnackbar("There was an error while creating server", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  }

  const handleCreateServer = () => {
    if (isNameValueValid && isServerDescriptionValid) {
      serverCreate();
      closeDialog();
    }
  }

  const closeDialog = () => {
    setInputValue("");
    setDescription("");
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Server Creation</DialogTitle>
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
          id="CreateServerName"
          label="Server name"
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
          id="CreateServerDescription"
          label="Server description"
          type="text"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControlLabel
          control={<CustomCheckbox checked={isPublic} onChange={handleCheckboxChange} />}
          label="Is Public"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateServer} sx={dialogStyles.styleButton}>
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