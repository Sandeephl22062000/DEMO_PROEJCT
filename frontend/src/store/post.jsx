import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
const initialPost = {
  postInfoById: [],
};

export const postByID = createAsyncThunk("/user/userDetail", async (id) => {
  const postData = await axios.get(`http://localhost:8000/post/detail/${id}`);
  console.log(postData.data);
  return postData.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: initialPost,

  extraReducers: (builder) => {
    builder
      .addCase(postByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postByID.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(postByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
