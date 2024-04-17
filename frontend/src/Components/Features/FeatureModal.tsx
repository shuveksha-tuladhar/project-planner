import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, { Task } from "../UserStories/UserStoryDetailsAccordion";
import CreateUsesrStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { useEffect, useState } from "react";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  projectId: number;
  featureId: number;
  stories: UserStory[];
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
}: Props) {

  const [userStories, setUserStories] = useState(stories);

  useEffect(() => {
    setUserStories(stories);
  }, [stories])
  
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
              {userStories.map((userStory) => {
                return (
                  <UserStoryDetailsAccordion
                    name={`${userStory.name}`}
                    description={`${userStory.description}`}
                    status={userStory.status}
                    projectId={projectId}
                    featureId={featureId}
                    userStoryId={userStory.id}
                    tasks={userStory.tasks}
                  />
                );
              })}
              <CreateUsesrStoryAccordion
                userStories={userStories}
                setUserStories={setUserStories}
                projectId={projectId}
                featureId={featureId}
              />
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default FeatureModal;
