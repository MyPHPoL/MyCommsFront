import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from './DialogStyles';

interface ServerDescDialogProps {
    open: boolean;
    handleClose: () => void;
    serverName: string | undefined;
    serverDescription: string | undefined;
}

const useLocalStyles = makeStyles({
    dialogPaper: {
        width: '300px', // replace with your desired width
        height: '200px',
        backgroundColor: '#2a3a54',
        color: '#ffffff',
        borderRadius: '15px' // replace with your desired height
    },
});

const ServerDescDialog: React.FC<ServerDescDialogProps> = ({ serverName, serverDescription }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const localClasses = useLocalStyles();

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
                classes={{ paper: localClasses.dialogPaper }} // apply the custom styles here
            >
                <DialogTitle classes={{ root: classes.title }}>{serverName}</DialogTitle>
                <DialogContent>
                    <DialogContentText classes={{ root: classes.whiteText }}>
                        {serverDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className={classes.styleButton}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServerDescDialog;