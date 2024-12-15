import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";

const TaskList = () => {
  return (
    <>
      <TasksHeading />
      <Box as="ul">
        <AnimatePresence>
          {[...tasks]
            .sort((taskA, taskB) => {
              if (taskA.completed === taskB.completed) return 0;
              return taskA.completed ? 1 : -1;
            })
            .map((task) => (
              <TaskItem {...task} key={task.id} />
            ))}
        </AnimatePresence>
      </Box>
    </>
  );
};
export default TaskList;
