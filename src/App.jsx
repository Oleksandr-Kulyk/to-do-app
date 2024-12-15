import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskPage />} />
      <Route path="/lists/:id" element={<TaskList />} />
    </Routes>
  );
}

export default App;
