import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import axios from "axios";
const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const getPost = () => {
    const data = async () => {
      const response = await axios.get("http://localhost:8000/api/post/posts/all");
      console.log(response.data.posts);
      setPosts(response.data.posts);
    };
    data();
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <Container>
      <AddPost />
      {posts.map((post) => (
        <Posts post={post} />
      ))}
    </Container>
  );
};

export default ShowPost;
