import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IconButton } from "./IconLib";
import CustomDialog from "./DialogTemplate";
import { ServerProps } from "./Server";
import { GiExitDoor } from "react-icons/gi";
interface TopBarProps {
  handleAddServer: (server: ServerProps) => void;

}
export default function TopbarBasic ({ handleAddServer }: TopBarProps) {
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
  }

  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
      <ul className='first:my-0 last:my-0 flex flex-row'>
          <i className="mr-1" onClick={() => setDialogTypeAndOpen("Join Server")}>
            <IconButton icon={<GiExitDoor size='25' />} name={"Join Server"} />
          </i>
          <i  onClick={() => setDialogTypeAndOpen("Create Server")}>
            <IconButton icon={<IoMdAdd size='25' />} name={"Create Server"} />
          </i>
        </ul>
        </div>
        <CustomDialog open={dialogOpen} handleClose={handleDialogClose} type={dialogType} handleAddServer={handleAddServer} />
    </div>
    
  );
}

