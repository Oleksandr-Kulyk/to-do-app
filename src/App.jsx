import "./App.css";
import AddTask from "./components/AddTask";
import { Container, Heading, Box } from "@chakra-ui/react";

function App() {
  return (
    <Container as="section" fluid h="100vh" bgColor={"cyan.500"}>
      <Container maxW="8xl" h="100%" bgColor="transparent">
        <Heading size="7xl" color="white" textAlign="center" mb={"12"}>
          To Do App
        </Heading>
        <AddTask />
      </Container>
    </Container>
  );
}

export default App;
