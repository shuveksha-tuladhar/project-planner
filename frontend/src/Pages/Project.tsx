import { Box, Text } from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router";
import { Project as ProjectType } from "./Projects";

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

const features = [
  {
    name: "Feature A",
    status: "To Do",
    userStoryCount: 10,
    completedUserStories: 0,
  },
  {
    name: "Feature B",
    status: "To Do",
    userStoryCount: 15,
    completedUserStories: 0,
  },
  {
    name: "Feature C",
    status: "In Progress",
    userStoryCount: 8,
    completedUserStories: 2,
  },
  {
    name: "Feature D",
    status: "In Progress",
    userStoryCount: 10,
    completedUserStories: 6,
  },
  {
    name: "Feature E",
    status: "Done!",
    userStoryCount: 12,
    completedUserStories: 12,
  },
  {
    name: "Feature F",
    status: "Done!",
    userStoryCount: 6,
    completedUserStories: 6,
  },
  {
    name: "Feature G",
    status: "Done!",
    userStoryCount: 2,
    completedUserStories: 2,
  },
  {
    name: "Feature H",
    status: "To Do",
    userStoryCount: 3,
    completedUserStories: 0,
  },
  {
    name: "Feature I",
    status: "To Do",
    userStoryCount: 7,
    completedUserStories: 0,
  },
  {
    name: "Feature J",
    status: "To Do",
    userStoryCount: 12,
    completedUserStories: 0,
  },
];

const Project = () => {
  const data = useLoaderData() as ProjectType[];
  const project = data[0];

  console.log("Project", project);
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
            <Box border="1px" flex={1} height="100vh">
              <Text textAlign="center" fontSize={20} mt={2}>
                {column.name}
              </Text>
              {features.map((feature) => {
                  if(column.name === feature.status){
                    return (
                        <Box border="1px" p={4} m={4} display="flex" justifyContent="space-between">
                          <Text>{feature.name}</Text>
                          <Text>
                            {feature.completedUserStories}/{feature.userStoryCount}
                          </Text>
                        </Box>
                      );
                  } else {}
                
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Project;
