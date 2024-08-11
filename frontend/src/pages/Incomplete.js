import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const prourl = "https://project-management-tool-av.onrender.com";

const Incomplete = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const headers = {
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${prourl}/api/get-incomplete-tasks`,
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetch();
  }, []); // Add dependency array to run useEffect only once

  return (
    <>
      <header className={`border fixed top-0 w-full bg-gray-900 text-green-600 z-10 shadow-md transition-all duration-300`}>
        <div className="w-full flex justify-left items-center px-4 py-2 mt-[-8px]">
          <h1 className="text-xl font-semibold mt-4 mx-8">Incomplete</h1>
        </div>
      </header>
      <div className='mt-8'>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Cards home={"false"} data={data} />
        )}
      </div>
    </>
  );
};

export default Incomplete;
