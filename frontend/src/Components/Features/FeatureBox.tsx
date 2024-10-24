import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Feature } from "../../Pages/Project";
import FeatureModal from "./FeatureModal";
import { Project } from "../../Pages/Projects";
import axios from "axios";
import { useNavigate } from "react-router";

type Props = {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const FeatureBox = ({ feature, projectId, setProject }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseModal = () => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:4000/auth/project/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setProject(response.data);
      onClose();
    })
    .catch((error) => {
      if (error.response.data.message === "Unauthorized") {
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
        border="1px"
        p={4}
        mx={4}
        mt={4}
        display="flex"
        justifyContent="space-between"
        key={feature.id}
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
      >
        <Text>{feature.name}</Text>
        <Text>
          {feature.completedUserStories}/{feature.userStoryCount}
        </Text>
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
