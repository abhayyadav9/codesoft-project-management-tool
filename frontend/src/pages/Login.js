import React, { useState } from 'react'
import axios from "axios";
import { useDispatch,useSelector} from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom'
import { authActions } from '../store/auth';

const Login = () => {
  const [data,setData] = useState({username: "", password: ""});
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/");
  }
  const dispatch = useDispatch();
  const change = (e) => {
    const {name,value} = e.target;
    setData({...data,[name]:value});
  };

  const submit = async()=>{
    try{
    if(data.username === "" || data.password === ""){
      alert("all fields are mandatory");
    }else{
     const response = await axios.post("http://localhost:5000/api/login", data);
     setData({username:"", password:""});
      console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      history("/");
    }
  }catch(err){
    console.log(err.response.data.message);
  }
}
  return (
    <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
      <div className="text-2xl font-semibold">Login</div>
      <input type="username" placeholder="Username" className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      name="username"
      value = {data.username}
      required  onChange={change}/>

      <input type="password" placeholder="password" className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
      name="password"
      value={data.password}
      onChange={change}/>


      <div className="w-full flex items-center justify-between">
      <button className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded" onClick={submit}>Login</button>
      <Link to="/signup" className="text-gray-400" >Not Having Account? Sign up here</Link>
      </div>
    </div>
    </div>
  )
}

export default Login
