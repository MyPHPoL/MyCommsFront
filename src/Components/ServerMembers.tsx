import React, { useEffect, useState } from "react";
import "../index.css";
import { UserAvatar } from "./IconLib";
import { UserProps } from "./User";
import useAuth from "../Hooks/useAuth";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { getFriends, getOutgoingInvites, kickUser } from "../Api/axios";
import { enqueueSnackbar } from "notistack";
import { dialogStyles } from './DialogPopups/DialogStyles';
import { FriendProps } from "./FriendMessage";
import { TiUserAdd } from "react-icons/ti";
import AddFriendFromListDialog from "./DialogPopups/AddFriendFromListDialog";
import { InviteProps } from "./Dashboard";

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
  const [selectedUser, setSelectedUser] = useState({ id: '', username: '' });
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [openAddFriendConfirmation, setOpenAddFriendConfirmation] = useState(false);
  const [outInvites, setOutInvites] = useState<InviteProps[]>([]);
  const [invitedIds, setInvitedIds] = useState<string[]>([]);
  
  useEffect(() => {
    let isMounted = true; // not to render when component is unmounted
      const controller = new AbortController(); // cancels request when component unmounts
      isMounted && fetchFriends();
      isMounted && setFriendIds(friendList.map((friend) => friend.id));
      isMounted && fetchOutInvites();
      isMounted && setInvitedIds(outInvites.map((invite) => invite.id));
      return () => {
        isMounted = false;
        controller.abort();
      };
  }, [serverMembers]);

  useEffect(() => {
  setInvitedIds(outInvites.map((invite) => invite.id));
  }, [outInvites]);

  useEffect(() => {
    setFriendIds(friendList.map((friend) => friend.id));
  }, [friendList]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddFriendConfrimationClose = () => {
    setOpenAddFriendConfirmation(false);
  }

  const fetchFriends = async () => {
    try {
      const response = await getFriends(auth.token);
      setFriendList(response.data);
    } catch (error: any) {
      enqueueSnackbar("We couldn't load your friend list. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  };

  const fetchOutInvites = async () => {
    try {
      const response = await getOutgoingInvites(auth.token);
      if (response.data) {
        const invites = response.data.map((invite: any) => invite.invitee);

        setOutInvites(invites);
      }
    } catch (error: any) {

      enqueueSnackbar("We couldn't load your outgoing invites. Please try again later", { variant: 'error', preventDuplicate: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="md:flex h-auto w-[300px] -z-20 flex-col text-sm fixed inset-y-0 top-20 right-0 bg-tertiary align:right">
        <div className="flex m-2 text-white text-xl font-semibold items-center">
          All Members
        </div>
        <ul>
          {serverMembers.map((user) => (
            <li key={user.id} className="w-full flex border-[1px] shadow border-tertiary hover:bg-secondary">
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white mr-2 pl-2   py-2 px-4 w-full items-start">
                <div className="flex justify-start items-center w-full">
                  <div className="scale-75">
                    {user.avatar ? <UserAvatar name={user.username} picture={"https://localhost:7031/file/" + user.avatar} /> : <UserAvatar name={user.username} />}
                  </div>
                  <span className="ml-2">{user.username}</span>
                </div>
              </div>
              {((!friendIds.includes(user.id)) && (auth.id !== user.id) && (!invitedIds.includes(user.id))) ?
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white pl-2 py-2 justify-center">
                  <button className="px-4 py-2 ml-1 mr-1 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-green-600"
                    onClick={() => { setSelectedUser({ id: user.id, username: user.username }); setOpenAddFriendConfirmation(true)}}>
                    <TiUserAdd size={25} />
                  </button>
              </div> : null}
              {((auth.id === ownerId) && (auth.id !== user.id)) ?
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white pl-2 py-2 px-4 justify-center">
                  <button className="px-4 py-2 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-red-600"
                    onClick={() => { setSelectedUser({ id: user.id, username: user.username }); setDialogOpen(true) }}>
                    <MdDeleteForever size={25} />
                  </button> 
              </div>: null}
            </li>
          ))}
        </ul>
        <KickConfirmation
          open={dialogOpen}
          handleClose={handleDialogClose}
          userId={selectedUser.id}
          userName={selectedUser.username}
          currServerId={serverId} />
        <AddFriendFromListDialog 
          open={openAddFriendConfirmation} 
          username={selectedUser.username} 
          handleClose={handleAddFriendConfrimationClose} />
      </div>

    </div>
  );
}

const KickConfirmation: React.FC<KickUserProps> = ({ open, handleClose, userId, currServerId, userName }) => {
  const { auth }: { auth: any } = useAuth();

  const handleKick = async () => {
    try {
      if (currServerId) {
        const response = await kickUser(auth.token, currServerId, userId);
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
      sx={dialogStyles.dialogPaper}
    >
      <DialogTitle id="alert-dialog-title" sx={dialogStyles.title}>
        {"Are you sure you want to kick " + userName + " from the server?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleKick} sx={dialogStyles.styleButton}>Yes</Button>
        <Button onClick={handleClose} sx={dialogStyles.styleButton} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ServerMembers;