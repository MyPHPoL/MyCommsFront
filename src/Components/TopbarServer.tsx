import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ServerButton } from "./IconLib";
import { FaDoorOpen } from "react-icons/fa6";
import { IconButton } from "./IconLib";
import { IoMdAdd } from "react-icons/io";
import Server, { ServerProps } from "./Server";
import CreateServerDialog from "./DialogPopups/CreateServerDialog";
import JoinServerDialog from "./DialogPopups/JoinServerDialog";
import { useNavigate } from "react-router-dom";

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
  const [createOpen, setCreateOpen] = useState(false);
  const handleJoinOpen = () => {
    setJoinOpen(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/home');
  }, []);

  const handleJoinClose = () => {
    setJoinOpen(false);
  };
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  return (
    <div>
      <div className="h-auto w-auto flex flex-row bg-primary">
        <ul className="first:my-0 last:my-0 flex flex-row">
          <i
            className="mr-1"
            onClick={() => handleJoinOpen()}
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
        <ul className="m-4 first:my-0 last:my-0 flex flex-row">
          {servers?.map(({ id, name, picture }) => (
            <li className="mr-2" key={id}>
              <Link to={`/server/${id}`}>
                <ServerButton name={name ? name : 'undefined server name'} picture={picture ? "https://localhost:7031/file/" + picture : undefined} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route
          path=":ServerId/*"
          element={<Server removeServer={removeServer} />}
        />
      </Routes>
    </div>
  );
}
