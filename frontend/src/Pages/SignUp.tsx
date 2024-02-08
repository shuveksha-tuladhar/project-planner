import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorName = name === "" && submitClickedName;
  const isErrorEmail = email === "" && submitClickedEmail;
  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = password === "" && submitClickedPassword;

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

  const onSubmit = () => {
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Username:", username);
    // console.log("Password:", password);
    setSubmitClickedName(true);
    setSubmitClickedEmail(true);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (name === "" || email === "" || username=== "" || password === ""){
        console.log("ERRORS")
    } else {
    axios
      .post("http://localhost:4000/auth/sign-up", {
        name,
        email,
        username,
        password,
      })
      .then((response) => {
        console.log("RESPONSE", response);
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setSubmitClickedName(false);
        setSubmitClickedEmail(false);
        setSubmitClickedUsername(false);
        setSubmitClickedPassword(false);
      });
    };
  };

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20}>
        Create an Account
      </Text>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={onChangeName} />
          {!isErrorName ? null : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" value={email} onChange={onChangeEmail} />
          {!isErrorEmail ? null : (
            <FormErrorMessage>A valid email address is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={onChangeUsername} />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Username is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={onChangePassword} />
          {!isErrorPassword ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <Button w="100%" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
