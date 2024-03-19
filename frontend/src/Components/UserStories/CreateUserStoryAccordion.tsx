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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import axios from "axios";
import { UserStory } from "../Features/FeatureModal";
import { useNavigate } from "react-router";

type Props = {
  userStories: UserStory[];
  setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
  featureId: number;
};

const CreateUsesrStoryAccordion = ({
  userStories: userStories,
  setUserStories,
  featureId,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickedName(true);
    if (name !== "") {
      setIsOpen(false);

      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:4000/auth/create-user-story",
          {
            name,
            description,
            featureId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setUserStories(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your feature has been created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          
          //add error handling if error is token expired
          if (error.response.data.message === "Unauthorized") {
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
                "There was an error creating your feature. Please try again.",
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
      <AccordionItem border="1px solid">
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
                  Add a user story
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} border="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>User Story Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    User Story Name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>User Story Description:</FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>

              <Button w="100%" onClick={onSubmit}>
                Create User Story
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateUsesrStoryAccordion;
