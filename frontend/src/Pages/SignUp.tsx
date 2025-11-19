import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
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
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";

export const isInvalidEmail = (email: string) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (email.match(emailFormat) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

const isInvalidpass2 = (pass1: string, pass2: string) => {
  if (pass2 !== pass1) {
    return false;
  } else {
    return true;
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);
  const [submitClickedSecondPassword, setSubmitClickedSecondPassword] =
    useState(false);

  const isErrorName = name === "" && submitClickedName;
  const isErrorEmail = isInvalidEmail(email) && submitClickedEmail;
  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = password === "" && submitClickedPassword;
  const isErrorSecondPassword =
    isInvalidpass2(password, secondPassword) && submitClickedSecondPassword;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setSubmitClickedEmail(false);
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const onChangeUsername = (e: any) => {
    setSubmitClickedUsername(false);
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setSubmitClickedPassword(false);
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const onChangeSecondPassword = (e: any) => {
    setSubmitClickedSecondPassword(false);
    console.log(e.target.value);
    setSecondPassword(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setSubmitClickedName(true);
    setSubmitClickedEmail(true);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);
    setSubmitClickedSecondPassword(true);

    if (
      name === "" ||
      isInvalidEmail(email) ||
      username === "" ||
      password === "" ||
      secondPassword === "" ||
      secondPassword !== password
    ) {
      console.log("ERRORS");
      console.log(isErrorSecondPassword);
    } else {
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
          name,
          email,
          username,
          password,
        })
        .then((response) => {
          const token = response.data;
          context.toggleLoggedIn();
          localStorage.setItem("token", token);
        
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setSecondPassword("");
          setSubmitClickedName(false);
          setSubmitClickedEmail(false);
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);
          setSubmitClickedSecondPassword(false);

          navigate("/projects");

          toast({
            title: 'Account created!',
            description: `Welcome, ${username}! Your account has been created successfully.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setSecondPassword("");
          setSubmitClickedName(false);
          setSubmitClickedEmail(false);
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);
          setSubmitClickedSecondPassword(false);

          toast({
            title: 'Signup Failed',
            description: "Unable to create your account. Please try again.",
            status: 'error',
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
              <Icon as={FiUserPlus} color="white" boxSize={8} />
            </Box>
            <Heading size="xl" textAlign="center" fontWeight="bold">
              Create Account
            </Heading>
            <Text color="gray.600" textAlign="center" fontSize="lg">
              Sign up to start managing your projects
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
            <VStack spacing={5}>
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel fontWeight="semibold">Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiUser} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Enter your name"
                    size="lg"
                  />
                </InputGroup>
                {isErrorName && (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isErrorEmail} isRequired>
                <FormLabel fontWeight="semibold">Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiMail} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="Enter your email"
                    size="lg"
                  />
                </InputGroup>
                {isErrorEmail && (
                  <FormErrorMessage>
                    A valid email address is required.
                  </FormErrorMessage>
                )}
              </FormControl>

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
                    placeholder="Choose a username"
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
                    placeholder="Create a password"
                    size="lg"
                  />
                </InputGroup>
                {isErrorPassword && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isErrorSecondPassword} isRequired>
                <FormLabel fontWeight="semibold">Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FiLock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={secondPassword}
                    onChange={onChangeSecondPassword}
                    placeholder="Confirm your password"
                    size="lg"
                  />
                </InputGroup>
                {isErrorSecondPassword && (
                  <FormErrorMessage>Passwords must match.</FormErrorMessage>
                )}
              </FormControl>

              <Button
                w="100%"
                size="lg"
                colorScheme="brand"
                onClick={onSubmit}
                isLoading={isLoading}
                loadingText="Creating account..."
                leftIcon={<Icon as={FiUserPlus} />}
              >
                Sign Up
              </Button>
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
              Already have an account?{" "}
              <Link to="/log-in">
                <ChakraLink
                  color="brand.500"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Log In
                </ChakraLink>
              </Link>
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignUp;
