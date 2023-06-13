/** @jsx jsx */
import React, { useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import Container from "../Global/Container";
import Logo from "./NavbarLogo";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Box } from "@mui/system";

// import Button from "../Global/Button/Button";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("UserInfo")
  );
  const [signup, setSignUp] = useState("");
  const UserInfo = localStorage.getItem("UserInfo");
  const navigate = useNavigate();
  const handleRegister = () => {
    setOpen(!open);
    navigate("/signup");
  };

  console.log(!!localStorage.getItem("UserInfo"));
  const handleLogin = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    setIsLoggedIn(!isLoggedIn);
  }, [UserInfo]);

  return (
    <nav css={styles}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Logo />
        <Menu openMenu={openMenu} />
        {isLoggedIn ? (
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button onClick={() => navigate("/signup")}>Register</Button>
            <Button onClick={() => navigate("/login")}>Log in</Button>
          </Box>
        )}
        <i
          onClick={() => setOpenMenu(!openMenu)}
          id="burgerMenu"
          className={
            openMenu ? "fas fa-times fa-lg" : "fas fa-align-right fa-lg"
          }
        ></i>
      </Container>
    </nav>
  );
};

const styles = css`
  width: 100%;
  height:100px
  position: absolute;
  top: 0;
  z-index: 10;
  padding: 40px 0;
  background-color: black;
  .container {
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      cursor: pointer;
    }
    #burgerMenu {
      cursor: pointer;
      display: none;
      color: #fff;
    }
  }
  @media (max-width: 1200px) {
    .container {
      max-width: 1200px;
      button {
        display: none;
      }
      #burgerMenu {
        display: block;
      }
    }
  }
`;

export default Navbar;
