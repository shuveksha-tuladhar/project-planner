import * as React from "react";
import { ChakraProvider, Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Input } from "@chakra-ui/react";

function App() {
  const [firstName, setFirstName] = useState("Shuveksha");
  const [lastName, setLastName] = useState("Tuladhar");

  const onChangeFirstName = (event: any) => {
    setFirstName(event.target.value);
  };

  const onChangeLastName = (event: any) => {
    setLastName(event.target.value);
  };

  const handleClick = async () => {
    const response = await axios.post("http://localhost:4000/name", {
      firstName,
      lastName,
    });
    console.log("RESPONSE", response);
  };

  return (
    <ChakraProvider>
      <Box m={10} display="flex" gap={4}>
        <Input
          placeholder="Type in a first name"
          onChange={onChangeFirstName}
        />
        <Input placeholder="Type in a last name" onChange={onChangeLastName} />
        <Button colorScheme="purple" onClick={handleClick}>
          Name
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;
