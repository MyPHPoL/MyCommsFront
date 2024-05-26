import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { dialogStyles } from "./DialogStyles";
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
const DeleteMessageConfirmation: React.FC<DialogProps> = ({ open, handleClose, actions, removeMessage, passedId }) => {
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
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title} >Are you sure you want to delete the message?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField} >
      </DialogContent>
      {/* Actions of the dialog */}
      <DialogActions>
        {/* If custom actions are provided, use them, otherwise use default actions */}
        {actions ? actions : (
          <>
            <Button onClick={handleDeleteMessage} sx={dialogStyles.styleButton}>
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
export default DeleteMessageConfirmation;
