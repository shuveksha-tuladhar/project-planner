import {
  Box,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Progress,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { Feature } from "../../Pages/Project";
import FeatureModal from "./FeatureModal";
import { Project } from "../../Pages/Projects";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const FeatureBox = ({ feature, projectId, setProject }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const progress =
    feature.userStoryCount > 0
      ? (feature.completedUserStories / feature.userStoryCount) * 100
      : 0;

  const onCloseModal = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProject(response.data);
        onClose();
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
              "There was an error updating your project. Please reload the page.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <Box
        bg="white"
        p={4}
        borderRadius="lg"
        boxShadow="sm"
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          boxShadow: "md",
          transform: "translateY(-2px)",
        }}
        transition="all 0.2s"
        border="1px"
        borderColor="gray.200"
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between" align="start">
            <Text fontWeight="semibold" fontSize="md" flex={1} noOfLines={2}>
              {feature.name}
            </Text>
          </HStack>

          {feature.description && (
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {feature.description}
            </Text>
          )}

          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between" fontSize="sm">
              <HStack color="gray.600">
                <Icon as={FiCheckCircle} boxSize={4} />
                <Text>User Stories</Text>
              </HStack>
              <Text fontWeight="semibold" color="gray.700">
                {feature.completedUserStories}/{feature.userStoryCount}
              </Text>
            </HStack>
            <Progress
              value={progress}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              bg="gray.200"
            />
          </VStack>
        </VStack>
      </Box>

      <FeatureModal
        isOpen={isOpen}
        onClose={onCloseModal}
        featureName={feature.name}
        featureDescription={feature.description || "There is no description"}
        projectId={projectId}
        featureId={feature.id}
        stories={feature.userStories}
        setProject={setProject}
      />
    </>
  );
};

export default FeatureBox;
