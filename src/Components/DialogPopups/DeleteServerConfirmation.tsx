import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteServer } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { dialogStyles } from "./DialogStyles";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  removeServer: (removeId: string) => void;
  passedId: string;
  actions?: React.ReactNode;
}


const DeleteServerConfirmation: React.FC<DialogProps> = ({ open, handleClose, actions, removeServer, passedId }) => {
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth();

  const serverDelete = async () => {
    try {
      await deleteServer(auth.token, passedId);
      removeServer(passedId)
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
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Are you sure you want to delete the server?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteServer} sx={dialogStyles.styleButton}>
          Yes
        </Button>
        <Button onClick={handleClose} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteServerConfirmation;
