import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import TaskBox from "../Tasks/TaskBox";
import { useState } from "react";

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
  id: number;
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

  const [storyStatus, setStoryStatus] = useState(status)

   return (
    <Accordion allowToggle>
      <AccordionItem border="1px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">
              {name}{" "}
            </Text>
            <Text>{storyStatus}</Text>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel borderTop="1px" p={0}>
          <Box p={4}>{description}</Box>
          {tasks.map((task) => {
            return (
              <TaskBox key={task.id} task={task} setStoryStatus={setStoryStatus}/>
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
