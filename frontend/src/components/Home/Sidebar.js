import React, { useEffect,useState} from 'react'
import {CgNotes} from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/"
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant/>,
      link:"/importanttask"
    },
    {
      title: "Completed tasks",
      icon: <MdIncompleteCircle />,
      link:"/completedtask"

    },
    {
      title: "Incomplete tasks",
      icon: <MdOutlinePendingActions />,
      link:"/Incompletetask"

    },
  ];
  const [data1, setData1] = useState();

  const Logout = ()=>{
   dispatch(authActions.logout());
   localStorage.clear("id");
   localStorage.clear("token");
   history("/signup");
  };
  const headers = {id:localStorage.getItem("id")};
  useEffect(()=>{
   const fetch = async()=>{
   const response = await axios.get("http://localhost:5000/api/get-all-tasks", {
    headers,
    });
    setData1(response.data.data);
   };
   if(localStorage.getItem("id") && localStorage.getItem("token")){
    fetch();
    }
  })
  return (
   <>
   {data1 && (
    <div>
    <h2 className="text-xl font-semibold">{data1.username}</h2>
    <h4 className="mb-1 text-gray-400">{data1.email}</h4>
  </div>
   )}
   
    <div>
      {data.map((items,i) => (
        <Link to={items.link} key={i}className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'>
          {items.icon}&nbsp; {items.title}
        </Link>
      ))}
    </div>
    <div>
      <button className="bg-gray-600 w-full rounded" onClick={Logout}>Log Out</button>
    </div>
    </>
    
  )
} 

export default Sidebar
