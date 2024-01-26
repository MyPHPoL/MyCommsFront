import React from "react";
import { IoMdAdd } from "react-icons/io";
import { IoEnterOutline } from "react-icons/io5";
import { IconButton } from "./IconLib";


export default function TopbarBasic() {
  return (
    <div>
      <div className='h-auto w-auto flex flex-row bg-primary'>
      <ul className='first:my-0 last:my-0 flex flex-row'>
          <i className="mr-1">
            <IconButton icon={<IoEnterOutline size='30'  />} name={"Join Server"} />
          </i>
          <i>
            <IconButton icon={<IoMdAdd size='30' />} name={"Create Server"} />
          </i>
        </ul>
        </div>
    </div>
  );
}

