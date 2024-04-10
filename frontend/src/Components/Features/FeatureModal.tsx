import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion from "../UserStories/UserStoryDetailsAccordion";
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
};
// const sampleUserStories: UserStory[] = [
//   {
//     name: "User Story",
//     description: "This is my user story description",
//     status: "2/10",
//   },
//   {
//     name: "User Story",
//     description: "This is my user story description",
//     status: "4/12",
//   },
//   {
//     name: "User Story",
//     description: "This is my user story description",
//     status: "6/15",
//   },
//   {
//     name: "User Story",
//     description: "This is my user story description",
//     status: "4/10",
//   },
//   {
//     name: "User Story",
//     description: "This is my user story description",
//     status: "2/5",
//   },
// ];

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
