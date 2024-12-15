import { Flex, Text } from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";

const CardTask = ({ id, text, completed }) => {
  return (
    <Flex gap="3">
      <Checkbox
        variant="outline"
        _checked={{ color: "white", borderColor: "white" }}
        checked={completed}
      ></Checkbox>
      <Text
        color={completed ? "gray.500" : "white"}
        flexGrow="1"
        textDecor={completed ? "line-through" : null}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default CardTask;
