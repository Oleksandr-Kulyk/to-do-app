import { useState } from "react";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";

const AddTask = () => {
  const [task, setTask] = useState("");

  const onChangeHandler = (e) => {
    setTask(e.target.value);
  };

  return (
    <Flex gap={"2.5"}>
      <Input
        size={"sm"}
        placeholder="Add new task"
        color="white"
        _placeholder={{ color: "white" }}
        value={task}
        onChange={onChangeHandler}
        _focus={{ outline: "none", borderColor: "inherit" }}
      />
      <IconButton
        variant="outline"
        bg="transparent"
        color="white"
        borderColor="white"
        size="sm"
        _hover={{ borderColor: "cyan.500", bg: "white", color: "cyan.500" }}
        _focus={{ outline: "none" }}
      >
        <VscAdd />
      </IconButton>
    </Flex>
  );
};

export default AddTask;
