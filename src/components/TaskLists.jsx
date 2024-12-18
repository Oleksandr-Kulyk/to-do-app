import { Heading, Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import TaskListCard from "./TaskListCard";

const TaskLists = () => {
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
