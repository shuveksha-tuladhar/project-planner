import {
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../Pages/SignUp";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
const ForgotPasswordModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const saveEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const submitEmail = () => {
    console.log("Email", email);
    const invalidEmail = isInvalidEmail(email);
    if (invalidEmail) {
      toast({
        title: "Error",
        description: `Please enter a valid email address`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
          email,
        })
        .then((response) => {
          setEmail("");
          console.log("Response:", response.data);
          toast({
            title: "Success",
            description: "Check your email account for further direction",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          if (error.response.data.message === "Email not found") {
            toast({
              title: "Success",
              description: "Check your email account for further direction",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error",
              description: error.response.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text mb={4}>
              Enter the email address associated with your account:
            </Text>
            <Input type="text" onChange={saveEmail}></Input>
          </Box>
        </ModalBody>

        <Button mx={6} mb={4} mt={2} onClick={submitEmail}>
          Send Verification Email
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
