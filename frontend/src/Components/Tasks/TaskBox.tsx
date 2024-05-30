import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

type Props = {
    task: Task; 
}

const TaskBox = ({task} : Props) => {
    const toast= useToast();
    const navigate = useNavigate();

    const [taskStatus, setTaskStatus] = useState(task.status);

    console.log('TASK', task)

    const updateTask = (field: "status" | "name", value: string ) => {

        const token = localStorage.getItem("token")


    axios.post(
      "http://localhost:4000/auth/update-task",
      {
        field, value, taskId: task.id
      }, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        console.log("Response", response.data)
      
        toast({
          title: "Success",
          description: `Your task ${field} has been updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });


      }).catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          toast({
            title: "Error",
            description: "Your session has expired, please log in again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/log-in");
        } else {
          toast({
            title: "Error",
            description:
              "There was an error updating your task. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

      });
    };

  const toggleTaskStatus = () => {
    if (taskStatus === "To Do") {
        setTaskStatus("In Progress");
        updateTask("status", "In Progress")
    } else if (taskStatus === "In Progress"){
        setTaskStatus("Done!");
        updateTask("status", "Done!")
    } else {
        setTaskStatus("To Do");
        updateTask("status", "To Do")
    }
  }

    return (
    <Box
      display="flex"
      justifyContent="space-between"
      borderTop="1px"
      alignItems="center"
      px={4}
      py={2}
      key={task.name}
    >
      <Text p={4}>{task.name}</Text>
      <Button onClick={toggleTaskStatus}>{taskStatus}</Button>
    </Box>
  );
};

export default TaskBox;
