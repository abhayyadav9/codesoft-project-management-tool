import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const prourl = "https://project-management-tool-av.onrender.com";

const AllTasks = () => {
  const [input, setInput] = useState("hidden");
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const headers = {
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${prourl}/api/get-all-tasks`, {
          headers,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    } else {
      setLoading(false); // If no token or id, stop loading
    }
  }, []);

  return (
    <>
      <header
        className={`border fixed top-0 w-full bg-gray-900 text-green-600 z-10 shadow-md transition-all duration-300 ${
          input === "fixed" ? "hidden" : ""
        }`}
      >
        <div className="w-full flex justify-left items-center px-4 py-2 mt-[-8px]">
          <h1 className="text-xl font-semibold mt-4 mx-8 ">All Tasks</h1>
        </div>
      </header>
      <hr />
      <div className="w-full flex justify-end mt-10">
        <button onClick={() => setInput("fixed")}>
          <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
        </button>
      </div>
      <div className="pt-16 mt-[-50px]">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          data && (
            <Cards
              home={"true"}
              setInput={setInput}
              data={data.tasks}
              setUpdateData={setUpdateData}
            />
          )
        )}
      </div>
      <InputData
        input={input}
        setInput={setInput}
        updateData={updateData}
        setUpdateData={setUpdateData}
      />
    </>
  );
};

export default AllTasks;
