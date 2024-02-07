import * as React from "react"
import {ChakraProvider, Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Input } from '@chakra-ui/react'


function App () {
  const [name, setName] = useState("test name 6");

  const onChange = (event: any) => {
    setName(event.target.value);
  }
  const handleClick = async () => {
    const response = await axios.post("http://localhost:4000/name", {name});
    console.log('RESPONSE', response.data)
 
    }  
    
    return (
    <ChakraProvider> 
  <Flex >
    <Box m={10} display="flex" gap={4}>
      <Input placeholder="Input name" onChange={onChange}/>
    <Button colorScheme="purple" onClick={handleClick}>Add Name</Button>
    </Box>
    
  </Flex>
  </ChakraProvider>
)
}

export default App;
