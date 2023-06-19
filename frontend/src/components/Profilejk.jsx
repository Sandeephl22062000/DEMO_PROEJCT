import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Container,
  Grid,
  Card,
  CardMedia,

  Button,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Post from "../components/Trainer-Info/ProfilePost";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserByID } from "../store/user";
const handleCommentButtonClick = () => {};
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const ProfilePage = () => {

  const [variant, setVariant] = React.useState(undefined);
  const dispatch = useDispatch();

  const localValues = JSON.parse(localStorage.getItem("UserInfo"));
  dispatch(UserByID(localValues.data));
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const params = useParams();
  const id = params.id;
  
  return (
    <Container
      sx={{
        minHeight: "80vh",
        marginTop: "2rem",
        width: "70rem",
      }}
    >
      <Grid container sx={{ height: "200px" }}>
        <Grid item xs={3.1}>
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
              // image=
              title="varverv"
              sx={{ height: "100%", width: "100%", borderRadius: "20%" }}
            />
          </Card>
        </Grid>
        <Grid item xs={8.7} sx={{ marginLeft: "15px" }}>
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
                <b>Email:</b> 
              </Typography>
              <Typography>
                <b>Specialization:</b>
              </Typography>
              <Typography>
                <b>Description:</b>
              </Typography>
              <Typography>
                <b>Experience:</b> years
              </Typography>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0 20px 30px",
              }}
            >
              <Button
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  "&:hover": {
                    background: "black",
                  },
                }}
              >
                Edit Profile
              </Button>
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
          ></Box>

          <Card
            sx={{
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {console.log(post.length)}
            {post.length === 0 ? (
              <Box>
                <Typography sx={{ fontSize: "35px", height: "100%" }}>
                  <div>
                    <b>No Photo posted yet</b>
                  </div>
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  justifyContent: "flex-end",
                  gap: "16px",
                  margin: "4px",
                }}
              >
                {post.map((post) => (
                  <Post post={post} />
                ))}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <Typography id="variant-modal-title" component="h2" level="inherit">
            Modal Dialog
          </Typography>
          <Typography id="variant-modal-description" textColor="inherit">
            This is a `{variant}` modal dialog.
          </Typography>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
