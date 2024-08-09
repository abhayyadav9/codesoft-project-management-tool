import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
const InputData = ({input,setInput,updateData,setUpdateData}) => {
  const [data, setData] = useState({title: "", desc: ""});

  useEffect(()=>{
    setData({title: updateData.title, desc: updateData.desc});
  }, [updateData]);
  const headers = {
    id: localStorage.getItem("id"),
  };
  const change =(e) =>{
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }
  const submit = async()=>{
    if(data.title === "" || data.desc === ""){
      alert("All fields are required");
    }else{
      await axios.post("http://localhost:5000/api/create-task" , data,{headers});
      setData({title: "", desc: ""});
      setInput("hidden")
    }
  };

  const updateTask = async(id)=>{
    if(data.title === "" || data.desc===""){
      alert("All fields are required");
    }else{
      await axios.put(`http://localhost:5000/api/update-task/${updateData._id}`, data,{headers});
      setUpdateData({
        id: "",
        title: "",
        desc: "",
      });
      setData({title: "", desc:""});
      setInput("hidden");
    }
  }
  return (
   <>
   <div className={`${input} top-0 left-0 bg-gray-500 opacity-95 h-screen w-full`}>
    <div className={`${input} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-3/6 bg-gray-900 p-4 rounded">
        <div className="flex justify-end">
        <button className="text-xl"
        onClick={()=>{
          setInput("hidden");
          setData({title:"", desc:""})
          setUpdateData({id:"",title:"", desc:""})
        }}>
          <RxCross1 />
    </button>
        </div>
        <input type="text" placeholder="Title" name="title" className="px-3 py-2 rounded w-full bg-gray-700 my-3" value={data.title}
        onChange={change}/>
        <textarea name="desc" cols="30" rows="10" placeholder="Description..." className="px-3 py-2 rounded w-full bg-gray-700 my-3"
        value={data.desc}
        onChange={change}></textarea>
        <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={submit}>Submit</button>
        </div>
    </div> 
   </div>
   
   </>
  )
}

export default InputData
