import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

/* Define the props for the CustomDialog component */
interface DialogProps {
  open: boolean; /* Whether the dialog is open or not */
  handleClose: () => void; /* Function to close the dialog */
  title: string; /* Title of the dialog */
  content: string; /* Content of the dialog */
  actions?: React.ReactNode; /* Optional custom actions for the dialog */
}


/* Define the CustomDialog component */
const CustomDialog: React.FC<DialogProps> = ({ open, handleClose, title, content, actions }) => {
  /* Add a state variable for the input field */
  const [inputValue, setInputValue] = React.useState('');

  /* Add a function to handle input changes */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    /* Dialog component from Material UI */
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      {/* Title of the dialog */}
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      {/* Content of the dialog */}
      <DialogContent>
        {content}
         {/* Add the input field */}
         <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Input Field"
          type="text"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
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
}

/* Export the CustomDialog component */
export default CustomDialog;