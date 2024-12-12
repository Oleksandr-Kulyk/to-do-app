import { Flex, Heading } from "@chakra-ui/react";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "./ui/progress-circle";

const TasksHeading = ({ title }) => {
  return (
    <Flex w="100%" align="center">
      <Heading as="h2" color="white" size="5xl" textAlign="center" flexGrow="1">
        {title}
      </Heading>
      <ProgressCircleRoot value={0} size="lg">
        <ProgressCircleValueText color="white" />
        <ProgressCircleRing color="cyan.700" />
      </ProgressCircleRoot>
    </Flex>
  );
};

export default TasksHeading;
