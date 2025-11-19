import { 
  Box, 
  Text, 
  Container, 
  Heading, 
  SimpleGrid, 
  Badge, 
  VStack,
  HStack,
  Icon,
  Progress,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import { Data } from "./Profile";
import CreateProjectModal from "../Components/Projects/CreateProjectModal";
import { useState } from "react";
import { Feature } from "./Project";
import { FiFolder, FiCheckCircle, FiPlus } from "react-icons/fi";

export type Project = {
  name: string;
  description?: string;
  status: string;
  id: number;
  features: Feature[];
};

type LoaderData = {
  user: Data;
  projects: Project[];
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "done":
      return "success";
    case "in progress":
      return "brand";
    case "to do":
    case "not started":
      return "gray";
    default:
      return "gray";
  }
};

const Projects = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as LoaderData;
  const user = data.user as Data;
  const { isOpen, onToggle } = useDisclosure();

  const [projects, setProjects] = useState(data.projects);

  const goToProject = (id: number) => {
    navigate(`/project/${id}`);
  };

  const calculateProgress = (features: Feature[]) => {
    if (!features || features.length === 0) return 0;
    const completed = features.filter(f => f.status === "Done!").length;
    return (completed / features.length) * 100;
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="lg" fontWeight="bold">
                {user.name}'s Projects
              </Heading>
              <Text color="gray.600">
                Manage and track your projects
              </Text>
            </VStack>
            <Button
              leftIcon={<Icon as={FiPlus} />}
              colorScheme="brand"
              size="lg"
              onClick={onToggle}
              boxShadow="md"
            >
              New Project
            </Button>
          </HStack>

          <CreateProjectModal 
            projects={projects} 
            setProjects={setProjects}
            isOpen={isOpen}
            onClose={onToggle}
          />

          {projects.length === 0 ? (
            <Box 
              bg="white" 
              p={12} 
              borderRadius="xl" 
              textAlign="center"
              border="2px dashed"
              borderColor="gray.300"
            >
              <Icon as={FiFolder} boxSize={12} color="gray.400" mb={4} />
              <Heading size="md" color="gray.600" mb={2}>
                No projects yet
              </Heading>
              <Text color="gray.500">
                Create your first project to get started
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {projects.map((project) => {
                const progress = calculateProgress(project.features);
                const featuresCount = project.features?.length || 0;
                const completedCount = project.features?.filter(f => f.status === "Done!").length || 0;

                return (
                  <Box
                    key={project.id}
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    boxShadow="sm"
                    cursor="pointer"
                    onClick={() => goToProject(project.id)}
                    _hover={{
                      boxShadow: "lg",
                      transform: "translateY(-4px)",
                    }}
                    transition="all 0.3s"
                    border="1px"
                    borderColor="gray.200"
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between" align="start">
                        <HStack spacing={3}>
                          <Box
                            bg="brand.50"
                            p={2}
                            borderRadius="lg"
                          >
                            <Icon as={FiFolder} color="brand.500" boxSize={5} />
                          </Box>
                          <VStack align="start" spacing={0}>
                            <Heading size="md" fontWeight="bold">
                              {project.name}
                            </Heading>
                          </VStack>
                        </HStack>
                        <Badge
                          colorScheme={getStatusColor(project.status)}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          {project.status}
                        </Badge>
                      </HStack>

                      <Text 
                        color="gray.600" 
                        noOfLines={2} 
                        minH="40px"
                        fontSize="sm"
                      >
                        {project.description || "No description provided"}
                      </Text>

                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between" fontSize="sm">
                          <HStack color="gray.600">
                            <Icon as={FiCheckCircle} />
                            <Text>Features</Text>
                          </HStack>
                          <Text fontWeight="semibold" color="gray.700">
                            {completedCount}/{featuresCount}
                          </Text>
                        </HStack>
                        <Progress
                          value={progress}
                          colorScheme="brand"
                          borderRadius="full"
                          size="sm"
                          bg="gray.200"
                        />
                      </VStack>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Projects;
