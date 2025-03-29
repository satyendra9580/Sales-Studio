// // Sidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = () => {
//   const activeClass = 'bg-gray-200 font-semibold';
//   return (
//     <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-xl font-bold text-blue-600">QR VenueVault</h1>
//       </div>
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           <li>
//             <NavLink 
//               to="/dashboard" 
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/users" 
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
//               }
//             >
//               Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink 
//               to="/venues" 
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
//               }
//             >
//               Venues
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const activeClass = 'bg-gray-200 font-semibold';
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">QR VenueVault</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/users" 
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/venues" 
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-100 ${isActive ? activeClass : ''}`
              }
            >
              Venues
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
