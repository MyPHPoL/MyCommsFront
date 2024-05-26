import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import useAuth from '../Hooks/useAuth';
import { createChannel, editChannel } from "../Api/axios";
import { useStyles } from './DialogPopups/DialogStyles';
import { ChannelProps } from './Channel';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

/* Define the props for the CustomDialog component */
interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedId?: string;
  pushChannel?: (channel: ChannelProps) => void;
  toBeEditedChannel?: ChannelProps;
  setChannelEdit?: (editedChannel: ChannelProps) => void;
}

/* Define the CustomDialog component */
const CustomDialog: React.FC<DialogProps> = ({ open, handleClose, type, passedId, actions, toBeEditedChannel, pushChannel, setChannelEdit }) => {
  /* Add a state variable for the input field */
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [nameValue, setInputValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const isChannelDescriptionValid = description.length < 64;
  const didNameValueChange = nameValue !== toBeEditedChannel?.name;
  const classes = useStyles();

  /* Add a function to handle input changes */
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
  const channelEdit = async () => {
    try {
      if (toBeEditedChannel) {
        var editedChannelId = toBeEditedChannel.id;
        const response = await editChannel(auth.token, nameValue, description, editedChannelId);
        const editedChannel = {
          id: editedChannelId,
          name: nameValue,
          description: description,
          serverId: toBeEditedChannel.serverId,
        };
        if (setChannelEdit)
          setChannelEdit(editedChannel)
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        enqueueSnackbar("Channel name must be unique", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
      else {
        enqueueSnackbar("There was an error while editing channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      }
    }
  }

  const handleAddChannel = () => {
    if (isNameValueValid && isChannelDescriptionValid) {
      addChannel();
      handleClose();
    } else {
      //throw error
    }
  }

  const handleEditChannel = () => {
    if (isNameValueValid && isChannelDescriptionValid && didNameValueChange) {
      channelEdit();
      handleClose();
    } else {
      enqueueSnackbar("You cannot use the same channel name", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
      //throw error
    }
  }

  const handleAddFriend = () => {
    if (isNameValueValid) {
      handleClose();
    } else {
    }
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  //WEEEEOOOOO 
  if (type === 'Add Channel') {
    return (
      /* Needs text labels and stuff*/
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Add new channel</DialogTitle>
        <DialogContent className={classes.inputField}>
          {/* for now the values used in both server and channel creation are the same in order not to create thousands of variables */}
          {/* as for now I am not familiar with the required validation, this might force us to create a new set of variables, or handle the validation differently */}
          <TextField
            InputProps={{
              className: classes.inputField
            }}
            InputLabelProps={{
              className: classes.inputLabel
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
              className: classes.inputField
            }}
            InputLabelProps={{
              className: classes.inputLabel
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
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
              {/* Confirm button, closes the dialog */}
              <Button onClick={handleAddChannel} className={classes.styleButton}>
                Confirm
              </Button>
              {/* Cancel button, closes the dialog */}
              <Button onClick={handleClose} className={classes.styleButton}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  } else if (type === "Add Friend") {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Invite Your Friends!</DialogTitle>
        <DialogContent className={classes.inputField}>
          {/* Currently joining server is based on typing its name into the join, it will probably be changed in the future */}
          {/* once more, the server name value is used, poggies */}
          <TextField
            InputProps={{
              className: classes.inputField
            }}
            InputLabelProps={{
              className: classes.inputLabel
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
              <Button onClick={handleAddFriend} className={classes.styleButton}>
                Confirm
              </Button>
              {/* Cancel button, closes the dialog */}
              <Button onClick={handleClose} className={classes.styleButton}>
                Cancel
              </Button>

            </>
          )}
        </DialogActions>
      </Dialog>
    );
  } else
    //THIS IS THE DEFAULT TEMPLATE FOR DIALOGS, returned if the type is not specified, as for now its retruned if the type is not specified
    //in the future it might be changed to return an error, and the default template might be moved
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {/* Title of the dialog */}
        <DialogTitle id="form-dialog-title">siusiu</DialogTitle>
        {/* Content of the dialog */}
        <DialogContent>
        </DialogContent>
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
              {/* Cancel button, closes the dialog */}
              <Button onClick={handleClose} className={classes.styleButton}>
                Cancel
              </Button>
              {/* Confirm button, closes the dialog */}
              <Button onClick={handleClose} className={classes.styleButton}>
                Confirm
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );

}

/* Export the CustomDialog component */
export default CustomDialog;