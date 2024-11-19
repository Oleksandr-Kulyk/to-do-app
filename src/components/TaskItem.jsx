import { Flex, Text, Input } from "@chakra-ui/react"
import { Checkbox } from "./ui/checkbox"
import { useState, useRef } from "react"

const TaskItem = ({id, text, completed, onChange, handleTextChange}) => {

    const [editing, setEditing] = useState(false);
    const inputRef = useRef();

    const enableEditing = () => {
        setEditing(true);
        setTimeout(() => inputRef.current.focus(), 0)
        ;
    };
    const disableEditing = () => setEditing(false);

    const handleTaskChange = (e) => handleTextChange(id, e.target.value);


return (
    <Flex as='li' gap={'2.5'} maxW='100%' >
        {
            editing ? <Input onBlur={disableEditing} ref={inputRef} size='sm' variant='flushed' value={text} onChange={handleTaskChange} /> : (<>
            <Checkbox variant='outline' _checked={{ color: "white", borderColor: "white" }} checked={completed} onChange={() => onChange(id)} ></Checkbox>
        <Text color={completed ? 'gray.500' : 'white'} textDecor={completed ? 'line-through' : null} onClick={enableEditing} >{text}</Text>
            </>)  
        }
        
    </Flex>
)
}

export default TaskItem