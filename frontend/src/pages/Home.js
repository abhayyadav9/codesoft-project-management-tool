import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Home/Nav';

const Home = () => {
  return (
    <>
      {/* Navigation bar */}
      <div className="w-full border border-gray-500 rounded-xl p-4 flex flex-row justify-between md:hidden">
        <Nav />
      </div>


      <div>
      <div>
          hello
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[98vh] gap-4">
        {/* Sidebar for desktop */}
       
        <div className="hidden md:block w-1/6 border border-gray-500 rounded-xl   flex flex-col justify-between">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="w-full md:w-5/6 border border-gray-500 rounded-xl p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
