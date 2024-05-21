import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUsesrStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";

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
  status: string;
  id: number;
  tasks: Task[];
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

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent minW="75%" minH="75%">
          <Box m={10}>
            <Box mb={20}>
              <Text mb={4} fontSize={20}>
                {featureName}
              </Text>
              <Text>{featureDescription}</Text>
            </Box>

            <ModalCloseButton />
            <Box display="flex" flexDirection="column" gap={4}>
              {stories.map((userStory) => {
                return (
                  <UserStoryDetailsAccordion
                    name={`${userStory.name}`}
                    description={`${userStory.description}`}
                    status={userStory.status}
                    projectId={projectId}
                    featureId={featureId}
                    userStoryId={userStory.id}
                    tasks={userStory.tasks}
                    key={userStory.id}
                    setProject={setProject}
                  />
                );
              })}
              <CreateUsesrStoryAccordion
                projectId={projectId}
                featureId={featureId}
                setProject={setProject}
              />
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default FeatureModal;
