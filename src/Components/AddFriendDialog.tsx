/*
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
interface DialogProps {
    open: boolean; 
    handleClose: () => void; 
    passedId?: string;
  }
const AddFriendDialog: React.FC<> = ({ }) => {
    
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-title" classes={{ root: classes.title }}>
  
          {"Are you sure you want to kick " + userName + " from the server?"}
        </DialogTitle>
  
        <DialogActions>
          <Button onClick={} className={classes.styleButton}>Yes</Button>
          <Button onClick={handleClose} className={classes.styleButton} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  export default ServerMembers;*/

function AddFriendDialog(){
    return (
        <div>
            <h1>Add Friend</h1>
            <p>Are you sure you want to add this user as a friend?</p>
            <button>Yes</button>
            <button>No</button>
        </div>
    );
}

export default AddFriendDialog;//yee yee ahh code just for the project to not throw error because this file was empty