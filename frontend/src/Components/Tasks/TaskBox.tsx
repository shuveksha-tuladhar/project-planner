import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  task: Task;
  projectId: number;
  onTaskUpdate: () => void;
};

const TaskBox = ({ task, projectId, onTaskUpdate }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [taskStatus, setTaskStatus] = useState(task.status);

  const [taskName, setTaskName] = useState(task.name);
  const [updateName, setUpdateName] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onChange = (e: any) => {
    setTaskName(e.target.value);
  };

  const onClickEdit = () => {
    setUpdateName(!updateName);
  };

  const updateTask = (field: "status" | "name", value: string) => {
    if (field === "name" && taskName.trim() === "") {
      toast({
        title: "Error",
        description: `Please enter a valid task name!`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTaskName(task.name);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-task`,
        {
          field,
          value,
          taskId: task.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUpdateName(false);

        toast({
          title: "Success",
          description: `Your task ${field} has been updated.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Refresh project data
        onTaskUpdate();
      })
      .catch((error) => {
        if (error.response?.data?.message === "Unauthorized") {
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

  const deleteTask = () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/delete-task`,
        {
          taskId: task.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast({
          title: "Success",
          description: "Task deleted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        // Refresh project data
        onTaskUpdate();
      })
      .catch((error) => {
        setIsDeleting(false);
        if (error.response?.data?.message === "Unauthorized") {
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
              "There was an error deleting your task. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const getNextStatus = (current: string): string => {
    if (current === "To Do") return "In Progress";
    if (current === "In Progress") return "Done!";
    return "To Do";
  };

  const toggleTaskStatus = () => {
    const nextStatus = getNextStatus(taskStatus);
    updateTask("status", nextStatus);
    setTaskStatus(nextStatus);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        borderTop="1px"
        alignItems="center"
        px={4}
        py={2}
        key={task.name}
        gap={4}
      >
        <Box flex={1}>
          {updateName ? (
            <Input h="38px" value={taskName} onChange={onChange} type="text" />
          ) : (
            <Text>{task.name}</Text>
          )}
        </Box>

        <Button w="115px" onClick={toggleTaskStatus}>
          {taskStatus}
        </Button>

        <IconButton
          aria-label="Edit name"
          icon={updateName ? <CheckIcon /> : <EditIcon />}
          size="md"
          isDisabled={
            updateName && (taskName.trim() === "" || taskName === task.name)
          }
          onClick={
            updateName
              ? () => {
                  updateTask("name", taskName);
                }
              : onClickEdit
          }
        />

        <IconButton
          aria-label="Delete task"
          icon={<DeleteIcon />}
          size="md"
          colorScheme="red"
          onClick={onOpen}
        />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "<strong>{task.name}</strong>"?{" "}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteTask}
                ml={3}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TaskBox;
