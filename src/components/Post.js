import React from "react";
import "./Post.css";
import { API_URL } from "./Posts";

function Post(props) {
  const { id, type, name } = props;
  console.log(props);
  return (
    <>
      <div className="post">
        <small>{id}</small>
        <h2>{type}</h2>
        <h3>{name}</h3>
      </div>
    </>
  );
}

export default Post;
