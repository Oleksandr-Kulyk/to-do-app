import { Heading, Box, Flex, For } from "@chakra-ui/react";
import CardTask from "./CardTask";
import { sortCompleted } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const TaskListCard = ({ listId, title, tasks }) => {
  const navigate = useNavigate();

  return (
    <Box
      cursor="pointer"
      rounded="lg"
      border="1px solid white"
      p="2.5"
      w="100%"
      maxW="300px"
      minH="300px"
      onClick={() => navigate(`/lists/${listId}`)}
    >
      <Heading as="h3" color="white" size="2xl" textAlign="center">
        {title}
      </Heading>
      <Flex direction="column" gap="5">
        <For each={sortCompleted(tasks)}>
          {(task) => <CardTask key={task.id} {...task} />}
        </For>
      </Flex>
    </Box>
  );
};

export default TaskListCard;
