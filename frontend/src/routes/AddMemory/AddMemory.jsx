// import axios config
import customAxios from "../../axios/axios-config.js";

// import react hooks
import React, { useState } from 'react';

// import CSS
import "./AddMemory.css";

// import toast component
import { toast } from "react-toastify";

// import useNavigate from react-router-dom
// para redirecionamento automático dos usuários para uma página

import { useNavigate } from "react-router-dom";

const AddMemory = () => {

  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const response = await customAxios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 201) {
        console.log(response.data.msg);
        toast.success(response.data.msg);
        navigate("/");
      } else {
        console.log(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (event) => {
    if(event.target.name === "image") {
      setImage(event.target.files[0]);
    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <p>Título:</p>
          <input 
            type="text"
            placeholder="Defina um título"
            name="title" 
            id="title"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <p>Descrição:</p>
          <textarea
            name="description" 
            id="description"
            placeholder="Explique o que aconteceu..."
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor="image">
          <p>Foto:</p>
          <input 
            type="file"
            name="image" 
            id="image"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default AddMemory;
