import "./App.css";
import { Container, Heading, Box, Text, Flex } from "@chakra-ui/react";
import AddTask from "./components/AddTask";
import TaskList from "./components/taskList";

function App() {



  return (
    <Container as="section" fluid h="100vh" bgColor={"cyan.500"}>
      <Container maxW="8xl" h="100%" bgColor="transparent">
        <Heading size="7xl" color="white" textAlign="center" mb={"12"}>
          To Do App
        </Heading>
        <AddTask />
        <TaskList />
      </Container>
    </Container>
  );
}

export default App;
