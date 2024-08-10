import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant, MdOutlinePendingActions, MdIncompleteCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const prourl = "https://project-management-tool-av.onrender.com";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    { title: "All tasks", icon: <CgNotes />, link: "/" },
    { title: "Important tasks", icon: <MdLabelImportant />, link: "/importanttask" },
    { title: "Completed tasks", icon: <MdIncompleteCircle />, link: "/completedtask" },
    { title: "Incomplete tasks", icon: <MdOutlinePendingActions />, link: "/Incompletetask" },
  ];
  
  const [data1, setData1] = useState();

  const Logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history("/signup");
  };

  const headers = { id: localStorage.getItem("id") };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${prourl}/api/get-all-tasks`, { headers });
      setData1(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, [headers]);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {data1 && (
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-semibold truncate w-full">{data1.username}</h2>
          <h4 className="text-sm mb-1 text-gray-400 truncate w-full">{data1.email}</h4>
        </div>
      )}
      <hr />
      <div className="flex flex-col space-y-2">
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="flex font-semibold items-center p-1 mt-12 rounded hover:bg-gray-100 transition-colors duration-300"
          >
            {items.icon} <span className="ml-2 text-sm">{items.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-600 mt-60 text-white w-full py-2 rounded hover:bg-red-500 transition-colors duration-300"
          onClick={Logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
