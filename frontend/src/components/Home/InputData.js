import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';
import Loader from '../../store/Loader'; // Import the loader component

const prourl = "https://project-management-tool-av.onrender.com";

const InputData = ({ input, setInput, updateData, setUpdateData }) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false); // Add loading state
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (updateData) {
      setData({ title: updateData.title, desc: updateData.desc });
    }
  }, [updateData]);

  const headers = {
    id: localStorage.getItem("id"),
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateFields = () => {
    if (data.title.trim() === "" || data.desc.trim() === "") {
      setMessage("All fields are required");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true); // Show loader
      setMessage(""); // Reset message
      await axios.post(`${prourl}/api/create-task`, data, { headers });
      setData({ title: "", desc: "" });
      setInput("hidden");
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const updateTask = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true); // Show loader
      setMessage(""); // Reset message
      await axios.put(`${prourl}/api/update-task/${updateData._id}`, data, { headers });
      setUpdateData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInput("hidden");
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className={`${input} fixed top-0 left-0 bg-gray-500 opacity-90 h-screen w-full flex items-center justify-center`}>
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-white transition-colors"
          onClick={() => {
            setInput("hidden");
            setData({ title: "", desc: "" });
            setUpdateData({ id: "", title: "", desc: "" });
          }}
        >
          <RxCross1 />
        </button>
        {loading && <Loader />}
        {message && <div className="text-red-500 mb-4">{message}</div>}
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
          value={data.title}
          onChange={change}
        />
        <textarea
          name="desc"
          cols="30"
          rows="10"
          placeholder="Description..."
          className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
          value={data.desc}
          onChange={change}
        ></textarea>
        <button
          className="w-full px-4 py-2 bg-blue-500 rounded text-white text-xl font-semibold hover:bg-blue-600 transition-colors"
          onClick={updateData.id ? updateTask : submit}
        >
          {updateData.id ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default InputData;
