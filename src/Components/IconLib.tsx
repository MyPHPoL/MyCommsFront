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
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
  "#e6b0aa",
  "#f7dc6f",
  "#f8c471",
  "#f0b27a",
  "#85c1e9",
  "#5dade2",
  "#aed6f1",
  "#a569bd",
  "#f1948a",
  "#bb8fce",
];

export const letterToColor: { [key: string]: string } = {
  a: "#581845",
  b: "#e6b0aa",
  c: "#f7dc6f",
  d: "#f8c471",
  e: "#f0b27a",
  f: "#85c1e9",
  g: "#5dade2",
  h: "#aed6f1",
  i: "#a569bd",
  j: "#f1948a",
  k: "#bb8fce",
  l: "#d4ac0d",
  m: "#d35400",
  n: "#a9cce3",
  o: "#d7bde2",
  p: "#28b463",
  q: "#34495e",
  r: "#abebc6",
  s: "#eaecee",
  t: "#633974",
  u: "#ebdef0",
  v: "#17a589",
  w: "#2e86c1",
  x: "#FF5733",
  y: "#330045",
  z: "#FFC300",
};

export const ServerButton = ({ name, picture }: ServerButtonProps) => (
  <div
    className='group font-semibold relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto text-primary hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer'
    style={{
      backgroundColor: letterToColor[name[0].toLowerCase()],
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
export const UserAvatar = ({ name, picture }: UserAvatarProps) => {
  const defaultColor = "#039be5";

  let backgroundColor = defaultColor;
  if (name) {
    const firstLetter = name[0].toLowerCase();
    backgroundColor = letterToColor[firstLetter] || defaultColor;
  }

  return (
    <div
      className='group font-semibold relative flex items-center justify-center h-12 w-12 text-primary rounded-3xl duration-300'
      style={{ backgroundColor }}>
      {picture ? (
        <picture
          className='group bg-center bg-cover w-full h-full rounded-full'
          style={{ backgroundImage: `url(${picture})` }}></picture>
      ) : (
        name ? name[0].toUpperCase() : ''
      )}
    </div>
  );
};