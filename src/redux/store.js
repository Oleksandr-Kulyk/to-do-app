import { configureStore } from "@reduxjs/toolkit";
import tasksReduser from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReduser,
  },
});
