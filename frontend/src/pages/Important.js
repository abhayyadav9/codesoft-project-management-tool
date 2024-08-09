import React , {useState,useEffect}from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const prourl="https://project-management-tool-av.onrender.com"


const Important = () => {
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
  };
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get(
        `${prourl}/api/get-imp-tasks`,
        {headers}
      );
      setData(response.data.data);
      
    };
    fetch();
  });
  return (
    <div>
      <Cards home={"false"} data={data}/>
    </div>
  )
}

export default Important;
