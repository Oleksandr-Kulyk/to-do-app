import { memo } from "react";
import { Flex, Text, Input, IconButton } from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask, editTask } from "../redux/thunks/taskThunks";

const TaskItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(text);
  const inputRef = useRef();

  useEffect(() => {
    if (!editing) return;
    inputRef.current.focus();
  });

  const enableEditing = () => {
    setEditing(true);
  };

  const keyUpHandler = (e) => {
    if (e.key !== "Enter") return;
  };

  const completeTaskHandler = () => {
    dispatch(completeTask({ id, completed }));
  };

  const handleEditTask = async () => {
    setEditing(false);
    dispatch(editTask({ id, text: editedTask }));
  };

  const MotionFlex = motion(Flex);

  return (
    <MotionFlex
      as="li"
      gap={"2.5"}
      maxW="100%"
      mb="2.5"
      align="center"
      border="1px solid white"
      p="1.5"
      borderRadius="lg"
      shadow="md"
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      layout
      layoutId={id}
      transition={{
        layout: {
          duration: 0.4,
          ease: "easeInOut",
        },
      }}
    >
      {editing ? (
        <Input
          onBlur={handleEditTask}
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
    </MotionFlex>
  );
};

export default memo(TaskItem);
