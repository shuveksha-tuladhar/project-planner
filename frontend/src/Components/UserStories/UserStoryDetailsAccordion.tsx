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

type Props = {
  name: string;
  description: string;
  status: string;
};

const sampleDevTasks = [
  {
    name: "Developer Task 1",
    status: "To do",
  },
  {
    name: "Developer Task 2",
    status: "To do",
  },
  {
    name: "Developer Task 3",
    status: "To do",
  },
  {
    name: "Developer Task 4",
    status: "To do",
  },
  {
    name: "Developer Task 5",
    status: "To do",
  },
];
const UserStoryDetailsAccordion = ({ name, description, status }: Props) => {
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
          {sampleDevTasks.map((task) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                borderTop="1px"
                alignItems="center"
                px={4}
                py={2}
              >
                <Text p={4}>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryDetailsAccordion;
