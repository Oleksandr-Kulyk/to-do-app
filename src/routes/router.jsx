import { createBrowserRouter } from "react-router-dom";
import { store } from "../redux/store.js";
import { getTaskLists } from "../redux/thunks/taskThunks";
import TaskList from "../components/TaskList";
import TaskPage from "../pages/TaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskPage />,
    loader: () => store.dispatch(getTaskLists()),
  },
  {
    path: "/lists/:id",
    element: <TaskList />,
  },
]);

export default router;
