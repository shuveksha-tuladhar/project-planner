import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../Components/Features/CreateFeatureAccordion";
import { useState } from "react";
import FeatureModal, { UserStory } from "../Components/Features/FeatureModal";
import FeatureBox from "../Components/Features/FeatureBox";

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
  },
  {
    name: "In Progress",
  },
  {
    name: "Done!",
  },
];

const Project = () => {
  const loaderData = useLoaderData() as ProjectType;

  const [project, setProject] = useState(loaderData);

  console.log("Project", project)

  return (
    <Box m={10}>
      <Box mb={20}>
        <Text mb={4} fontSize={20}>
          {project.name}
        </Text>
        <Text>{project.description || "There is no project description."}</Text>
      </Box>
      <Box display="flex" gap={10}>
        {columns.map((column) => {
          return (
            <Box border="1px" flex={1} height="100vh" key={column.name}>
              <Text textAlign="center" fontSize={20} mt={2}>
                {column.name}
              </Text>
              {project.features.map((feature) => {
                // feature.status = "To Do";
                if (column.name === feature.status) {
                  return (
                    <FeatureBox
                      feature={feature}
                      projectId={project.id}
                      setProject={setProject}
                      key={feature.id}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <Box p={4}>
                {column.name === "To Do" && (
                  <CreateFeatureAccordion
                    features={project.features}
                    setProject={setProject}
                    projectId={project.id}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Project;
