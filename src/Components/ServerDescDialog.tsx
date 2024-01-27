import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface ServerDescDialogProps {
    open: boolean;
    handleClose: () => void;
    serverName: string | undefined;
    serverDescription: string | undefined;
}

const useStyles = makeStyles({
    dialogPaper: {
        width: '300px', // or whatever size you need
        height: '200px', // or whatever size you need
        backgroundColor: '#2a3a54',
        color: '#ffffff',
        borderRadius: '15px'
    },
    title: {
        backgroundColor: '#152238',
        fontWeight: 600, // replace with your desired color
    },
    description: {
        color: '#ffffff', // this will make the server description white
    },
    closeButton: {
        color: '#ffffff', // replace with your desired color
        backgroundColor: '#123456', // replace with your desired color
        fontWeight: 600, // replace with your desired color
        '&:hover': {
          backgroundColor: '#789abc', // replace with your desired color for hover state
          
        },
      },
    });

const ServerDescDialog: React.FC<ServerDescDialogProps> = ({ serverName, serverDescription }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='w-full'>
            <button onClick={handleOpen}>Show Server Description</button>
            <Dialog
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.dialogPaper }} // apply the custom styles here
            >
                <DialogTitle classes={{ root: classes.title }}>{serverName}</DialogTitle>
                <DialogContent>
                    <DialogContentText classes={{ root: classes.description }}>
                        {serverDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} className={classes.closeButton}>
  Close
</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServerDescDialog;