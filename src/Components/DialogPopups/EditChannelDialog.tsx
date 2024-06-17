import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import { editChannel } from "../../Api/axios";
import { dialogStyles } from '../DialogPopups/DialogStyles';
import { ChannelProps } from '../Channel';
import { enqueueSnackbar } from 'notistack';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  passedId: string;
  pushChannel: (channel: ChannelProps) => void;
  passedName: string;
  passedDescription?: string;
  serverId?: string;
  setChannelEdit: (editedChannel: ChannelProps) => void;
}

const EditChannelDialog: React.FC<DialogProps> = ({ open, handleClose, passedId, passedName, passedDescription, serverId, setChannelEdit }) => {
  const { auth }: { auth: any } = useAuth();
  const [nameValue, setInputValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const isChannelDescriptionValid = description.length < 64;
  const didNameValueChange = nameValue !== passedName;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const channelEdit = async () => {
    if (passedId !== undefined && serverId !== undefined)
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
    }
  }

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
      <DialogActions>
        <Button onClick={handleEditChannel} sx={dialogStyles.styleButton}>
          Confirm
        </Button>
        <Button onClick={closeDialog} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditChannelDialog;