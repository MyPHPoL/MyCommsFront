import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { Checkbox, FormControlLabel } from '@material-ui/core';
import useAuth from '../Hooks/useAuth';
import { createChannel, createServer, deleteChannel, deleteServer, editChannel, joinServer } from "../Api/axios";
import { useStyles } from './DialogStyles';
import { withStyles } from '@material-ui/core/styles';
import { ChannelProps } from './Channel';
import { Navigate, useNavigate } from 'react-router-dom';
import { ServerProps } from './Server';
import { enqueueSnackbar } from 'notistack';

/* Define the props for the CustomDialog component */
interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
  passedId?: string;
  pushChannel?:(channel:ChannelProps)=>void;
  handleAddServer?: (server: ServerProps) => void;
  removeChannel?: (removeId: string) => void;
  removeServer?: (toRemoveId: string) => void;
  toBeEditedChannel?: ChannelProps;
  setChannelEdit?: (editedChannel: ChannelProps) => void;
}


const CustomCheckbox = withStyles({
  root: {
    color: '#ffffff', // replace with your desired color
    '&$checked': {
      color: '#FBC02D', // replace with your desired color
    },
  },
  checked: {},
})(Checkbox);

/* Define the CustomDialog component */
const CustomDialog: React.FC<DialogProps> = ({ open, handleClose, type, passedId, actions, toBeEditedChannel , handleAddServer, pushChannel, removeChannel, removeServer,setChannelEdit }) => {
  /* Add a state variable for the input field */
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [nameValue, setInputValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isPublic, setIsPublic] = React.useState(false);
  const isNameValueValid = (nameValue.length < 32) && (nameValue.length > 0);
  const isServerDescriptionValid = description.length < 128;
  const isChannelDescriptionValid = description.length < 64;
  const classes = useStyles();

  /* Add a function to handle input changes */
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
      if (handleAddServer) {
        handleAddServer(newServer);
      }
    } catch (error: any) {
      if(error.response.status === 409){
        enqueueSnackbar("Server with this name already exists", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
      else{
        enqueueSnackbar("There was an error while creating server", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
    }
  }

  const handleDeleteServer = () => {
    //needs to redirect to home here 
    serverDelete();
    handleClose();
  }

    const serverDelete = async () => {
      try {
        const response = await deleteServer(auth.token, passedId ?? '');
        if(removeServer){
        removeServer(passedId ?? '');
      }
        navigate("/home");
      } catch (error: any) {
        handleError(error.response.status);
      }
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
      if(error.response.status === 404){
        handleError(error.response.status);
      }
      if(error.response.status === 409){
        enqueueSnackbar("Channel with this name already exists", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
      else{
        enqueueSnackbar("There was an error while creating channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
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
      };
      if (handleAddServer) {
        handleAddServer(newServer);
      }
    } catch (error: any) {
        if (error.response.status === 401) {
          handleError(error.response.status);
        }
        if (error.response.status === 404) {
          enqueueSnackbar("This server does not exist", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
        }
        if (error.response.status === 400) {
          enqueueSnackbar("You are already in this server", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
        }
    }
  }

  const handleDeleteChannel = () =>{
    //needs to redirect to server here 
    channelDelete();
    handleClose();
  }
  const channelDelete = async () => {
    try {
      const response = await deleteChannel(auth.token, passedId ?? '');
      if (removeChannel) {
        removeChannel(passedId ?? '');
      }
      navigate("");
    } catch (error: any) {
      enqueueSnackbar("There was an error while deleting channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
    }
  }
  const channelEdit = async () => {
    try {
      if(toBeEditedChannel){
      var editedChannelId = toBeEditedChannel.id;
      const response = await editChannel(auth.token, nameValue, description, editedChannelId);
      const editedChannel = {
        id: editedChannelId,
        name: nameValue,
        description: description,
        serverId: toBeEditedChannel.serverId,
        };
      if(setChannelEdit)
      setChannelEdit(editedChannel)
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        enqueueSnackbar("Channel name must be unique", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
      else {
        enqueueSnackbar("There was an error while editing channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }});
      }
    }
  }

  //this is how a confirm function will look like, all we need now is to connect it to the backend and validate the input
  const handleCreateServer = () => {
    if (isNameValueValid && isServerDescriptionValid) {
      serverCreate();
      handleClose();
    } else {
      //throw error
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
    if (isNameValueValid && isChannelDescriptionValid) {
      channelEdit();
      handleClose();
    } else {
      //throw error
    }
  }


  const handleJoinServer = () => {
    if(isNameValueValid){
    serverJoin();
    handleClose();
    }else{
    }
  }
  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  //WEEEEOOOOO 
  if (type === 'Create Server') {
    return (
      /* Dialog component from Material UI */
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Server Creation</DialogTitle>
        <DialogContent className={classes.inputField}>
          <TextField
            InputProps={{
              className: classes.inputField
            }}
            InputLabelProps={{
              className: classes.inputLabel
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
              className: classes.inputField
            }}
            InputLabelProps={{
              className: classes.inputLabel
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
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
              {/* Confirm button, closes the dialog */}
              <Button onClick={handleCreateServer} className={classes.styleButton}>
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
  } else if (type === 'Add Channel') {
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
  } else if (type === "Join Server") {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Type the server name to join</DialogTitle>
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
              <Button onClick={handleJoinServer} className={classes.styleButton}>
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
  } else if(type === "deleteChannel"){
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Are You sure You want to delete the channel?</DialogTitle>
        <DialogContent className={classes.inputField}>
        </DialogContent>
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
            <Button onClick={handleDeleteChannel} className={classes.styleButton}>
                Yes
              </Button>
              <Button onClick={handleClose} className={classes.styleButton}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );

  }else if(type === "deleteServer"){
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are You sure You want to delete the server?</DialogTitle>
        <DialogContent>
        </DialogContent>
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
            <Button onClick={handleDeleteServer} className={classes.styleButton}>
                Yes
              </Button>
              <Button onClick={handleClose} className={classes.styleButton}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }else if (type === 'EditChannel') {
    return (
      /* Needs text labels and stuff*/
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
        <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Edit channel</DialogTitle>
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
            placeholder={toBeEditedChannel?.name}
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
            placeholder={toBeEditedChannel?.description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        {/* Actions of the dialog */}
        <DialogActions>
          {/* If custom actions are provided, use them, otherwise use default actions */}
          {actions ? actions : (
            <>
              {/* Confirm button, closes the dialog */}
              <Button onClick={handleEditChannel} className={classes.styleButton}>
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
  }else
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