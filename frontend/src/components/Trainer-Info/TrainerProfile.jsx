import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Post from "./Post";
import axios from "axios";
const handleCommentButtonClick = () => {};
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {
  const [trainer, setTrainer] = useState("");
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const trainerDetail = async () => {
      const { data } = await axios.get(`/api/trainer/trainerDetail/${id}`);
      console.log(data.data);
      setTrainer(data.data);
    };
    trainerDetail();
  }, []);
  return (
    <Container
      sx={{
        minHeight: "100rem",
        marginTop: "2rem",
        width: "70rem",
      }}
    >
      <Grid container sx={{ height: "200px" }}>
        <Grid item xs={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20%",
            }}
          >
            <CardMedia
              image={trainer.photo}
              title="varverv"
              sx={{ height: "100%", width: "100%", borderRadius: "20%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2%",
            }}
          >
            <div style={{ margin: "20px 0 0 30px" }}>
              <Typography>
                <b>Name: </b>
                {trainer.name}
              </Typography>
              <Typography>
                <b>Email:</b> {trainer.email}
              </Typography>
              <Typography>
                <b>Specialization:</b> {trainer.specialization}
              </Typography>
              <Typography>
                <b>Description:</b>
              </Typography>
              <Typography>
                <b>Experience:</b> {trainer.experience} years
              </Typography>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <Box sx={{ marginLeft: "30px" }}>
                {" "}
                <Button>Send Request</Button>
                <Button>Message</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              color: "black",
            }}
          >
            <Button>View Post</Button>
            <Button>Clients Experience</Button>
          </Box>

          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyContent: "flex-end",
                gap: "16px",
                margin: "4px",
              }}
            >
              <Post />
              <Post />
              <Post />
              <Post />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
