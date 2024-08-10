import React,{useState, useEffect} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';


const prourl="https://project-management-tool-av.onrender.com"


const CompletedTasks = () => {
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
  };
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get(
        `${prourl}/api/get-complete-tasks`,
        {headers}
      );
      setData(response.data.data);
      
    };
    fetch();
  });
  return (
    <>
     <header className={`fixed top-0 w-full bg-gray-900 text-green-600 z-8  shadow-md transition-all duration-300 `}>
        <div className="w-full flex justify-left items-center mx-10 px-4 py-2 mt-[-8px]">
          <h1 className="text-xl font-semibold mt-4 mx-10">Completed Tasks</h1>
        </div>
      </header>
    <div className='mt-8'>
      <Cards home={"false"} data={data}/>
    </div>
    </>
  )
}

export default CompletedTasks
