import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Project } from "../../Pages/Projects";
import { FiPlus, FiX } from "react-icons/fi";

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
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const handleCancel = () => {
    setName("");
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
          `${process.env.REACT_APP_API_URL}/auth/create-task`,
          {
            name,
            projectId,
            featureId,
            userStoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setProject(response.data);
          setName("");
          setSubmitClickedName(false);
          setIsOpen(false);

          toast({
            title: "Task Created!",
            description: "Your task has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log("Error", error);
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
                "There was an error creating your task. Please try again.",
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
        size="sm"
        _hover={{
          bg: "white",
          color: "gray.800",
        }}
        fontWeight="normal"
      >
        Add a task
      </Button>
    );
  }

  return (
    <FormControl isInvalid={isErrorName} isRequired>
      <Input
        type="text"
        value={name}
        onChange={onChangeName}
        placeholder="Enter task name..."
        size="sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
          if (e.key === "Escape") {
            handleCancel();
          }
        }}
        bg="white"
        borderColor="brand.300"
        focusBorderColor="brand.500"
      />
      {isErrorName && (
        <FormErrorMessage fontSize="xs">
          Task name is required.
        </FormErrorMessage>
      )}
      <HStack spacing={2} mt={2}>
        <Button
          size="sm"
          colorScheme="brand"
          onClick={onSubmit}
          isLoading={isLoading}
          loadingText="Creating..."
          leftIcon={<Icon as={FiPlus} />}
        >
          Add Task
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          leftIcon={<Icon as={FiX} />}
        >
          Cancel
        </Button>
      </HStack>
    </FormControl>
  );
};

export default CreateTaskAccordion;
