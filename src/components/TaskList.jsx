import { Box, Button, For } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { calcProgress, sortCompleted } from "../utils/utils";
import AddTask from "./AddTask";

const TaskList = () => {
  const params = useParams();
  const taskList = useSelector((state) =>
    state.tasks.lists.find((item) => item.listId === params.id)
  );
  const { listId, title, tasks } = taskList;

  const navigate = useNavigate();

  const progressValue = calcProgress(tasks);

  return (
    <Container
      as="section"
      fluid
      minH="100vh"
      bgColor={"cyan.500"}
      pt="5%"
      pos="relative"
    >
      <Button
        pos="absolute"
        left="2.5"
        top="2.5"
        variant="outline"
        bgColor="transparent"
        border="1px solid white"
        color="white"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <TasksHeading title={title} progressValue={progressValue} />
      <AddTask />
      <Box as="ul">
        <AnimatePresence>
          <For each={sortCompleted(tasks)}>
            {(task) => <TaskItem {...task} key={task.taskId} />}
          </For>
        </AnimatePresence>
      </Box>
    </Container>
  );
};
export default TaskList;
