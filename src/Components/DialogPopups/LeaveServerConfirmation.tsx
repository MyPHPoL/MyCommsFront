import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LeaveServer } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { dialogStyles } from "./DialogStyles";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  removeServer: (removeId: string) => void;
  passedId: string;
  actions?: React.ReactNode;
}


const LeaveServerConfirmation: React.FC<DialogProps> = ({ open, handleClose, actions, removeServer, passedId }) => {
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth();

  const serverLeave = async () => {
    try {
      await LeaveServer(auth.token, passedId);
      removeServer(passedId)
    } catch (error: any) {
      handleError(error.response.status);
    }
  }

  const handleLeaveServer = () => {
    serverLeave();
    handleClose();
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Are you sure you want to leave this server?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
      <DialogContentText sx={dialogStyles.inputField}>You will be able to join back at any time.</DialogContentText>
      </DialogContent>
      {/* Actions of the dialog */}
      <DialogActions>
        {/* If custom actions are provided, use them, otherwise use default actions */}
        {actions ? actions : (
          <>
            <Button onClick={handleLeaveServer} sx={dialogStyles.styleButton}>
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
export default LeaveServerConfirmation;
