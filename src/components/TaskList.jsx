import { useState } from "react"
import { Box } from "@chakra-ui/react"
import TaskItem from "./TaskItem"


const TaskList = () => {

    const taskList = [
        {
          id: '1',
          text: 'Task 1',
          completed: true
        },
        {
          id: '2',
          text: 'Task 2',
          completed: false
        },
        {
          id: '3',
          text: 'Task 3',
          completed: false
        }
      ]

      const [tasks, setTasks] = useState(taskList)

      const completeTaskHandler = (id) => {
        const newTasks = tasks.map(item => {
            if(item.id === id) {
                return {...item, completed: !item.completed}
            }
            else return item
        })
        setTasks(newTasks);
      };

      const handleTextChange = (id, newText) => {
        const newTasks = tasks.map(item => {
           return item.id === id ? {...item, text: newText} : item
        });
        setTasks(newTasks);
      }

      console.log(tasks);

    return (
        <Box as='ul' >
          {
            [...tasks]
            .sort((taskA, taskB) => {
                if (taskA.completed === taskB.completed) return 0;
                return taskA.completed ? 1 : -1;
              })
            .map(task => <TaskItem {...task} key={task.id} onChange={completeTaskHandler} handleTextChange={handleTextChange} />)
          }
        </Box>
    )
}
export default TaskList
