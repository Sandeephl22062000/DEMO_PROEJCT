import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import food from "./food";

const store = configureStore({
  reducer: {
    user,
    post,
    food,
  },
});

export default store;
