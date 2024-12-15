import { Heading, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskLists } from "../redux/thunks/taskThunks";
import TaskListCard from "./TaskListCard";

const TaskLists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskLists());
  }, [dispatch]);

  const taskLists = useSelector((state) => state.tasks.lists);
  console.log(taskLists);

  return (
    <>
      <Heading as="h2" color="white" size="5xl" textAlign="center" mb="10">
        Your Lists
      </Heading>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={2.5}
        placeItems="center"
      >
        {taskLists.map((item) => (
          <TaskListCard key={item.id} {...item} />
        ))}
      </Grid>
    </>
  );
};

export default TaskLists;
