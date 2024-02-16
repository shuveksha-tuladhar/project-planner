import * as React from "react";
import { ChakraProvider, Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";



function App() {
  
  return (
    <ChakraProvider>
      <Header/>
      <Outlet/>
      <Box >
        
      </Box>
    </ChakraProvider>
  );
}

export default App;
