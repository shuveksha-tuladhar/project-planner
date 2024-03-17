import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion from "../UserStories/UserStoryDetailsAccordion";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
};

export type UserStory = {
    name: string;
    description: string;
    status: string;
}
const sampleUserStories: UserStory[] = [
  {
    name: "User Story",
    description: "This is my user story description",
    status: "2/10",
  },
  {
    name: "User Story",
    description: "This is my user story description",
    status: "4/12",
  },
  {
    name: "User Story",
    description: "This is my user story description",
    status: "6/15",
  },
  {
    name: "User Story",
    description: "This is my user story description",
    status: "4/10",
  },
  {
    name: "User Story",
    description: "This is my user story description",
    status: "2/5",
  },
];

function FeatureModal({ isOpen, onClose, featureName, featureDescription }: Props) {
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
            {sampleUserStories.map((userStory, index) => {
              return (
                <Box
                  border="1px"
                  p={4}
                  mt={4}
                  display="flex"
                  justifyContent="space-between"
                  _hover={{ cursor: "pointer" }}
                  w="100%"
                >
                  <Text>{userStory.name} {index + 1}</Text>
                  <Text>{userStory.status}</Text>
                </Box>
              );
            })}
            <UserStoryDetailsAccordion/>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default FeatureModal;
