import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { deleteChannel, deleteServer } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { useStyles } from "./DialogStyles";

interface DialogProps {
    open: boolean; 
    handleClose: () => void; 
    removeServer: (removeId: string) => void;
    passedId: string;
    actions?: React.ReactNode;
  }


const DeleteServerConfirmation: React.FC<DialogProps> = ({open, handleClose, actions, removeServer ,passedId}) => {
    const navigate = useNavigate();
    const { auth }: { auth: any } = useAuth();
    const classes = useStyles();

    const serverDelete = async () => {
        try {
          const response = await deleteServer(auth.token, passedId);
            removeServer(passedId )
          navigate("/home");
        } catch (error: any) {
          handleError(error.response.status);
        }
    }
    
    const handleDeleteServer = () => {
        serverDelete();
        handleClose();
    }
    
      const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  return (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }}>
  <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>Are you sure you want to delete the server?</DialogTitle>
  <DialogContent className={classes.inputField}>
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
}
  export default DeleteServerConfirmation;
