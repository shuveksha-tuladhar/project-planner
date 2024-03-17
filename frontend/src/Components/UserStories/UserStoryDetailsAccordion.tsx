import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

type Props = {
  name: string;
  description: string;
  status: string;
};

const UserStoryDetailsAccordion = ({ name, description, status }: Props) => {
  return (
    <Accordion allowToggle >
      <AccordionItem border="1px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">{name} </Text>
            <Text>{status}</Text>

            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel borderTop="1px">{description}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryDetailsAccordion;
