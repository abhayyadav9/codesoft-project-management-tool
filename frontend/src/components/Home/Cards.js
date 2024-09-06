import React, { useCallback, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { debounce } from "lodash";

const prourl = "https://project-management-tool-av.onrender.com";

const Cards = ({ home, setInput, data, setUpdateData }) => {
  const [loading, setLoading] = useState(null); // State to track the loading state of each action
  const headers = {
    id: localStorage.getItem("id"),
  };

  const handleCompleteTask = useCallback(
    debounce(async (id) => {
      setLoading(id); // Set loading state for the task
      try {
        await axios.put(
          `${prourl}/api/update-completed-task/${id}`,
          {},
          { headers }
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(null); // Reset loading state after the request completes
      }
    }, 300),
    [headers]
  );

  const handleImportant = useCallback(
    debounce(async (id) => {
      setLoading(id); // Set loading state for the task
      try {
        await axios.put(`${prourl}/api/update-imp-task/${id}`, {}, { headers });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(null); // Reset loading state after the request completes
      }
    }, 300),
    [headers]
  );

  const handleUpdate = useCallback((id, title, desc) => {
    setInput("fixed");
    setUpdateData({ id, title, desc });
  }, [setInput, setUpdateData]);

  const deleteTask = useCallback(
    debounce(async (id) => {
      setLoading(id); // Set loading state for the task
      try {
        const response = await axios.delete(`${prourl}/api/delete-task/${id}`, {
          headers,
        });
        console.log(response.data.message);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(null); // Reset loading state after the request completes
      }
    }, 300),
    [headers]
  );

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col bg-gray-800 rounded-lg p-4 transition-transform transform hover:scale-105 duration-300 relative"
          >
            <div className="flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-white mb-2">
                {items.title}
              </h2>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {items.desc}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                className={`px-1 py-1 text-sm rounded text-white ${
                  items.completed ? "bg-green-400" : "bg-red-400"
                } transition-colors duration-300 ${
                  loading === items._id ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !loading && handleCompleteTask(items._id)}
                disabled={loading === items._id}
              >
                {loading === items._id ? "Processing..." : (items.completed ? "Completed" : "Incomplete")}
              </button>
              <div className="flex space-x-2 text-white">
                <button
                  className={`transition-transform duration-300 hover:scale-110 ${
                    loading === items._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !loading && handleImportant(items._id)}
                  disabled={loading === items._id}
                >
                  {items.important ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <CiHeart />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    className={`transition-transform duration-300 hover:scale-110 ${
                      loading === items._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => !loading && handleUpdate(items._id, items.title, items.desc)}
                    disabled={loading === items._id}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className={`transition-transform duration-300 hover:scale-110 ${
                    loading === items._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !loading && deleteTask(items._id)}
                  disabled={loading === items._id}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col items-center bg-gray-800 rounded-lg p-4 text-gray-300 hover:scale-105 transition-transform duration-300"
          onClick={() => setInput("fixed")}
        >
          <IoIosAddCircle className="text-2xl mb-2" />
          <h2 className="text-xl">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
