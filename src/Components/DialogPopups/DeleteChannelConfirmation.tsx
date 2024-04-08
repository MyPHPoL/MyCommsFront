import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { deleteChannel } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { useStyles } from "./DialogStyles";

interface DialogProps {
    open: boolean; 
    handleClose: () => void; 
    removeChannel: (removeId: string) => void;
    passedId: string;
    actions?: React.ReactNode;
  }


const DeleteChannelConfirmation: React.FC<DialogProps> = ({open, handleClose, actions, removeChannel ,passedId}) => {
    const navigate = useNavigate();
    const { auth }: { auth: any } = useAuth();
    const classes = useStyles();
    const channelDelete = async () => {
        try {
        const response = await deleteChannel(auth.token, passedId);
        removeChannel(passedId);
      navigate("");
    } catch (error: any) {
      enqueueSnackbar("There was an error while deleting channel", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  }
  
  const handleDeleteChannel = () => {
    //needs to redirect to server here 
    channelDelete();
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
      <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Are you sure you want to delete the channel?</DialogTitle>
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

}
  export default DeleteChannelConfirmation;
