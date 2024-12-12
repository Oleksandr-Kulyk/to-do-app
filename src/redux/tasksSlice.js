import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTask,
  deleteTask,
  completeTask,
  editTask,
  getTaskLists,
} from "./thunks/taskThunks.js";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    lists: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.status = "succeeded";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default tasksSlice.reducer;
