import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { useState } from "react";
import { Project } from "../../Pages/Projects";

type Props = {
  name: string;
  description: string;
  status: string;
  featureId: number;
  projectId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type Task = {
  name: string;
  status: string;
};

const UserStoryDetailsAccordion = ({
  name,
  description,
  status,
  projectId,
  featureId,
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  // const [devTasks, setDevTasks] = useState(tasks)
  return (
    <Accordion allowToggle>
      <AccordionItem border="1px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">
              {name}{" "}
            </Text>
            <Text>{status}</Text>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel borderTop="1px" p={0}>
          <Box p={4}>{description}</Box>
          {tasks.map((task) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                borderTop="1px"
                alignItems="center"
                px={4}
                py={2}
                key={task.name}
              >
                <Text p={4}>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
            );
          })}
          <CreateTaskAccordion
            featureId={featureId}
            projectId={projectId}
            userStoryId={userStoryId}
            setProject={setProject}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryDetailsAccordion;
