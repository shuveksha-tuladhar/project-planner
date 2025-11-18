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
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Feature } from "../../Pages/Project";
import { useNavigate } from "react-router";
import { Project } from "../../Pages/Projects";
import { FiPlus } from "react-icons/fi";

type Props = {
    features: Feature[],
    setProject: React.Dispatch<React.SetStateAction<Project>>
    projectId: number;
}

const CreateFeatureModal = ({features, setProject, projectId}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (name !== ""){
      setIsLoading(true);
      const token = localStorage.getItem("token");

      axios.post(
        `${process.env.REACT_APP_API_URL}/auth/create-feature`,
        {
          name,
          description,
          projectId
        }, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);
          onClose();

          toast({
            title: "Feature Created!",
            description: "Your feature has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }).catch((error) => {
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
                "There was an error creating your feature. Please try again.",
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
  }

  return (
    <>
      <Button
        w="100%"
        variant="ghost"
        justifyContent="flex-start"
        leftIcon={<Icon as={FiPlus} />}
        onClick={onOpen}
        color="gray.600"
        _hover={{
          bg: "gray.100",
          color: "gray.800",
        }}
        size="md"
        fontWeight="normal"
      >
        Add a feature
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader fontWeight="bold">Create New Feature</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel fontWeight="semibold">Feature Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={onChangeName}
                  placeholder="Enter feature name"
                  size="lg"
                  focusBorderColor="brand.500"
                  autoFocus
                />
                {isErrorName && (
                  <FormErrorMessage>Feature name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="semibold">Description (Optional)</FormLabel>
                <Textarea
                  value={description}
                  onChange={onChangeDescription}
                  placeholder="Describe what this feature does..."
                  size="lg"
                  rows={4}
                  focusBorderColor="brand.500"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme="brand"
                onClick={onSubmit}
                isLoading={isLoading}
                loadingText="Creating..."
                leftIcon={<Icon as={FiPlus} />}
              >
                Create Feature
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFeatureModal;
