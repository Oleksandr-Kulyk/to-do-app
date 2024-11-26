import { memo } from "react";
import { Flex, Text, Input, IconButton } from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import { useState, useRef } from "react";
import { BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask } from "../redux/thunks/taskThunks";

const TaskItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(text);
  const inputRef = useRef();

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const keyUpHandler = (e) => {
    if (e.key !== "Enter") return;
  };

  const completeTaskHandler = () => {
    dispatch(completeTask({ id, completed }));
  };

  const editTask = async () => {
    setEditing(false);
    const newTasks = await window.tasksAPI.editTask({ id, text: editedTask });
    setTasks(newTasks);
  };

  return (
    <Flex
      as="li"
      gap={"2.5"}
      maxW="100%"
      mb="2.5"
      align="center"
      border="1px solid white"
      p="1.5"
      borderRadius="lg"
      shadow="md"
    >
      {editing ? (
        <Input
          onBlur={editTask}
          ref={inputRef}
          size="sm"
          variant="unstyled"
          bgColor="transparent"
          color="white"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onKeyUp={keyUpHandler}
        />
      ) : (
        <>
          <Checkbox
            variant="outline"
            _checked={{ color: "white", borderColor: "white" }}
            checked={completed}
            onChange={completeTaskHandler}
          ></Checkbox>
          <Text
            color={completed ? "gray.500" : "white"}
            flexGrow="1"
            textDecor={completed ? "line-through" : null}
            onClick={enableEditing}
          >
            {text}
          </Text>
          <IconButton
            variant="outline"
            bg="transparent"
            color="white"
            size="sm"
            _hover={{ borderColor: "white" }}
            onClick={() => dispatch(deleteTask(id))}
          >
            <BsX />
          </IconButton>
        </>
      )}
    </Flex>
  );
};

export default memo(TaskItem);
