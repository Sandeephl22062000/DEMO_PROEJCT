import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import trainer from "./trainer";
const store = configureStore({
  reducer: {
    user,
    trainer,
  },
});

export default store;
