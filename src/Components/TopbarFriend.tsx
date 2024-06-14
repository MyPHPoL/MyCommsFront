import React, { useEffect } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import { ServerButton } from "./IconLib";
import { useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { IconButton } from "./IconLib";
import FriendMessage, { FriendProps } from "./FriendMessage";
import AddFriendDialog from "./DialogPopups/AddFriendDialog";

interface TopbarProps {
  friends?: FriendProps[];
}

export default function TopbarFriend({ friends }: TopbarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
  return (
    <div>
      <div className="h-auto w-auto flex flex-row bg-primary">
        <ul className="first:my-0 last:my-0 flex flex-row">
          <i
            className="mr-1"
            onClick={() => handleDialogOpen()}
          >
            <IconButton icon={<TiUserAdd size="30" />} name={"Add Friend"} />
          </i>
        </ul>
        <AddFriendDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
        />
        <ul className="m-4 first:my-0 last:my-0 flex flex-row">
          {friends?.map(({ id, username, avatar }) => (
            <li className="mr-2" key={id}>
              <Link to={`/friends/${id}`}>
                <ServerButton
                    name={username}
                    picture={
                      avatar
                        ? "https://localhost:7031/file/" + avatar
                        : undefined
                    }
                  />
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
