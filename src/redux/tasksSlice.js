import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    completeTask: (state, action) => {
      const task = state.find((item) => item.id === action.payload);
      task.completed = !task.completed;
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.find((item) => item.id === id);
      task.text = text;
    },
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        text: action.payload,
        completed: false
      };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    }
  }
});

export const { completeTask, editTask, addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
