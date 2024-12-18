import { useState } from "react";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTaskList } from "../redux/thunks/taskThunks";
import { useNavigate } from "react-router-dom";

const AddTaskList = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const addNewList = async () => {
    const res = await dispatch(addTaskList({ id: uuidv4(), title })).unwrap();

    setTitle("");
    navigate(`/lists/${res.listId}`);
  };

  return (
    <Flex gap={"2.5"} mb="5">
      <Input
        size={"sm"}
        placeholder="New list"
        color="white"
        _placeholder={{ color: "white" }}
        _focus={{ outline: "none", borderColor: "inherit" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <IconButton
        variant="outline"
        bg="transparent"
        color="white"
        borderColor="white"
        size="sm"
        _hover={{ borderColor: "cyan.500", bg: "white", color: "cyan.500" }}
        _focus={{ outline: "none" }}
        onClick={addNewList}
      >
        <VscAdd />
      </IconButton>
    </Flex>
  );
};

export default AddTaskList;
