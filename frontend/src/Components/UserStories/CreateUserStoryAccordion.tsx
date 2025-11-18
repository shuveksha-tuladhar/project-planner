import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  useToast,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Project } from "../../Pages/Projects";
import { FiPlus, FiX } from "react-icons/fi";

type Props = {
  // userStories: UserStory[];
  // setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
  featureId: number;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const CreateUsesrStoryAccordion = ({
  projectId,
  featureId,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setSubmitClickedName(false);
    setIsOpen(false);
  };

  const onSubmit = () => {
    setSubmitClickedName(true);
    if (name !== "") {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/create-user-story`,
          {
            name,
            description,
            projectId,
            featureId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);
          setIsOpen(false);

          toast({
            title: "User Story Created!",
            description: "Your user story has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          if (error.response?.data?.message === "Unauthorized") {
            toast({
              title: "Session Expired",
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
                "There was an error creating your user story. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (!isOpen) {
    return (
      <Button
        w="100%"
        variant="ghost"
        justifyContent="flex-start"
        leftIcon={<Icon as={FiPlus} />}
        onClick={() => setIsOpen(true)}
        color="gray.600"
        size="md"
        _hover={{
          bg: "gray.100",
          color: "gray.800",
        }}
        fontWeight="normal"
      >
        Add a user story
      </Button>
    );
  }

  return (
    <VStack spacing={3} align="stretch">
      <FormControl isInvalid={isErrorName} isRequired>
        <Input
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="Enter user story name..."
          size="md"
          autoFocus
          focusBorderColor="brand.500"
        />
        {isErrorName && (
          <FormErrorMessage fontSize="sm">
            User story name is required.
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl>
        <Textarea
          value={description}
          onChange={onChangeDescription}
          placeholder="Add a description (optional)..."
          size="md"
          rows={3}
          focusBorderColor="brand.500"
        />
      </FormControl>

      <HStack spacing={2} justify="flex-start">
        <Button
          size="md"
          colorScheme="brand"
          onClick={onSubmit}
          isLoading={isLoading}
          loadingText="Creating..."
          leftIcon={<Icon as={FiPlus} />}
        >
          Add User Story
        </Button>
        <Button
          size="md"
          variant="ghost"
          onClick={handleCancel}
          leftIcon={<Icon as={FiX} />}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};

export default CreateUsesrStoryAccordion;
