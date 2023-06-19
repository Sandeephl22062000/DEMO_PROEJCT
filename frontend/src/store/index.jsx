import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
// import trainer from "./trainer";
import post from "./post";
const store = configureStore({
  reducer: {
    user,
    post,
  },
});

export default store;
