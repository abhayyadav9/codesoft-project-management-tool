// import React from "react";
// import Sidebar from "../components/Home/Sidebar";
// import { Outlet } from "react-router-dom";
// import Nav from "../components/Home/Nav";

// const Home = () => {
//   return (
//     <div className="bg-gray-900 min-h-screen">
//       {/* Navigation bar */}
//       <div className="w-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between md:hidden">
//         <Nav />
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 min-h-screen">
//         {/* Sidebar for desktop */}
//         <div className="hidden 
//          position -fixed
//         md:block w-1/6 border border-gray-900 rounded-xl flex flex-col">
//           <Sidebar />
//         </div>

//         {/* Main content area */}
//         <div className="flex-1 border border-gray-500 rounded-sm p-4 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";
import Nav from "../components/Home/Nav";

const Home = () => {
  return (
    <div className="bg-gray-900  top-0 mt-[-8px] min-h-screen mr-3">
      {/* Navigation bar */}
      <div className="w-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between md:hidden">
        <Nav />
      </div>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar for desktop */}
        <div className="hidden md:block fixed top-0 left-0 w-1/6 h-screen border border-gray-900 rounded-xl flex flex-col z-10">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 md:ml-[16.67%] border border-gray-500 rounded-sm  mt-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
