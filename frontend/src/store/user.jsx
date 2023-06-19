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
  async ({ email, password, addToast }) => {
    try {
      const postData = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("UserInfo", JSON.stringify(postData.data));
      console.log("postData", postData.data);
      addToast(postData.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      return postData.data;
    } catch (error) {
      // Handle error and show toast if necessary
      addToast("Login failed", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  }
);
export const UserByID = createAsyncThunk("/user/userDetail", async (id) => {
  console.log(id);
  const { data } = JSON.parse(localStorage.getItem("UserInfo"));
  console.log(data);
  const postData = await axios.get(`http://localhost:8000/api/users/${data}`);
  console.log(postData.data);
  return postData.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
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
      });
  },
});

export default userSlice.reducer;
