import * as React from "react";
import { ChakraProvider, Box} from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Components/Header";
import theme from "./theme";

type Data = {
  name: string;
  email: string;
  username: string;
};

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
}

function App() {
  const data = useLoaderData() as Data | undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  }

  const context: Context = {
    loggedIn,
    toggleLoggedIn,

  }
  console.log("LoggedIn:", loggedIn)
  
  return (
    <ChakraProvider theme={theme}>
      <Header loggedIn={loggedIn} toggleLoggedIn={toggleLoggedIn}/>
      <Outlet context={context}/>
      <Box > 
        
      </Box>
    </ChakraProvider>
  );
}

export default App;
