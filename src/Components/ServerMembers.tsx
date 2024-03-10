import React, { useState } from "react";
import "../index.css";
import { UserAvatar } from "./IconLib";
import { UserProps } from "./User";
import useAuth from "../Hooks/useAuth";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { MdDeleteForever } from "react-icons/md";

interface ServerMembersProps {
  serverMembers: UserProps[];
  ownerId?: string;
  serverId?: string;
}
interface KickUserProps {
  open: boolean;
  handleClose: () => void;
  userName: string;
  currServerId?: string;
}
function ServerMembers({ serverMembers, ownerId, serverId }: ServerMembersProps) {
  const { auth }: { auth: any } = useAuth(); // id, username, email, password, token
  const [dialogOpen, setDialogOpen] = useState(false);
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
                  <div className="scale-75"><UserAvatar name={user.username} /></div>
                  <span className="ml-2">{user.username}</span>
                </div>
              </div>
              <div className="text-lg flex flex-col my-1 mb-2 font-semibold text-white mr-2 pl-2 py-2 px-4 justify-center">
              {(auth.id === ownerId) ? //narazie tak bd
                        <button className="px-4 py-2 ml-1 text-sm text-white rounded-lg radius-10 bg-secondary hover:bg-red-600"
                        onClick={() => handleDialogOpen}>
                          <MdDeleteForever size={25} />
                        </button> : null}
              </div>
              <KickConfirmation
                open={dialogOpen}
                handleClose={handleDialogClose}
                userName={user.username}
                currServerId={serverId} />
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
const KickConfirmation: React.FC<KickUserProps> = ({open,handleClose,userName, currServerId}) => {



  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            tu bd zapytanko czy chcesz wyrzucic usera, ale narazie nie chce mi sie otworzyc dialog :DDDDDDDD
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ServerMembers;