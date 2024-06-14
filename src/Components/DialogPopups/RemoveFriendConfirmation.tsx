import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeFriend } from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import { dialogStyles } from "./DialogStyles";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  deleteFriend: (removeId: string) => void;
  passedId: string;
}


const RemoveFriendConfirmation: React.FC<DialogProps> = ({ open, handleClose, deleteFriend, passedId }) => {
  const navigate = useNavigate();
  const { auth }: { auth: any } = useAuth();

  const friendDelete = async () => {
    try {
      await removeFriend(auth.token, passedId);
      deleteFriend(passedId)
      navigate("/home");
    } catch (error: any) {
      handleError(error.response.status);
    }
  }

  const handleRemoveFriend = () => {
    friendDelete();
    handleClose();
  }

  const handleError = (errorCode: string) => {
    navigate(`/error/${errorCode}`);
  }
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" sx={dialogStyles.dialogPaper}>
      <DialogTitle id="form-dialog-title" sx={dialogStyles.title}>Are you sure you want to unfriend this user?</DialogTitle>
      <DialogContent sx={dialogStyles.inputField}>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRemoveFriend} sx={dialogStyles.styleButton}>
          Yes
        </Button>
        <Button onClick={handleClose} sx={dialogStyles.styleButton}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default RemoveFriendConfirmation;
