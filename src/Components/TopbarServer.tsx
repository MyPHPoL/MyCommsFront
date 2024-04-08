import React from "react";
import { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ServerButton } from "./IconLib";
import { FaDoorOpen } from "react-icons/fa6";
import { IconButton } from "./IconLib";
import { IoMdAdd } from "react-icons/io";
import Server, { ServerProps } from "./Server";
import CreateServerDialog from "./DialogPopups/CreateServerDialog";
import JoinServerDialog from "./DialogPopups/JoinServerDialog";

interface TopbarProps {
  servers?: ServerProps[];
  removeServer: (id: string) => void;
  handleAddServer: (server: ServerProps) => void;
}

export default function TopbarServer({
  servers,
  removeServer,
  handleAddServer,
}: TopbarProps) {
  const [joinOpen, setJoinOpen] = useState(false);
  const [dialogType, setDialogType] = useState("Create Server");
  const [createOpen, setCreateOpen] = useState(false);
  const handleDialogOpen = () => {
    setJoinOpen(true);
  };

  const handleJoinClose = () => {
    setJoinOpen(false);
  };
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
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
            onClick={() => setDialogTypeAndOpen("Join Server")}
          >
            <IconButton icon={<FaDoorOpen size="25" />} name={"Join Server"} />
          </i>
          <i onClick={() => handleCreateOpen()}>
            <IconButton icon={<IoMdAdd size="25" />} name={"Create Server"} />
          </i>
        </ul>
        <CreateServerDialog
        open={createOpen}
        handleClose={handleCreateClose}
        handleAddServer={handleAddServer}
        />
        <JoinServerDialog
        open={joinOpen}
        handleClose={handleJoinClose}
        handleJoinServer={handleAddServer}
        />
        {/*tu dodac nowy dialog na join */}
        <ul className="m-4 first:my-0 last:my-0 flex flex-row">
          {servers?.map(({ id, name, picture }) => (
            <li className="mr-2" key={id}>
              <Link to={"/home/" + id}>
                <ServerButton name={name} picture={picture} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route
          path="/:ServerId/*"
          element={<Server removeServer={removeServer} />}
        />
      </Routes>
    </div>
  );
}
