import React from "react";
import { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ServerButton } from "./IconLib";
import { FaDoorOpen } from "react-icons/fa6";
import { IconButton } from "./IconLib";
import { IoMdAdd } from "react-icons/io";

import CustomDialog from "./DialogTemplate";

import Server, { ServerProps } from "./Server";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("Create Server");

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
            onClick={() => setDialogTypeAndOpen("Join Server")}
          >
            <IconButton icon={<FaDoorOpen size="25" />} name={"Join Server"} />
          </i>
          <i onClick={() => setDialogTypeAndOpen("Create Server")}>
            <IconButton icon={<IoMdAdd size="25" />} name={"Create Server"} />
          </i>
        </ul>
        <CustomDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          type={dialogType}
          handleAddServer={handleAddServer}
        />

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
