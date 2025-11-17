import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Heading,
  Container,
  Link as ChakraLink,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { Context } from "../App";
import ForgotPasswordModal from "../Components/Login/ForgotPasswordModal";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = password === "" && submitClickedPassword;

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false);
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false);
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (username === "" || password === "") {
      console.log("ERRORS");
    } else {
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/log-in`, {
          username,
          password,
        })
        .then((response) => {
          console.log("Response", response.data);
          const token = response.data;

          context.toggleLoggedIn();
          localStorage.setItem("token", token);

          setUsername("");
          setPassword("");
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          navigate("/projects");

          toast({
            title: "Welcome back!",
            description: `Successfully logged in as ${username}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setUsername("");
          setPassword("");

          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          toast({
            title: "Login Failed",
            description:
              "Invalid username or password. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          <VStack spacing={2}>
            <Box
              bg="brand.500"
              p={4}
              borderRadius="2xl"
              boxShadow="lg"
            >
              <Icon as={FiLogIn} color="white" boxSize={8} />
            </Box>
            <Heading size="xl" textAlign="center" fontWeight="bold">
              Welcome Back
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="lg">
              Log in to your account to continue
            </Text>
          </VStack>

          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px"
            borderColor="gray.200"
          >
            <VStack spacing={6}>
              <FormControl isInvalid={isErrorUsername} isRequired>
                <FormLabel fontWeight="semibold">Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiUser} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={username}
                    onChange={onChangeUsername}
                    placeholder="Enter your username"
                    size="lg"
                  />
                </InputGroup>
                {isErrorUsername && (
                  <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isErrorPassword} isRequired>
                <FormLabel fontWeight="semibold">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="Enter your password"
                    size="lg"
                  />
                </InputGroup>
                {isErrorPassword && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <Button
                w="100%"
                size="lg"
                colorScheme="brand"
                onClick={onSubmit}
                isLoading={isLoading}
                loadingText="Logging in..."
                leftIcon={<Icon as={FiLogIn} />}
              >
                Log In
              </Button>

              <Box textAlign="center">
                <ChakraLink
                  color="brand.500"
                  fontWeight="semibold"
                  onClick={onOpen}
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot Password?
                </ChakraLink>
              </Box>
            </VStack>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            textAlign="center"
          >
            <Text color="gray.600">
              Don't have an account?{" "}
              <Link to="/sign-up">
                <ChakraLink
                  color="brand.500"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign Up
                </ChakraLink>
              </Link>
            </Text>
          </Box>
        </VStack>

        <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Box>
  );
};

export default LogIn;
