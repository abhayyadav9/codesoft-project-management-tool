import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant, MdOutlinePendingActions, MdIncompleteCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const prourl = "https://project-management-tool-av.onrender.com";

const Nav = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [data1, setData1] = useState();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const data = [
    { title: "All tasks", icon: <CgNotes />, link: "/" },
    { title: "Important tasks", icon: <MdLabelImportant />, link: "/importanttask" },
    { title: "Completed tasks", icon: <MdIncompleteCircle />, link: "/completedtask" },
    { title: "Incomplete tasks", icon: <MdOutlinePendingActions />, link: "/Incompletetask" },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const headers = { id: localStorage.getItem("id") };
        const response = await axios.get(`${prourl}/api/get-all-tasks`, { headers });
        setData1(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  const Logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history("/signup");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {/* Toggle button for off-canvas menu */}
            <button
              className="text-white lg:hidden focus:outline-none"
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <span className="text-xl font-semibold">Task Management</span>
          </div>
          {/* Desktop User Info */}
          {data1 && (
            <div className="hidden lg:flex flex-col items-start">
              <h2 className="text-xl font-semibold">{data1.username}</h2>
              <h4 className="text-sm text-gray-400">{data1.email}</h4>
            </div>
          )}
        </div>
      </nav>

      {/* Off-canvas Menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${showOffcanvas ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setShowOffcanvas(false)}></div>
      
      <div className={`fixed top-0 right-0 w-64 bg-gray-800 text-white h-full p-4 transition-transform ${showOffcanvas ? "translate-x-0" : "translate-x-full"}`}>
        <button className="text-white mb-4" onClick={() => setShowOffcanvas(false)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col space-y-4">
          {/* User Info in Off-canvas Menu */}
          {data1 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold">{data1.username}</h2>
              <h4 className="text-sm text-gray-400">{data1.email}</h4>
            </div>
          )}
          {/* Navigation Links */}
          {data.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setShowOffcanvas(false)}
            >
              {item.icon} <span className="ml-2">{item.title}</span>
            </Link>
          ))}
        </div>
        {/* Log Out Button */}
        <button
          className="mt-auto bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded transition-colors duration-300"
          onClick={Logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Nav;
