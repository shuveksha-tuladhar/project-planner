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
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [completed, total] = status.split("/").map(Number);
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const isCompleted = completed === total && total > 0;

  const getNextStatus = (current: string): string => {
    if (current === "To Do") return "In Progress";
    if (current === "In Progress") return "Done!";
    return "To Do";
  };

  const updateTaskStatus = (taskId: number, currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-task`,
        {
          field: "status",
          value: nextStatus,
          taskId: taskId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Refresh the project data to get updated task statuses
        return axios.get(
          `${process.env.REACT_APP_API_URL}/auth/project/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      })
      .then((response) => {
        setProject(response.data);
        toast({
          title: "Task Updated!",
          description: `Task status changed to ${nextStatus}.`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
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
            description:
              "There was an error updating your task. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
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
        transition="all 0.2s"
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
                <Text
                  fontWeight="semibold"
                  fontSize="md"
                  textAlign="left"
                  color={isCompleted ? "gray.500" : "gray.800"}
                  textDecoration={isCompleted ? "line-through" : "none"}
                >
                  {name}
                </Text>
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
            </HStack>
            <AccordionIcon ml={2} />
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} bg="gray.50">
          {description && (
            <Box p={4} bg="white" borderBottom="1px" borderColor="gray.200">
              <Text fontSize="sm" color="gray.600">
                {description}
              </Text>
            </Box>
          )}

          <VStack spacing={0} align="stretch">
            {tasks.length > 0 && (
              <Box bg="white" borderBottom="1px" borderColor="gray.200">
                {tasks.map((task, index) => {
                  const isTaskComplete =
                    task.status.toLowerCase() === "complete" ||
                    task.status.toLowerCase() === "done!";
                  return (
                    <HStack
                      key={task.id}
                      px={4}
                      py={3}
                      spacing={3}
                      borderTop={index > 0 ? "1px" : "none"}
                      borderColor="gray.100"
                      _hover={{
                        bg: "gray.50",
                      }}
                      transition="all 0.2s"
                    >
                      <Icon
                        as={isTaskComplete ? FiCheckCircle : FiCircle}
                        color={isTaskComplete ? "success.500" : "gray.400"}
                        boxSize={4}
                      />
                      <Text
                        flex={1}
                        fontSize="sm"
                        color={isTaskComplete ? "gray.500" : "gray.700"}
                        textDecoration={
                          isTaskComplete ? "line-through" : "none"
                        }
                      >
                        {task.name}
                      </Text>
                      <Badge
                        colorScheme={isTaskComplete ? "success" : "gray"}
                        size="sm"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        cursor="pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTaskStatus(task.id, task.status);
                        }}
                        _hover={{
                          transform: "scale(1.05)",
                          boxShadow: "sm",
                        }}
                        transition="all 0.2s"
                      >
                        {task.status}
                      </Badge>
                    </HStack>
                  );
                })}
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
  );
};

export default UserStoryDetailsAccordion;
