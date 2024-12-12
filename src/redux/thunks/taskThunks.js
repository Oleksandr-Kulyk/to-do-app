import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTaskLists = createAsyncThunk(
  "taskLists/getTaskLists",
  async () => {
    return await window.tasksAPI.getTaskLists();
  }
);

/* export const getAllTasks = createAsyncThunk("tasks/getAllTasks", async () => {
  const tasks = await window.tasksAPI.getAllTasks();
  return tasks;
}); */

export const addNewTask = createAsyncThunk(
  "tasks/addNewTask",
  async (task, { rejectWithValue }) => {
    try {
      const newTask = await window.tasksAPI.addTask(task);
      return newTask;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskID) => {
    return await window.tasksAPI.deleteTask(taskID);
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (task) => {
    return await window.tasksAPI.completeTask(task);
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task) => await window.tasksAPI.editTask(task)
);
