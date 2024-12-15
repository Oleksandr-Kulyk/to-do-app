import { Box, For } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sortCompleted } from "../utils/utils";

const TaskList = () => {
  const params = useParams();
  const taskList = useSelector((state) =>
    state.tasks.lists.find((item) => item.listId === params.id)
  );
  const { listId, title, tasks } = taskList;

  const progressValue =
    (tasks.filter((item) => item.completed === true).length / tasks.length) *
    100;

  return (
    <Container as="section" fluid minH="100vh" bgColor={"cyan.500"}>
      <TasksHeading title={title} progressValue={progressValue} />
      <Box as="ul">
        <AnimatePresence>
          <For each={sortCompleted(tasks)}>
            {(task) => <TaskItem {...task} key={task.id} />}
          </For>
        </AnimatePresence>
      </Box>
    </Container>
  );
};
export default TaskList;
