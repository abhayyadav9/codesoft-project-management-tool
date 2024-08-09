import React from 'react'
import {CiHeart} from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const Cards = ({home,setInput,data,setUpdateData}) => {
  const headers = {
    id: localStorage.getItem("id"),
  };
  const handleCompleteTask = async(id)=>{
    try{
      await axios.put(`http://localhost:5000/api/update-completed-task/${id}`,{},{headers});
      //{} we are not sending any data, and we are only sending headers
    }catch(err){
     console.log(err);
    }
  };

  const handleImportant = async(id)=>{
    try{
     await axios.put(`http://localhost:5000/api/update-imp-task/${id}`,{},{headers});
    }catch(err){
     console.log(err);
    }
  };

  const handleUpdate = async(id,title,desc)=> {
    setInput("fixed");
    setUpdateData({id:id, title:title, desc:desc});
  }

  const deleteTask = async(id)=>{
    try{
     const response =  await axios.delete(`http://localhost:5000/api/delete-task/${id}`,{headers});
     console.log(response.data.message);
    }catch(err){
     console.log(err);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {data &&
      data.map((items,i)=>(
        <div  className=" flex flex-col justify-between bg-gray-800 rounded p-4">
        <div>
            <h2 className="text-xl font-semibold">{items.title}</h2>
            <p className="text-gray-300 my-2">{items.desc}</p>
        </div>
        <div className="mt-4 w-full flex items-center">
         <button className={`${items.completed=== false ? "bg-red-400" : "bg-green-400"} p-2 rounded w-3/6`}
         onClick={()=>handleCompleteTask(items._id)}>{items.completed === true ? "Completed" : "Incomplete"}</button>
         <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around rounded">
            <button onClick={()=>handleImportant(items._id)}>
              {items.important === false ? <CiHeart/> : <FaHeart className="text-red-500"/>}
            </button>
            {home !== "false" && (
              <button onClick={()=> handleUpdate(items._id, items._title,items._desc)}><FaEdit /></button>
            )}
            
            <button onClick={()=> deleteTask(items._id)}><MdDelete /></button>
        </div>
        </div>
        </div>
      ))}
      {home ==="true" && (
        <button className="flex flex-col justify-between bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick={()=> setInput("fixed")}>
      <IoIosAddCircle  className="text-2xl"/>
      <h2 className="text-1xl mt-4">Add Task</h2>
      </button>
      )}
      
      </div>
  )
}

export default Cards;
