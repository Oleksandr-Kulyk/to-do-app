import "./App.css";
import { Container, Heading } from "@chakra-ui/react";
import AddTaskList from "./components/AddTaskList.jsx";
import TaskLists from "./components/TaskLists.jsx";

function App() {
  return (
    <Container as="section" fluid minH="100vh" bgColor={"cyan.500"}>
      <Container maxW="8xl" h="100%" bgColor="transparent">
        <Heading size="7xl" color="white" textAlign="center" mb={"12"}>
          Awesome Notes
        </Heading>
        <AddTaskList />
        <TaskLists />
      </Container>
    </Container>
  );
}

export default App;
