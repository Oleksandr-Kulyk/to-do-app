import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTask,
  deleteTask,
  completeTask,
  editTask,
  getTaskLists,
  deleteTaskList,
  addTaskList,
} from "./thunks/taskThunks.js";
import { findTask } from "../utils/utils.js";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    lists: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTaskList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(getTaskLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.status = "succeeded";
      })
      .addCase(deleteTaskList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (item) => item.listId !== action.payload
        );
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        const list = state.lists.find(
          (item) => item.listId === action.payload.listID
        );
        list.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        console.log(action.payload);
        const task = findTask(state.lists, action.payload.taskId);
        console.log(task);
        task.completed = action.payload.completed;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export default tasksSlice.reducer;
