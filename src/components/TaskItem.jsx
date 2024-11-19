import { Flex, Text, Input } from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { completeTask, editTask } from "../redux/tasksSlice";

const TaskItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [taskText, setTaskText] = useState(text);
  const inputRef = useRef();

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const disableEditing = () => {
    setEditing(false);
    dispatch(editTask({ id, text: taskText }));
  };

  return (
    <Flex as="li" gap={"2.5"} maxW="100%" mb="2.5">
      {editing ? (
        <Input
          onBlur={disableEditing}
          ref={inputRef}
          size="sm"
          variant="flushed"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
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
            textDecor={completed ? "line-through" : null}
            onClick={enableEditing}
          >
            {taskText}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default TaskItem;
