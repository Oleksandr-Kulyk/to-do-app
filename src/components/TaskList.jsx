import { Box } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import TasksHeading from "./TasksHeading";
import { useEffect, useState } from "react";

const TaskList = () => {

const [tasks, setTasks] = useState([]);

useEffect(() => {
   (async () => {
    try {
      const taskList = await window.tasksAPI.getAllTasks();
      console.log(taskList);
      setTasks(taskList)
      console.log(tasks);
    } catch (error) {
      console.error(console.error(error.message))
    }  
  })()
}, []
)

  return (
    <>
      <TasksHeading />
      <Box as="ul">
        {[...tasks]
          .sort((taskA, taskB) => {
            if (taskA.completed === taskB.completed) return 0;
            return taskA.completed ? 1 : -1;
          })
          .map((task) => (
            <TaskItem {...task} setTasks={setTasks} key={task.id} />
          ))}
      </Box>
    </>
  );
};
export default TaskList;
