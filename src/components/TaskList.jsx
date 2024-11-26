import { Box } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../redux/thunks/taskThunks";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllTasks());
    }
  }, [dispatch, status]);

  return (
    <>
      <TasksHeading />
      <Box as="ul">
        {[...tasks]
          .sort((taskA, taskB) => {
            if (taskA.completed === taskB.completed) return 0;
            return taskA.completed ? 1 : -1;
          })
          .map((task) => (
            <TaskItem {...task} key={task.id} />
          ))}
      </Box>
    </>
  );
};
export default TaskList;
