// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import "../index.css";
// import { TfiLayoutPlaceholder } from "react-icons/tfi";
// import { users, test12 } from "../fakedb";
// import { UserAvatar } from "./IconLib";
// import { IoMdArrowDropdown } from "react-icons/io";


// function ServerMembers() {
//   const { ServerId } = useParams();
//   const Server = test12.find((server) => server.id === ServerId);
//   const [showMembers, setShowMembers] = useState(false);
//   // Find the members of the server
//   // const ServerMembers = Server?.users.map(userId => users.find(user => user.id === userId)) || [];
//   return (
//     <div className="flex flex-col items-start">
//       <div className="md:flex h-auto w-[9%] -z-20 flex-col text-sm fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
//         <button className="flex m-2 text-white text-xl font-semibold items-center" onClick={() => setShowMembers(!showMembers)}>
//           PHRole <IoMdArrowDropdown size='25' />
//         </button>
//         {showMembers && (
//           <ul>
//             {ServerMembers?.map((user) => (
//               user && (
//                 <li key={user.id} className="w-full">
//                   <div className="text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-2 bg-secondary py-2 px-4 shadow w-full items-start">
//                     <div className="flex justify-start items-center w-full">
//                       <UserAvatar name={user.name} picture={user.picture} />
//                       <span className="ml-2">{user.name}</span>
//                     </div>
//                   </div>
//                 </li>
//               )
//             ))}
//           </ul>
//         )}
//       </div>
//     </div >
//   );
//     // <div>
//     //   <div className="md:flex h-auto w-[9%] -z-20 flex-col fixed inset-y-0 top-20 left-[91%] bg-tertiary align:right">
//     //     <ul>
//     //       {ServerMembers.map((user) => ( // Map over the members
//     //         user && ( // Check if the user is defined
//     //           <li key={user.id}>
//     //             <div className="justify-center  text-lg flex flex-col m-1 mb-2 font-semibold text-white mr-2 pl-2 bg-secondary py-2 px-4 shadow w-full justify-self-center">
//     //               <div className="flex flex-row">
//     //                 <TfiLayoutPlaceholder className="mx-2" size={30}></TfiLayoutPlaceholder>
//     //                 {user.name}
//     //               </div>
//     //             </div>
//     //           </li>
//     //         )
//     //       ))}
//     //     </ul>
//     //   </div>
//     // </div>
//   // );
// }


// export default ServerMembers;