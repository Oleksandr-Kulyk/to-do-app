import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: "1",
      text: "Task 1",
      completed: true,
    },
    {
      id: "2",
      text: "Task 2",
      completed: false,
    },
    {
      id: "3",
      text: "Task 3",
      completed: false,
    },
  ],
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
  },
});

export const { completeTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
