import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  ModalBody,
  VStack,
  Heading,
  Divider,
  Badge,
  HStack,
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
  Button,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUsesrStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";
import { FiList } from "react-icons/fi";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  projectId: number;
  featureId: number;
  stories: UserStory[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type UserStory = {
  name: string;
  description: string;
  id: number;
  tasks: Task[];
  completedTasks: number;
  taskCount: number;
};

function FeatureModal({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  projectId,
  featureId,
  stories,
  setProject,
}: Props) {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedFeatureName, setEditedFeatureName] = useState(featureName);
  const [editedFeatureDescription, setEditedFeatureDescription] = useState(
    featureDescription
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const completedStories = stories.filter(
    (story) => story.completedTasks === story.taskCount && story.taskCount > 0
  ).length;

  const refreshProjectData = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

  const updateFeature = (field: "name" | "description", value: string) => {
    if (field === "name" && value.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid feature name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setEditedFeatureName(featureName);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-feature`,
        {
          field,
          value,
          featureId: featureId,
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
          description: `Feature ${field} has been updated.`,
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
            description: "There was an error updating the feature. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteFeature = () => {
    setIsDeleting(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/delete-feature`,
        {
          featureId: featureId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast({
          title: "Success",
          description: "Feature deleted successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onDeleteClose();
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
            description: "There was an error deleting the feature. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
      <ModalContent maxH="90vh" borderRadius="2xl">
        <ModalHeader
          borderBottom="1px"
          borderColor="gray.200"
          pb={4}
          pt={6}
          px={8}
        >
          <VStack align="stretch" spacing={3}>
            <HStack spacing={3}>
              <Box bg="brand.50" p={2} borderRadius="lg">
                <Icon as={FiList} color="brand.500" boxSize={5} />
              </Box>
              {isEditingName ? (
                <Input
                  value={editedFeatureName}
                  onChange={(e) => setEditedFeatureName(e.target.value)}
                  size="lg"
                  fontWeight="bold"
                  flex={1}
                />
              ) : (
                <Heading size="lg" fontWeight="bold" flex={1}>
                  {featureName}
                </Heading>
              )}
              <HStack spacing={1} mr={8}>
                <IconButton
                  aria-label="Edit feature name"
                  icon={isEditingName ? <CheckIcon /> : <EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  isDisabled={
                    isEditingName &&
                    (editedFeatureName.trim() === "" ||
                      editedFeatureName === featureName)
                  }
                  onClick={() => {
                    if (isEditingName) {
                      updateFeature("name", editedFeatureName);
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                />
                <IconButton
                  aria-label="Delete feature"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={onDeleteOpen}
                />
              </HStack>
            </HStack>

            {(featureDescription || isEditingDescription) && (
              <HStack align="start" spacing={2}>
                {isEditingDescription ? (
                  <Textarea
                    value={editedFeatureDescription}
                    onChange={(e) => setEditedFeatureDescription(e.target.value)}
                    size="md"
                    flex={1}
                  />
                ) : (
                  <Text color="gray.600" fontSize="md" flex={1}>
                    {featureDescription}
                  </Text>
                )}
                <IconButton
                  aria-label="Edit description"
                  icon={isEditingDescription ? <CheckIcon /> : <EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => {
                    if (isEditingDescription) {
                      updateFeature("description", editedFeatureDescription);
                    } else {
                      setIsEditingDescription(true);
                    }
                  }}
                />
              </HStack>
            )}

            <HStack spacing={3}>
              <Badge
                colorScheme="brand"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {stories.length} User{" "}
                {stories.length === 1 ? "Story" : "Stories"}
              </Badge>
              {stories.length > 0 && (
                <Badge
                  colorScheme="success"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  {completedStories} Completed
                </Badge>
              )}
            </HStack>
          </VStack>
        </ModalHeader>

        <ModalCloseButton top={6} right={6} />

        <ModalBody p={8} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {stories.length > 0 && (
              <>
                <Heading size="sm" color="gray.700" mb={2}>
                  User Stories
                </Heading>
                {stories.map((userStory) => (
                  <UserStoryDetailsAccordion
                    key={userStory.id}
                    name={userStory.name}
                    description={userStory.description}
                    status={`${userStory.completedTasks}/${userStory.taskCount}`}
                    projectId={projectId}
                    featureId={featureId}
                    userStoryId={userStory.id}
                    tasks={userStory.tasks}
                    setProject={setProject}
                  />
                ))}
                <Divider my={2} />
              </>
            )}

            <Box>
              <CreateUsesrStoryAccordion
                projectId={projectId}
                featureId={featureId}
                setProject={setProject}
              />
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feature
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "<strong>{featureName}</strong>"?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteFeature}
                ml={3}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Modal>
  );
}

export default FeatureModal;
