import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import {useSelector} from "react-redux";
const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/")
  }
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""});
    
    const change = (e) => {
    const {name,value} = e.target;
    setData({...data, [name]: value});
    };

    const submit = async()=>{
      try{
      if(data.username === "" || data.email === "" || data.password === ""){
        alert("all fields are mandatory");
      }else{
       const response = await axios.post("http://localhost:5000/api/signup", data);
       setData({username:"", email:"", password:""});
        alert(response.data.message);
        history("/login");
      }
    }catch(err){
      console.log(err.response.data.message);
    }
  }
  return (
    <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
      <div className="text-2xl font-semibold">SignUp</div>
      <input type="username" placeholder="Username" className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      name="username"
      value={data.username}
      onChange={change}
      />

      <input type="email" placeholder="email" className="bg-gray-700 px-3 py-2 my-3 w-full rounded" 
      name="email"
      value = {data.email}
      onChange={change}
      />


      <input type="password" placeholder="password" className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      name="password"  
      value ={data.password}
      onChange={change} />

      <div className="w-full flex items-center justify-between">
      <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded" onClick={submit}>SignUp</button>
      <Link to="/login" className="text-gray-400" >Already a user? Login here..</Link>
      </div>
    </div>
    </div>
  )
}

export default Signup
