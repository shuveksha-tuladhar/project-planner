import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const navigate = useNavigate();
    const toast = useToast();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
    const [submitClickedPassword, setSubmitClickedPassword] = useState(false);
    
    const isErrorUsername = username === "" && submitClickedUsername;
    const isErrorPassword = password === "" && submitClickedPassword;

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
        console.log("Username:", username);
        console.log("Password:", password);
        setSubmitClickedUsername(true);
        setSubmitClickedPassword(true);
     
        if (
            username === "" || password === ""
          ) {
            console.log("ERRORS");
          } else {
            axios
              .post("http://localhost:4000/auth/log-in", {
                username,
                password,
              })
              .then((response) => {
                console.log("Response", response.data);
                const token = response.data;
                localStorage.setItem("token", token);
              
      
                setUsername("");
                setPassword("");
                setSubmitClickedUsername(false);
                setSubmitClickedPassword(false);
          
      
                navigate("/projects");
      
                toast({
                  title: 'Account created.',
                  description: `Welcome back, ${username}`,
                  status: 'success',
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
                  title: 'Error',
                  description: " There was an error logging you into your account. Please try again",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              })
      
          };
        };
    return (
        <Box>
      <Text textAlign="center" mb={4} fontSize={20}>
        Log into Your Account
      </Text>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        
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
    )
}


export default LogIn;