import React, { useEffect, useState } from "react";
import { Avatar, Container, Typography, IconButton, Box } from "@mui/material";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [trainerInfo, setTrainerInfo] = useState({});
  const params = useParams();
  console.log(params);

  const fetchTrainer = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/trainer/trainerDetail/${params.id}`
    );
    setTrainerInfo(data.data);
  };
  useEffect(() => {
    fetchTrainer();
  }, []);
  return (
    <Box sx={{ padding: "10rem" }}>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          padding: "10rem",
          backgroundColor: "#CBCBCB",
        }}
      >
        <Avatar
          // alt="Profile Photo"
          // src="/path/to/profile-photo.jpg"
          sx={{ width: 200, height: 200, margin: "0 auto" }}
        />
        <Typography variant="h5" component="h1" sx={{ marginTop: "1rem" }}>
          {trainerInfo.name}
        </Typography>
        <Typography variant="subtitle1">{trainerInfo.email}</Typography>

        <div sx={{ marginTop: "2rem" }}>
          <IconButton color="primary" aria-label="Likes">
            <ThumbUp />
          </IconButton>
          <IconButton color="secondary" aria-label="Dislikes">
            <ThumbDown />
          </IconButton>
          <IconButton aria-label="Comments">
            <Comment />
          </IconButton>
        </div>
      </Container>
    </Box>
  );
};

export default ProfilePage;
