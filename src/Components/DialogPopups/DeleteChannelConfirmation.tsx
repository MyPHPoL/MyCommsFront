import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { deleteChannel } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { dialogStyles } from "./DialogStyles";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  removeChannel: (removeId: string) => void;
  passedId: string;
  actions?: React.ReactNode;
}


const DeleteChannelConfirmation: React.FC<DialogProps> = ({ open, handleClose, actions, removeChannel, passedId }) => {
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth();
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
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Are you sure you want to delete the channel?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
      </DialogContent>
      {/* Actions of the dialog */}
      <DialogActions>
        {/* If custom actions are provided, use them, otherwise use default actions */}
        {actions ? actions : (
          <>
            <Button onClick={handleDeleteChannel} sx={dialogStyles.styleButton}>
              Yes
            </Button>
            <Button onClick={handleClose} sx={dialogStyles.styleButton}>
              Cancel
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );

}
export default DeleteChannelConfirmation;
