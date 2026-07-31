// import axios config
import customAxios from "../../axios/axios-config.js";

// import react hooks
import React, { useEffect, useState } from "react";

// import toast component
import { toast } from "react-toastify";

// import useParams from react-router-dom
// para redirecionamento automático dos usuários para uma página

import { useParams } from "react-router-dom";

// import CSS
import "./Memory.css";

const Memory = () => {
  const { id } = useParams();

  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // load Data

  useEffect(() => {
    const getMemory = async () => {
      try {
        const res = await customAxios.get(`/memories/${id}`);
        if (res.status === 200) {
          setMemory(res.data);
          toast.success(res.data.msg);
          setComments(res.data.comments);
        } else {
          console.log(res.data.msg);
          toast.error(res.data.msg)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.res.data.msg);
      }
    };

    getMemory();
  }, [id]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const comment = { name, text };
      const res = await customAxios.patch(`/memories/${memory._id}/comment/`, comment);
      if(res.status === 200) {
        const lastComment = res.data.memory.comments.pop();
        setComments((comment) => [...comment, lastComment]);
        setName("");
        setText("");
        toast.success(res.data.msg);
      } else {
        console.log(res.data.msg);
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  if (!memory) return <p>Carregando...</p>;

  return (
    <div className="memory-page">
      <div className="memory-image">
        <img src={`${customAxios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      </div>
      <h2>{memory.title}</h2>
      <p>{memory.description}</p>
      <div className="comment-form">
        <h3>Envie o seu comentário:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input 
              type="text" 
              placeholder="Seu nome" 
              name="name" 
              id="name" 
              onChange={(e) => setName(e.target.value)} 
              value={name}
            />
          </label>
          <label htmlFor="comment">
            <textarea 
              placeholder="Seu comentário" 
              name="comment" 
              id="comment" 
              onChange={(e) => setText(e.target.value)} 
              value={text}
            ></textarea>
            <input type="submit" value="Enviar" className="btn" />
          </label>
        </form>
      </div>
      <div className="comments-container">
        <h3>Comentários ({comments ? comments.length : 0})</h3>
        {comments.length === 0 && <p>Não há comentários...</p>}
        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <p className="comment-name">{comment.name}</p>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
