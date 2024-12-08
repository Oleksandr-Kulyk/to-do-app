import { Flex, Heading } from "@chakra-ui/react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "./ui/progress-circle";
import { useSelector } from "react-redux";

const TasksHeading = () => {
  const tasksPercent = useSelector((state) => {
    const completed = state.tasks.tasks.filter(
      (item) => Boolean(item.completed) === true
    ).length;
    const all = state.tasks.tasks.length;
    return all > 0 ? Math.floor((completed * 100) / all) : 0;
  });
  return (
    <Flex w="100%" align="center">
      <Heading as="h2" color="white" size="5xl" textAlign="center" flexGrow="1">
        Your Tasks
      </Heading>
      <ProgressCircleRoot value={tasksPercent} size="lg">
        <ProgressCircleValueText color="white" />
        <ProgressCircleRing color="cyan.700" />
      </ProgressCircleRoot>
    </Flex>
  );
};

export default TasksHeading;
