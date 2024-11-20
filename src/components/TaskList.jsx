import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";

const TaskList = () => {
  const tasks = useSelector((store) => store.tasks);

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
