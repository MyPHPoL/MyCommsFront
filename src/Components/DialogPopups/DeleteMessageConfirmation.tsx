import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useStyles } from "./DialogStyles";
import useAuth from "../../Hooks/useAuth";
import { deleteMessage } from "../../Api/axios";
import { useNavigate } from 'react-router-dom';

interface DialogProps {
    open: boolean; 
    handleClose: () => void; 
    removeMessage: (removeId: string) => void;
    passedId: string;
    actions?: React.ReactNode;
  }
const DeleteMessageConfirmation: React.FC<DialogProps> = ({open, handleClose, actions, removeMessage, passedId}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { auth }: { auth: any } = useAuth();
    const handleDeleteMessage = () => {
        messageDelete();
        handleClose();
      }
      const messageDelete = async () => {
        try {
          const response = await deleteMessage(auth.token, passedId);
            removeMessage(passedId);
        } catch (error: any) {
          handleError(error.response.status);
        }
      }
      const handleError = (errorCode: string) => {
        navigate(`/error/${errorCode}`);
      }
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
          <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Are you sure you want to delete the message?</DialogTitle>
          <DialogContent className={classes.inputField}>
          </DialogContent>
          {/* Actions of the dialog */}
          <DialogActions>
            {/* If custom actions are provided, use them, otherwise use default actions */}
            {actions ? actions : (
              <>
                <Button onClick={handleDeleteMessage} className={classes.styleButton}>
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
  export default DeleteMessageConfirmation;
