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
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUsesrStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";
import { FiList } from "react-icons/fi";

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
  const completedStories = stories.filter(
    (story) => story.completedTasks === story.taskCount && story.taskCount > 0
  ).length;

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
              <Heading size="lg" fontWeight="bold">
                {featureName}
              </Heading>
            </HStack>

            {featureDescription && (
              <Text color="gray.600" fontSize="md">
                {featureDescription}
              </Text>
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
    </Modal>
  );
}

export default FeatureModal;
