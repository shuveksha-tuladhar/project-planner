import { 
  Box, 
  Text, 
  Container, 
  Heading, 
  VStack, 
  HStack, 
  Badge,
  Button,
  Icon,
  IconButton,
  Input,
  Textarea,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import { Project as ProjectType } from "./Projects";
import CreateFeatureModal from "../Components/Features/CreateFeatureModal";
import { useState, useRef } from "react";
import { UserStory } from "../Components/Features/FeatureModal";
import FeatureBox from "../Components/Features/FeatureBox";
import { FiArrowLeft } from "react-icons/fi";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

export type Feature = {
  name: string;
  status: "To Do" | "In Progress" | "Done!";
  userStoryCount: number;
  completedUserStories: number;
  description?: string;
  id: number;
  userStories: UserStory[];
};

const columns = [
  {
    name: "To Do",
    color: "gray",
    bgColor: "gray.50",
  },
  {
    name: "In Progress",
    color: "brand",
    bgColor: "blue.50",
  },
  {
    name: "Done!",
    color: "success",
    bgColor: "green.50",
  },
];

const Project = () => {
  const loaderData = useLoaderData() as ProjectType;
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [project, setProject] = useState(loaderData);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const [editedProjectDescription, setEditedProjectDescription] = useState(
    project.description || ""
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const updateProject = (field: "name" | "description", value: string) => {
    if (field === "name" && value.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid project name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-project`,
        {
          field: field,
          value: value,
          projectId: project.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        if (field === "name") {
          setIsEditingName(false);
          setProject({ ...project, name: value });
        } else {
          setIsEditingDescription(false);
          setProject({ ...project, description: value });
        }
        toast({
          title: "Success",
          description: "Project updated successfully!",
          status: "success",
          duration: 3000,
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
            description: "There was an error updating the project.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteProject = () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/delete-project`,
        { projectId: project.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast({
          title: "Success",
          description: "Project deleted successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/projects");
      })
      .catch((error) => {
        setIsDeleting(false);
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
            description: "There was an error deleting the project.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <VStack align="start" spacing={2}>
            <Button
              leftIcon={<Icon as={FiArrowLeft} />}
              variant="ghost"
              size="sm"
              onClick={() => navigate('/projects')}
              mb={2}
            >
              Back to Projects
            </Button>
            <HStack spacing={3} width="100%">
              {isEditingName ? (
                <Input
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                  size="lg"
                  fontWeight="bold"
                  flex={1}
                  autoFocus
                />
              ) : (
                <Heading size="xl" fontWeight="bold" flex={1}>
                  {project.name}
                </Heading>
              )}
              <HStack spacing={1}>
                <IconButton
                  aria-label="Edit project name"
                  icon={isEditingName ? <CheckIcon /> : <EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  isDisabled={
                    isEditingName &&
                    (editedProjectName.trim() === "" ||
                      editedProjectName === project.name)
                  }
                  onClick={() => {
                    if (isEditingName) {
                      updateProject("name", editedProjectName);
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                />
                <IconButton
                  aria-label="Delete project"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={onDeleteOpen}
                />
              </HStack>
            </HStack>
            <HStack spacing={2} width="100%">
              {isEditingDescription ? (
                <Textarea
                  value={editedProjectDescription}
                  onChange={(e) => setEditedProjectDescription(e.target.value)}
                  size="md"
                  flex={1}
                />
              ) : (
                <Text color="gray.600" fontSize="md" flex={1}>
                  {project.description || "No project description"}
                </Text>
              )}
              <IconButton
                aria-label="Edit description"
                icon={isEditingDescription ? <CheckIcon /> : <EditIcon />}
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  if (isEditingDescription) {
                    updateProject("description", editedProjectDescription);
                  } else {
                    setIsEditingDescription(true);
                  }
                }}
              />
            </HStack>
            <Badge
              colorScheme="brand"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
            >
              {project.features?.length || 0} Features
            </Badge>
          </VStack>

          <HStack 
            spacing={4} 
            align="start" 
            overflowX="auto"
            pb={4}
          >
            {columns.map((column) => {
              const columnFeatures = project.features.filter(
                feature => feature.status === column.name
              );

              return (
                <VStack
                  key={column.name}
                  flex="1"
                  minW="320px"
                  align="stretch"
                  spacing={4}
                >
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="xl"
                    boxShadow="sm"
                    border="1px"
                    borderColor="gray.200"
                  >
                    <HStack justify="space-between">
                      <HStack>
                        <Box
                          w={3}
                          h={3}
                          borderRadius="full"
                          bg={`${column.color}.500`}
                        />
                        <Heading size="md" fontWeight="bold">
                          {column.name}
                        </Heading>
                      </HStack>
                      <Badge
                        colorScheme={column.color}
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {columnFeatures.length}
                      </Badge>
                    </HStack>
                  </Box>

                  <VStack
                    spacing={3}
                    align="stretch"
                    minH="400px"
                    p={4}
                    bg={column.bgColor}
                    borderRadius="xl"
                    border="2px dashed"
                    borderColor={`${column.color}.200`}
                  >
                    {columnFeatures.map((feature) => (
                      <FeatureBox
                        key={feature.id}
                        feature={feature}
                        projectId={project.id}
                        setProject={setProject}
                      />
                    ))}
                    
                    {columnFeatures.length === 0 && column.name !== "To Do" && (
                      <Box
                        p={8}
                        textAlign="center"
                        color="gray.400"
                      >
                        <Text fontSize="sm">
                          No features yet
                        </Text>
                      </Box>
                    )}

                    {column.name === "To Do" && (
                      <CreateFeatureModal
                        features={project.features}
                        setProject={setProject}
                        projectId={project.id}
                      />
                    )}
                  </VStack>
                </VStack>
              );
            })}
          </HStack>
        </VStack>
      </Container>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this {project.name}? This will also
              delete all associated features, user stories, and tasks.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteProject}
                ml={3}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Project;
