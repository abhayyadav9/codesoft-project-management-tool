import React,{useEffect, useState}from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';


const prourl="https://project-management-tool-av.onrender.com"


const AllTasks = () => {
    const [input, setInput] = useState("hidden");
    const [data, setData] = useState();
    const [updateData, setUpdateData] = useState({
      id: "",
      title: "",
      desc: "",
    });
    const headers = {
      id: localStorage.getItem("id"),
    };
    useEffect(()=>{
      const fetch = async()=>{
        const response = await axios.get(
          `${prourl}/api/get-all-tasks`,
          {headers}
        );
        setData(response.data.data);
        
      };
      if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
      }
    });
  return (
    <>
    <div>
        <div className="w-full flex justify-end px-4">
            <button onClick={()=> setInput("fixed")}><IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" /></button> 
        </div>
     {data && <Cards home={"true"} setInput={setInput} data={data.tasks} setUpdateData={setUpdateData}/>}
    </div>
    <InputData input={input} setInput={setInput} updateData={updateData} setUpdateData={setUpdateData}/>
   </>
  )
}

export default AllTasks
