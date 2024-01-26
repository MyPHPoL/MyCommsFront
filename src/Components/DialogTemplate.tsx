import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { Checkbox, FormControlLabel } from '@material-ui/core';

/* Define the props for the CustomDialog component */
interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  type?: string; /* Type of the dialog, we might change it to an enum later */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
}


/* Define the CustomDialog component */
const CustomDialog: React.FC<DialogProps> = ({ open, handleClose, type, actions }) => {
  /* Add a state variable for the input field */
  
  const [nameValue, setInputValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isPublic, setIsPublic] = React.useState(false);

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

  //this is how a confirm function will look like, all we need now is to connect it to the backend and validate the input
  const handleCreateServer = () => {
    console.log(nameValue);
    console.log(description);
    console.log(isPublic);
    handleClose();
  }

//WEEEEOOOOO 
if (type === 'Create Server') {
  return (
    /* Dialog component from Material UI */
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Server Creation</DialogTitle>
      <DialogContent>
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Server name"
          type="text"
          fullWidth
          value={nameValue}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Server description"
          type="text"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormControlLabel
            control={<Checkbox checked={isPublic} onChange={handleCheckboxChange} />}
            label="Is Public"
          />
        
      </DialogContent>
      {/* Actions of the dialog */}
      <DialogActions>
        {/* If custom actions are provided, use them, otherwise use default actions */}
        {actions ? actions : (
          <>
            {/* Cancel button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* Confirm button, closes the dialog */}
            <Button onClick={handleCreateServer} color="primary">
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );}else if(type === 'Add Channel'){
  return (
    /* Needs text labels and stuff*/
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add new channel</DialogTitle>
      <DialogContent>
        {/* for now the values used in both server and channel creation are the same in order not to create thousands of variables */}
        {/* as for now I am not familiar with the required validation, this might force us to create a new set of variables, or handle the validation differently */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Channel name"
          type="text"
          fullWidth
          value={nameValue}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
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
            {/* Cancel button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* Confirm button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
} else if(type=="Join server"){
  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Type the server name to join</DialogTitle>
      <DialogContent>
        {/* Currently joining server is based on typing its name into the join, it will probably be changed in the future */}
        {/* once more, the server name value is used, poggies */}
      <TextField
          autoFocus
          margin="dense"
          id="name"
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
            {/* Cancel button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* Confirm button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
              Confirm
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
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* Confirm button, closes the dialog */}
            <Button onClick={handleClose} color="primary">
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