import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const initialUser = {
  userInfo: null,
  userInfoById: null,
};

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async ({ email, password, addToast, navigate }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      const { token } = data;
      localStorage.setItem("id", data.data);
      console.log(token);
      localStorage.setItem("token", token);

      console.log("postData", data);
      addToast(data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/");
      return token;
    } catch (error) {
      console.log(error.response.data.message);
      // Handle error and show toast if necessary
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  }
);
export const UserByID = createAsyncThunk("/user/userDetail", async (id) => {
  const postData = await axios.get(`http://localhost:8000/api/users/${id}`);
  console.log(postData.data);
  return postData.data;
});

export const updateUser = createAsyncThunk(
  "/user/updateUserdetail",
  async (details) => {
    const {
      name,
      email,
      specialization,
      experiences,
      Userid,
      token,
      addToast,
    } = details;
    console.log(token);
    try {
      const postData = await axios.patch(
        `http://localhost:8000/api/users/updatedetails/${Userid}`,
        {
          name,
          email,
          specialization,
          experiences
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${details.token}`,
          },
        }
      );
      console.log(postData.data);
      addToast(postData.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      return postData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserByID.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
