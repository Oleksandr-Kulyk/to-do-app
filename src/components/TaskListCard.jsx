import { Heading, Box, Flex, For, IconButton } from "@chakra-ui/react";
import CardTask from "./CardTask";
import { BsX } from "react-icons/bs";
import { sortCompleted } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTaskList } from "../redux/thunks/taskThunks";
import { motion } from "framer-motion";

const TaskListCard = ({ listId, title, tasks }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const MotionBox = motion(Box);

  return (
    <MotionBox
      cursor="pointer"
      pos="relative"
      rounded="lg"
      border="1px solid white"
      p="2.5"
      w="100%"
      maxW="300px"
      minH="300px"
      onClick={() => navigate(`/lists/${listId}`)}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      layout
      layoutId={listId}
      transition={{ duration: 0.3 }}
    >
      <IconButton
        pos="absolute"
        right="2"
        top="2"
        zIndex="10"
        variant="outline"
        bg="transparent"
        color="white"
        size="sm"
        _hover={{ borderColor: "white" }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTaskList(listId));
        }}
      >
        <BsX />
      </IconButton>
      <Heading as="h3" color="white" size="2xl" textAlign="center">
        {title}
      </Heading>
      <Flex direction="column" gap="5">
        <For each={sortCompleted(tasks)}>
          {(task) => <CardTask key={task.taskId} {...task} />}
        </For>
      </Flex>
    </MotionBox>
  );
};

export default TaskListCard;
