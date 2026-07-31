// import axios config
import customAxios from "../../axios/axios-config.js";

// import react hooks
import React, { useState, useEffect } from 'react';

// import toast component
import { toast } from "react-toastify";

// import Link from react-router-dom
// para redirecionamento automático dos usuários para uma página

import { Link } from "react-router-dom";

// import CSS
import "./Home.css";

const Home = () => {

  const [memories, setMemories] = useState([]);

  // load Data from API
  useEffect(() => {

    const getMemories = async() => {
      try {
        const response = await customAxios.get("/memories");
        if(response.status === 200) {
        setMemories(response.data);
        console.log(response.data.msg);
        toast.success(response.data.msg);
        } else {
          console.log("Sem dados cadastrados!");
          toast.error("Sem dados cadastrados!");
        }
      } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg)
      }
    };

    getMemories();
  }, []);

  return (
    <div className="home-page">
      <h2>Confira as últimas Memórias</h2>
      <div className="memories-container">
        {memories 
        && memories.length > 0 
        && memories.map((memory) => (
          <div className="memory" key={memory._id}>
            <img src={`${customAxios.defaults.baseURL}${memory.src}`} alt={memory.title} />
            <p>{memory.title}</p>
            <Link 
              className="btn" 
              to={`/memories/${memory._id}`}
            >
              Comentar
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
