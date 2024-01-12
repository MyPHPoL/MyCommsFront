import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import Server from "./Server";

interface SidebarProps {
  items: any[];
}


class SidebarClassTmp extends React.Component< {Items: SidebarProps}, any> {
    state ={
        items: this.props.Items
    }
    render() {
        return (
            <div>
              <div className='fixed h-full top-20 left-0 w-31 flex flex-col bg-primary'>
                <ul className='m-4 first:my-0 last:my-0'>
                // ???? No idea what map is doing here
               
                </ul>
                <hr className='w-14 h-1 mx-auto my-4 border-0 rounded bg-gray-700'></hr>
                <ul className='m-4 first:my-0 last:my-0'>
                  <i>
                    <IconButton icon={<IoMdAdd />} name={"Join Server"} />
                  </i>
                  <i>
                    <IconButton icon={<IoMdCreate />} name={"Create Server"} />
                  </i>
                </ul>
              </div>
              <Routes>
                <Route path='/:ServerId/*' element={<Server />} />
              </Routes>
            </div>
          );
        }
    }


interface IconButtonProps {
  icon: any;
  name: string;
}

// technical buttons (join server, create server, etc.)
const IconButton = ({ icon, name }: IconButtonProps) => (
  <div className='font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-secondary group hover:bg-yellow-500 text-white hover:text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'>
    {icon}

    <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left'>
      {name}
    </span>
  </div>
);

interface ServerButtonProps {
  name: string;
  picture?: string;
}

export var colors = [
  "#d4ac0d",
  "#d35400",
  "#a9cce3",
  "#d7bde2",
  "#28b463",
  "#34495e",
  "#abebc6",
  "#eaecee",
  "#633974",
  "#ebdef0",
  "#17a589",
  "#2e86c1",
  "#FF5733",
  "#330045",
];

// buttons for servers or friends (dynamically changing background color or server picture as background)
const ServerButton = ({ name, picture }: ServerButtonProps) => (
  <div
    className='group font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'
    style={{
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    }}>
    {picture ? (
      <picture
        className='group bg-center bg-cover w-full h-full rounded-full hover:bg-center hover:bg-cover hover:w-full hover:h-full'
        style={{ backgroundImage: `url(${picture})` }}></picture>
    ) : (
      name[0].toUpperCase()
    )}

    <span className='group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-semibold transition-all duration-100 scale-0 origin-left'>
      {name}
    </span>
  </div>
);
