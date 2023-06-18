import { useFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import client from "../../features/client";
import validationSchema from "../schema/schema";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserByID, loginUser } from "../../store/user";
import { useToasts } from "react-toast-notifications";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleForgotPassword = () => {};
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().min(6).required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        loginUser({ email: values.email, password: values.password, addToast })
      );
      const user = JSON.parse(localStorage.getItem("UserInfo"));
      if (user) {
        console.log("vnsrsrdvbk");
        dispatch(UserByID(user?.data));
      }
    },
  });

  const trainerLogin = () => {
    navigate("/trainerlogin");
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          gap: "16px",
          marginTop: "40px",
          marginBottom: "50px",
          padding: "20px",
        }}
      >
        <h3 style={{ textAlign: "center", marginTop: "50px" }}>LOGIN</h3>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ margin: "20px", padding: "10px" }}
        >
          <TextField
            required
            id="outlined-required"
            name="email"
            value={formik.values.email}
            label="Email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ width: "100%", margin: "10px" }}
          />
          <TextField
            required
            id="outlined-required"
            name="password"
            value={formik.values.password}
            label="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ width: "100%", margin: "10px" }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "red",
                width: "130px",
                height: "50px",
                fontSize: "19px",
                margin: "10px",
                justifyContent: "center",
              }}
            >
              Submit
            </Button>
            <Box
              onClick={handleForgotPassword}
              sx={{
                display: { xs: "none", md: "flex" },
                cursor: "pointer",
                marginLeft: "auto", // Adjust the margin as needed
              }}
            >
              <Typography>Forgot Password?</Typography>
            </Box>
          </Box>{" "}
        </form>
      </Container>
    </>
  );
};
export default Login;
