import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ServerDescDialogProps {
    open: boolean;
    handleClose: () => void;
    serverName: string | undefined;
    serverDescription: string | undefined;
}

const useStyles = makeStyles({
    dialogPaper: {
        width: '300px',
        height: '200px',
        backgroundColor: '#2a3a54',
        color: '#ffffff',
        borderRadius: '15px'
    },
    title: {
        backgroundColor: '#152238',
        fontWeight: 600,
    },
    description: {
        color: '#ffffff',
    },
    closeButton: {
        color: '#ffffff',
        backgroundColor: '#123456',
        fontWeight: 600,
        '&:hover': {
            backgroundColor: '#789abc',

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
                classes={{ paper: classes.dialogPaper }}>
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