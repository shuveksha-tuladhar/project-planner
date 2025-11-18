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
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import { Project as ProjectType } from "./Projects";
import CreateFeatureModal from "../Components/Features/CreateFeatureModal";
import { useState } from "react";
import { UserStory } from "../Components/Features/FeatureModal";
import FeatureBox from "../Components/Features/FeatureBox";
import { FiArrowLeft } from "react-icons/fi";

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

  const [project, setProject] = useState(loaderData);

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
            <Heading size="xl" fontWeight="bold">
              {project.name}
            </Heading>
            <Text color="gray.600" fontSize="md">
              {project.description || "No project description"}
            </Text>
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
    </Box>
  );
};

export default Project;
