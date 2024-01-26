interface ServerButtonProps {
  name: string;
  picture?: string;
}

interface UserAvatarProps {
  name?: string;
  picture?: string;
}


interface IconButtonProps {
  icon: any;
  name: string;
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

export const ServerButton = ({ name, picture }: ServerButtonProps) => (
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

    <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max top-11 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-bottom'>
      {name}
    </span>
  </div>
);

// technical buttons (join server, create server, etc.)
export const IconButton = ({ icon, name }: IconButtonProps) => (
  <div className='font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-secondary group hover:bg-yellow-500 text-white hover:text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'>
    {icon}

    <span className='group-hover:scale-100 z-50 absolute w-auto p-2 m-2 min-w-max top-11 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left'>
      {name}
    </span>
  </div>
);

export const ChannelButton = ({ name }: { name: string }) => (
  <div className="bg-secondary hover:brightness-75 text-gray-300 font-semibold py-2 px-4 rounded-lg radius-10 w-full justify-self-center text-left">
    {name}
  </div>
);

// same as channel button but with dashed border
export const NewChannelButton = ({ text }: { text: string }) => (
  <div className="bg-secondary hover:brightness-75 text-gray-300 font-semibold py-2 px-4 border border-dashed border-gray-300 rounded-full shadow w-full justify-self-center">
    {text}
  </div>
);


export const UserAvatar = ({ name, picture }: UserAvatarProps) => (
  <div
    className='group font-semibold relative flex items-center justify-center h-12 w-12 text-primary rounded-3xl duration-300'
    style={{
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    }}>
    {picture ? (
      <picture
        className='group bg-center bg-cover w-full h-full rounded-full'
        style={{ backgroundImage: `url(${picture})` }}></picture>
    ) : (
      name ? name[0].toUpperCase() : ''
    )}
  </div>
);