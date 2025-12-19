import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Icon,
  Progress,
  useToast,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import TaskBox from "../Tasks/TaskBox";
import { Project } from "../../Pages/Projects";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

type Props = {
  name: string;
  description: string;
  status: string;
  featureId: number;
  projectId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type Task = {
  name: string;
  status: string;
  id: number;
};

const UserStoryDetailsAccordion = ({
  name,
  description,
  status,
  projectId,
  featureId,
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [completed, total] = status.split("/").map(Number);
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const isCompleted = completed === total && total > 0;

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [userStoryName, setUserStoryName] = useState(name);
  const [userStoryDescription, setUserStoryDescription] = useState(description || "");
  const [isDeleting, setIsDeleting] = useState(false);

  const refreshProjectData = () => {
    const token = localStorage.getItem("token");
    
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/auth/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        if (error.response?.data?.message === "Unauthorized") {
          toast({
            title: "Session Expired",
            description: "Your session has expired, please log in again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/log-in");
        } else {
          toast({
            title: "Error",
            description: "There was an error loading project data.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const updateUserStory = (field: "name" | "description", value: string) => {
    if (field === "name" && value.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid user story name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setUserStoryName(name);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-user-story`,
        {
          field,
          value,
          userStoryId: userStoryId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setIsEditingName(false);
        setIsEditingDescription(false);

        toast({
          title: "Success",
          description: `User story ${field} has been updated.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        refreshProjectData();
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
            description: "There was an error updating the user story. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteUserStory = () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/delete-user-story`,
        {
          userStoryId: userStoryId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast({
          title: "Success",
          description: "User story deleted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        refreshProjectData();
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
            description: "There was an error deleting the user story. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem
          border="1px"
          borderColor="gray.200"
          borderRadius="lg"
          bg="white"
          overflow="hidden"
          _hover={{
            borderColor: "brand.300",
          }}
        >
          <h2>
          <AccordionButton
            p={4}
            _hover={{
              bg: "gray.50",
            }}
          >
            <HStack flex={1} spacing={3} align="center">
              <Icon
                as={isCompleted ? FiCheckCircle : FiCircle}
                color={isCompleted ? "success.500" : "gray.400"}
                boxSize={5}
              />
              <VStack align="start" spacing={1} flex={1}>
                {isEditingName ? (
                  <Input
                    value={userStoryName}
                    onChange={(e) => setUserStoryName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    size="sm"
                    fontWeight="semibold"
                  />
                ) : (
                  <Text
                    fontWeight="semibold"
                    fontSize="md"
                    textAlign="left"
                    color={isCompleted ? "gray.500" : "gray.800"}
                    textDecoration={isCompleted ? "line-through" : "none"}
                  >
                    {name}
                  </Text>
                )}
                {total > 0 && (
                  <HStack spacing={2} w="full">
                    <Progress
                      value={progress}
                      size="sm"
                      colorScheme={isCompleted ? "success" : "brand"}
                      borderRadius="full"
                      flex={1}
                      maxW="200px"
                      bg="gray.200"
                    />
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      {status}
                    </Text>
                  </HStack>
                )}
              </VStack>
              <Badge
                colorScheme={isCompleted ? "success" : "gray"}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
              >
                {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
              </Badge>
              <IconButton
                aria-label="Edit user story name"
                icon={isEditingName ? <CheckIcon /> : <EditIcon />}
                size="sm"
                // bg="white"
                colorScheme="blue"
                isDisabled={isEditingName && (userStoryName.trim() === "" || userStoryName === name)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isEditingName) {
                    updateUserStory("name", userStoryName);
                  } else {
                    setIsEditingName(true);
                  }
                }}
              />
              <IconButton
                aria-label="Delete user story"
                icon={<DeleteIcon />}
                size="sm"
                // bg="white"
                colorScheme="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
              />
            </HStack>
            <AccordionIcon ml={2} />
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} bg="gray.50">
          {(description || isEditingDescription) && (
            <Box p={4} bg="white" borderBottom="1px" borderColor="gray.200">
              <HStack align="start" spacing={2}>
                {isEditingDescription ? (
                  <Textarea
                    value={userStoryDescription}
                    onChange={(e) => setUserStoryDescription(e.target.value)}
                    size="sm"
                    flex={1}
                  />
                ) : (
                  <Text fontSize="sm" color="gray.600" flex={1}>
                    {description}
                  </Text>
                )}
                <IconButton
                  aria-label="Edit description"
                  icon={isEditingDescription ? <CheckIcon /> : <EditIcon />}
                  size="sm"
                  bg="white"
                  colorScheme="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isEditingDescription) {
                      updateUserStory("description", userStoryDescription);
                    } else {
                      setIsEditingDescription(true);
                    }
                  }}
                />
              </HStack>
            </Box>
          )}

          <VStack spacing={0} align="stretch">
            {tasks.length > 0 && (
              <Box bg="white" borderBottom="1px" borderColor="gray.200">
                {tasks.map((task, index) => (
                  <Box
                    key={task.id}
                    borderTop={index > 0 ? "1px" : "none"}
                    borderColor="gray.100"
                  >
                    <TaskBox
                      task={task}
                      projectId={projectId}
                      onTaskUpdate={refreshProjectData}
                    />
                  </Box>
                ))}
              </Box>
            )}

            <Box p={3} bg="gray.50">
              <CreateTaskAccordion
                featureId={featureId}
                projectId={projectId}
                userStoryId={userStoryId}
                setProject={setProject}
              />
            </Box>
          </VStack>
        </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User Story
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "<strong>{name}</strong>"? This will also delete all associated tasks. This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteUserStory}
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

export default UserStoryDetailsAccordion;
