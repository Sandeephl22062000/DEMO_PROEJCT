import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Posts from "./Posts";
import axios from "axios";
const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const addPost = () => {
    const data = async () => {
      const response = await axios.get("api/post/posts/all");
      console.log(response.data.posts);
      setPosts(response.data.posts);
    };
    data();
  };
  useEffect(() => {
    addPost();
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
