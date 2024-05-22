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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { Project } from "../../Pages/Projects";

type Props = {
  featureId: number;
  projectId: number;
  userStoryId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const CreateTaskAccordion = ({
  projectId,
  featureId,
  userStoryId,
  setProject
}: Props) => {

  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
 
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickedName(true);
    if (name !== "") {
      setIsOpen(false);

      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:4000/auth/create-task",
          {
            name,
            projectId,
            featureId,
            userStoryId
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setProject(response.data)
          setName("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your task has been created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log("Error", error)
          //add error handling if error is token expired
          if (error.response.data?.message === "Unauthorized") {
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
                "There was an error creating your developer task. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <Accordion allowToggle index={isOpen ? 0 : 1}>
      <AccordionItem borderTop="1px solid">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton onClick={() => setIsOpen(!isOpen)} h="58 px">
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box as="span" flex="1" textAlign="left" m={3}>
                  Add a task
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} border="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Task Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    Developer Task Name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button w="100%" onClick={onSubmit}>
                Create Task
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateTaskAccordion;
function setTasks(data: any) {
  throw new Error("Function not implemented.");
}

