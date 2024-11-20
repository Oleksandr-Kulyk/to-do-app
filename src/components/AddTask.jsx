import { useState } from "react";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { addTask } from "../redux/tasksSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const onChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const addTaskHandler = () => {
    if (!task.trim()) return;
    dispatch(addTask(task));
    setTask("");
  };

  const keyUpHandler = (e) => {
    if (e.key !== "Enter") return;
    addTaskHandler();
  };

  return (
    <Flex gap={"2.5"} mb="5">
      <Input
        size={"sm"}
        placeholder="Add new task"
        color="white"
        _placeholder={{ color: "white" }}
        value={task}
        onChange={onChangeHandler}
        _focus={{ outline: "none", borderColor: "inherit" }}
        onKeyUp={keyUpHandler}
      />
      <IconButton
        variant="outline"
        bg="transparent"
        color="white"
        borderColor="white"
        size="sm"
        _hover={{ borderColor: "cyan.500", bg: "white", color: "cyan.500" }}
        _focus={{ outline: "none" }}
        onClick={addTaskHandler}
      >
        <VscAdd />
      </IconButton>
    </Flex>
  );
};

export default AddTask;
