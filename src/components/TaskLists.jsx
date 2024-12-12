import { Flex, Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskLists } from "../redux/thunks/taskThunks";

const TaskLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskLists());
  }, [dispatch]);

  const taskLists = useSelector((state) => state.tasks.lists);

  return (
    <>
      <Heading as="h2" color="white" size="5xl" textAlign="center" mb="10">
        Your Lists
      </Heading>
      <Flex direction="column" gap={2.5}>
        {taskLists.map((item) => (
          <Box
            key={item.id}
            border="1px solid white"
            borderRadius="lg"
            p="5px 10px"
          >
            <Heading as="h3" color="white" size="2xl" textAlign="center">
              {item.title}
            </Heading>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default TaskLists;
