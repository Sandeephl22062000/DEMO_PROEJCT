import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../features/client";
import axios from "axios";
const initialFood = {
  calculateFoodCalories: 0,
};

export const calculateCalories = createAsyncThunk(
  "/food/foodDetail",
  async (data) => {
    console.log(data);
    const { weight, height, age, gender, activity, token, addToast } = data;
    console.log(weight, height, age, gender, activity);
    const sendData = await axios.post(
      "http://localhost:8000/api/users/caloriecalculator/savedetail",
      {
        weight,
        height,
        age,
        gender,
        activity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sendData", sendData);
    addToast(sendData.data.message, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    return sendData.data.data;
  }
);

export const calculateCalories = createAsyncThunk(
    "/food/foodDetail",
    async (data) => {
      console.log(data);
      const { weight, height, age, gender, activity, token, addToast } = data;
      console.log(weight, height, age, gender, activity);
      const sendData = await axios.post(
        "http://localhost:8000/api/users/caloriecalculator/savedetail",
        {
          weight,
          height,
          age,
          gender,
          activity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sendData", sendData);
      addToast(sendData.data.message, {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      return sendData.data.data;
    }
  );

const foodSlice = createSlice({
  name: "food",
  initialState: initialFood,

  extraReducers: (builder) => {
    builder
      .addCase(calculateCalories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateCalories.fulfilled, (state, action) => {
        state.loading = false;
        console.log("");
        state.calculateFoodCalories = action.payload;
      })
      .addCase(calculateCalories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default foodSlice.reducer;
