import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';

const prourl = "https://project-management-tool-av.onrender.com";

const inputClasses = "w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105";
const buttonClasses = "w-full bg-blue-500 text-white rounded-lg py-2 transition duration-300 ease-in-out transform hover:scale-105";
const linkClasses = "text-sm text-blue-400 hover:underline";
const messageClasses = "text-red-500 mb-4";
const loaderContainerClasses = "flex items-center justify-center mb-4";

const Loader = () => (
  <div className={loaderContainerClasses}>
    <div className="border-t-4 border-blue-500 border-solid border-gray-200 rounded-full w-8 h-8 animate-spin">
      
    </div>
  </div>
);

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    navigate("/");
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      setLoading(true); // Show loader
      if (data.username === "" || data.password === "") {
        setMessage("All fields are mandatory");
        setLoading(false); // Hide loader
      } else {
        const response = await axios.post(`${prourl}/api/login`, data);
        setData({ username: "", password: "" });
        setMessage("");
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-sm w-full animate-fade-in">
        {loading && <Loader />}
        <h2 className="text-2xl font-bold text-white mb-4">Welcome Back!</h2>
        {message && <div className={messageClasses}>{message}</div>}
        <input
          type="text"
          placeholder="Username"
          className={inputClasses}
          name="username"
          value={data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className={inputClasses}
          name="password"
          value={data.password}
          onChange={change}
        />
        <button className={buttonClasses} onClick={submit}>Login</button>
        <div className="flex items-center justify-between mt-4">
          <Link to="/signup" className={linkClasses}>Not Having Account? Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
