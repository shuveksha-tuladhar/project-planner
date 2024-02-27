import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../../Pages/Projects";

type Props = {
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>

}

const CreateProjectAccordion = ({projects, setProjects}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [submitClickedName, setSubmitClickedName] = useState(false);
 
  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onChangeDescription = (e:any) => {
    setDescription(e.target.value);
  }

  const onSubmit = () => {
    setSubmitClickedName(true);

    //call create-projects route on API to add project to database

    //on response, update projects state with list of projects returned from API

    setProjects([...projects, {
        name,
        description,
        status: "To Do",
    }])

    setName("");
    setDescription("");
    setSubmitClickedName(false);
  }

  return (
    <Accordion allowMultiple>
      <AccordionItem border="1px solid">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton h="58 px">
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box as="span" flex="1" textAlign="left" m={3}>
                  Add a project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} border="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Project Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>Project Name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Project Description</FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>
              
              <Button w="100%" onClick={onSubmit}>
          Create Project
        </Button>
            
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateProjectAccordion;
