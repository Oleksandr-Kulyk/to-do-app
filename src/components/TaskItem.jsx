import { memo } from "react";
import { Flex, Text, Input, IconButton } from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BsX } from "react-icons/bs";
import { completeTask, editTask, deleteTask } from "../redux/tasksSlice";

const TaskItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const disableEditing = () => {
    setEditing(false);
  };

  const keyUpHandler = (e) => {
    if (e.key !== "Enter") return;
    disableEditing();
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
          onBlur={disableEditing}
          ref={inputRef}
          size="sm"
          variant="unstyled"
          bgColor="transparent"
          color="white"
          value={text}
          onChange={(e) => dispatch(editTask({ id, text: e.target.value }))}
          onKeyUp={keyUpHandler}
        />
      ) : (
        <>
          <Checkbox
            variant="outline"
            _checked={{ color: "white", borderColor: "white" }}
            checked={completed}
            onChange={() => dispatch(completeTask(id))}
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
