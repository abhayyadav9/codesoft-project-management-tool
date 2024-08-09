import React, { useEffect } from 'react'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom";
import AllTasks from './pages/AllTasks';
import Important from './pages/Important';
import CompletedTasks from './pages/CompletedTasks';
import Incomplete from './pages/Incomplete';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>
    state.auth.isLoggedIn
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn === false){
    navigate("/signup");
   }
  },[])
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
    
        <Routes>
          <Route exact path='/' element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importanttask" element={<Important />}/>
          <Route path="/completedtask" element={<CompletedTasks />} />
          <Route path="/Incompletetask" element={<Incomplete />} />
          </Route>
          <Route index element = {<AllTasks/>} />
          <Route path="/importantTasks" element={<Important />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path = "/incompleteTasks" element={<Incomplete/>}/>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
     
    
       </div>
  )
}

export default App
