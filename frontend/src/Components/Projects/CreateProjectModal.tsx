import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../../Pages/Projects";
import axios from "axios";
import { useNavigate } from "react-router";
import { FiFolderPlus } from "react-icons/fi";

type Props = {
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    isOpen: boolean,
    onClose: () => void
}

const CreateProjectModal = ({projects, setProjects, isOpen, onClose}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onChangeDescription = (e:any) => {
    setDescription(e.target.value);
  }

  const handleClose = () => {
    setName("");
    setDescription("");
    setSubmitClickedName(false);
    onClose();
  };

  const onSubmit = () => {
    setSubmitClickedName(true);
    
    if (name === "") {
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios.post(
      `${process.env.REACT_APP_API_URL}/auth/create-project`,
      {
        name,
        description, 
      }, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        setProjects(response.data);
        handleClose();

        toast({
          title: "Project Created!",
          description: "Your project has been created successfully.",
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
            description: "There was an error creating your project. Please try again.",
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="gray.200"
            pb={4}
          >
            <Icon as={FiFolderPlus} mr={3} color="brand.500" />
            Create New Project
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody py={6}>
            <VStack spacing={5}>
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel fontWeight="semibold">Project Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={onChangeName}
                  placeholder="Enter project name"
                  size="lg"
                  focusBorderColor="brand.500"
                />
                {isErrorName && (
                  <FormErrorMessage>Project name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="semibold">Project Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={onChangeDescription}
                  placeholder="Enter project description (optional)"
                  size="lg"
                  rows={4}
                  focusBorderColor="brand.500"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter borderTop="1px" borderColor="gray.200" pt={4}>
            <Button
              variant="ghost"
              mr={3}
              onClick={handleClose}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={onSubmit}
              isLoading={isLoading}
              loadingText="Creating..."
              leftIcon={<Icon as={FiFolderPlus} />}
            >
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default CreateProjectModal;
