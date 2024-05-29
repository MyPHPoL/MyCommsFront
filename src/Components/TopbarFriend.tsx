import React, { useEffect } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { ServerButton } from "./IconLib";
import { useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { IconButton } from "./IconLib";
import FriendMessage, { FriendProps } from "./FriendMessage";
import FriendManager from "./Dashboard";
import AddFriendDialog from "./DialogPopups/AddFriendDialog";

interface TopbarProps {
  friends?: FriendProps[];
  //handleAddFriend: (friend: FriendProps) => void;
  //removeFriend: (id: string) => void;
}

export default function TopbarFriend({ friends }: TopbarProps) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("Add Friend");

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/home');
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const setDialogTypeAndOpen = (type: string) => {
    setDialogType(type);
    handleDialogOpen();
  };

  return (
    <div>
      <div className="h-auto w-auto flex flex-row bg-primary">
        <ul className="first:my-0 last:my-0 flex flex-row">
          <i
            className="mr-1"
            onClick={() => setDialogTypeAndOpen("Add Friend")}
          >
            <IconButton icon={<TiUserAdd size="30" />} name={"Add Friend"} />
          </i>
        </ul>
        <AddFriendDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          type={dialogType}
        //handleAddFriend={handleAddFriend} the dialog currently does not have any functionality, moved from dialog template to separate component for further development
        />
        <ul className="m-4 first:my-0 last:my-0 flex flex-row">
          {friends?.map(({ id, username, picture }) => (
            <li className="mr-2" key={id}>
              <Link to={`/friends/${id}`}>
                <ServerButton name={username} picture={picture} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route path="/:UserId" element={<FriendMessage />} />
      </Routes>
    </div>
  );
}
