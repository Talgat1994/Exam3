import React, { useEffect, useState } from "react";
import Post from "./Post";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [value, setValue] = useState("");

  const API_URL = `https://rickandmortyapi.com/api/location?page=${page}`;

  useEffect(() => {
    (async function () {
      try {
        console.log(page);
        const res = await fetch(API_URL);
        console.log(res);
        const posts = await res.json();
        setPosts(posts);
        console.log(posts.results);
        setInfo(posts.info);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    })();
  }, [page]);

  if (error) {
    return <h1>Error : {error}</h1>;
  }

  const changePageHandler = (data) => {
    setPage((prevState) => prevState + 1);
    // setCard((prevState) => prevState + 1);
  };
  const changePrevPageHandler = (data) => {
    setPage((prevState) => prevState - 1);
    // setCard((prevState) => prevState + 1);
  };

  return (
    <>
      <h1>Posts</h1>
      <input className="input1"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='search planet...'
      />
      <hr />
      <button onClick={changePrevPageHandler} disabled={page === 1}>
        prev
      </button>
      {` Стр. ${page} `}
      <button onClick={changePageHandler} disabled={7 == page}>
        next
      </button>
      <hr />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="Grade">
          {posts.results
            .filter((result) => {
              if (value === "") {
                return result;
              }
              return result.type.toLowerCase().includes(value.toLowerCase());
            })
            .map((post) => (
              <Post
                key={post.id}
                {...post}
                changePage={changePageHandler}
                page={page}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Posts;
