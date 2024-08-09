import React , {useState,useEffect}from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const Important = () => {
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
  };
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get(
        "http://localhost:5000/api/get-imp-tasks",
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
