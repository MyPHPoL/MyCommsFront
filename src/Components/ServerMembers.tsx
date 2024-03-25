import React, { useState } from "react";
import "../index.css";
import { UserAvatar } from "./IconLib";
import { UserProps } from "./User";
import useAuth from "../Hooks/useAuth";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { MdDeleteForever } from "react-icons/md";
import { kickUser } from "../Api/axios";
import { enqueueSnackbar } from "notistack";
import { useStyles } from './DialogStyles';
import { withStyles } from '@material-ui/core/styles';

interface ServerMembersProps {
  serverMembers: UserProps[];
  ownerId?: string;
  serverId?: string;
}
interface KickUserProps {
  open: boolean;
  handleClose: () => void;
  userId: string;
  currServerId?: string;
  userName?: string;
}
function ServerMembers({ serverMembers, ownerId, serverId }: ServerMembersProps) {
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toBeRemovedId, settoBeRemoved] = useState('');
  const [selectedUser, setSelectedUser] = useState({ id: '', username: '' });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <div className="flex flex-col items-start">
      <div className="md:flex h-auto w-[300px] -z-20 flex-col text-sm fixed inset-y-0 top-20 right-0 bg-tertiary align:right">
        <div className="flex m-2 text-white text-xl font-semibold items-center">
          All Members
        </div>
        <ul>
          {serverMembers.map((user) => ( // Fix the map function
            <li key={user.id} className="w-full flex border-[1px] shadow border-tertiary hover:bg-secondary">
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white mr-2 pl-2   py-2 px-4 w-full items-start">
                <div className="flex justify-start items-center w-full">
                  <div className="scale-75">
                    {user.avatar ? <UserAvatar name={user.username} picture={"https://localhost:7031/file/"+ user.avatar} /> : <UserAvatar name={user.username} />}
                    </div>
                  <span className="ml-2">{user.username}</span>
                </div>
              </div>
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white mr-2 pl-2 py-2 px-4 justify-center">
                {((auth.id === ownerId) && (auth.id !== user.id)) ? //narazie tak bd
                  <button className="px-4 py-2 ml-1 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-red-600"
                    onClick={() => { setSelectedUser({ id: user.id, username: user.username }); setDialogOpen(true) }}>
                    <MdDeleteForever size={25} />
                  </button> : null}
              </div>
            </li>
          ))}
        </ul>
        <KickConfirmation
          open={dialogOpen}
          handleClose={handleDialogClose}
          userId={selectedUser.id}
          userName={selectedUser.username}
          currServerId={serverId} />
      </div>

    </div>
  );
}
const KickConfirmation: React.FC<KickUserProps> = ({ open, handleClose, userId, currServerId, userName }) => {
  const { auth }: { auth: any } = useAuth();
  const classes = useStyles();
  const handleKick = async () => {
    try {
      if (currServerId) {
        const response = await kickUser(auth.token, currServerId, userId);
        console.log(response.data)
      }
    } catch (error: any) {
      enqueueSnackbar("Something went wrong", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
    handleClose();
  }
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
        <Button onClick={handleKick} className={classes.styleButton}>Yes</Button>
        <Button onClick={handleClose} className={classes.styleButton} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ServerMembers;