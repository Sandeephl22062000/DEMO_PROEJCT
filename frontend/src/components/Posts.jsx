/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Face from "@mui/icons-material/Face";
import { Container } from "@mui/material";

const Post = (props) => {
  const [like, AddLike] = React.useState(false);
  const { token } = JSON.parse(localStorage.getItem("UserInfo"));
  const getLike = async () => {
    const data = await axios.post(`api/post/likepost/${props.post._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  };
  getLike();
  const addLike = async () => {
    const data = await axios.post(`/api/post/likepost/${props.post._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  };
  addLike();
  const calculateTime = Math.floor(
    (new Date() - new Date(props.post.createdAt)) / (1000 * 60 * 60 * 24)
  );
  console.log(props.post);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0 30px 0",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "80%",
          "--Card-radius": (theme) => theme.vars.radius.xs,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: "-2px",
                borderRadius: "50%",
                background:
                  "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              },
            }}
          >
            <Avatar
              size="sm"
              src={props.post.postedBy.pic}
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Typography fontWeight="lg">{props.post.postedBy.name}</Typography>
        </CardContent>
        <CardOverflow>
          <AspectRatio>
            <img src={props.post.image} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", mx: -1 }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={addLike}
            >
              <FavoriteBorder />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
            </IconButton>
          </Box>
        </CardContent>
        <CardContent>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            fontWeight="lg"
            textColor="text.primary"
          >
            8.1M Likes
          </Link>
          <Typography fontSize="sm">
            <Link
              component="button"
              color="neutral"
              fontWeight="lg"
              textColor="text.primary"
            >
              {props.post?.postedBy.name}
            </Link>{" "}
            {props.post?.caption}
          </Typography>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            startDecorator="…"
            sx={{ color: "text.tertiary" }}
          >
            more
          </Link>
          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            <Typography fontSize="sm">
              {console.log(calculateTime)}
              {calculateTime === 0 ? (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  Today
                </Typography>
              ) : (
                <Typography
                  color="neutral"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {calculateTime} days ago
                </Typography>
              )}
            </Typography>
          </Link>
        </CardContent>
        <CardOverflow sx={{ pb: "var(--Card-padding)", display: "flex" }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Face />
          </IconButton>
          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            sx={{ flexGrow: 1, mr: 1, "--Input-focusedThickness": "0px" }}
          />
          <Link disabled underline="none" role="button">
            Post
          </Link>
        </CardOverflow>
      </Card>
    </Container>
  );
};
export default Post;
