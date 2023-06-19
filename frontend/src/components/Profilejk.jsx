import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
  Box,
  Table,
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
  const [variant, setVariant] = useState(undefined);
  const [posts, setPost] = useState([]);
  const [show, setShowPost] = useState([]);
  const dispatch = useDispatch();

  const Userid = localStorage.getItem("id");

  const user = useSelector((state) => state.user.user);
  console.log("user", user?.data?.name);
  console.log(user?.data?.posts);
  const token = useSelector((state) => state.user.token);

  const getPostByID = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/post/post/detail/${postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const post = response.data;
      console.log(post);
      setShowPost((prevShow) => [...prevShow, post]);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  useEffect(() => {
    dispatch(UserByID(Userid));
    posts.map((post) => getPostByID(post));
  }, []);

  useEffect(() => {
    if (user) {
      setPost(user.data.posts);
    }
  }, [user]);
  return (
    <Container
      sx={{
        minHeight: "100vh",
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
              minheight: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2%",
            }}
          >
            <div style={{ margin: "20px 0 0 30px" }}>
              <Typography>
                <b>Name: {user?.data?.name}</b>
                {/* {trainer.name} */}
              </Typography>
              <Typography>
                <b>Email: {user?.data?.email}</b>
              </Typography>
              <Typography>
                <b>Posts:</b> {user?.data?.posts.length}
              </Typography>
              {user?.data?.role === 1 && (
                <>
                  <Typography>
                    <b>Specialization: {user?.data?.specialization}</b>
                  </Typography>
                  <Typography>
                    <b>Experience:{user?.data?.experiences}</b> years
                  </Typography>
                </>
              )}
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0 20px 30px",
              }}
            >
              <Button
                onClick={() => {
                  setVariant("solid");
                }}
                sx={{
                  background: "black",
                  color: "white",
                  height: "50px",
                  borderRadius: "15px",
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

          {console.log(posts?.length)}
          {posts.length === 0 ? (
            <Card
              sx={{
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "35px", height: "100%" }}>
                  <div>
                    <b>No Photo posted yet</b>
                  </div>
                </Typography>
              </Box>
            </Card>
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
              {console.log("fwrefrtvwrtvg", posts)}
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>

      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog
          aria-labelledby="variant-modal-title"
          aria-describedby="variant-modal-description"
          variant={variant}
        >
          <ModalClose />
          <Table aria-label="basic table">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{user?.data?.name}</td>
                <td>
                  <Button sx={{ color: "white" }}>Edit</Button>
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user?.data?.name}</td>
                <td>
                  <Button sx={{ color: "white" }}>Edit</Button>
                </td>
              </tr>
              <tr>
                <td>Experience:</td>
                <td>{user?.data?.experiences}</td>
                <td>
                  <Button sx={{ color: "white" }}>Edit</Button>
                </td>
              </tr>
              <tr>
                <td>Specialization:</td>
                <td>{user?.data?.specialization}</td>
                <td>
                  <Button sx={{ color: "white" }}>Edit</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalDialog>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
