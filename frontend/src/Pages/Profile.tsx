import { Box, Button, Text, useToast } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";

const Profile = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    console.log("CONTEXT:", context)

   const handleLogoutClick = () => {
        localStorage.removeItem("token");
        context.toggleLoggedIn();
        navigate("/log-in")
        toast({
            title: 'Success',
            description: "You have been logged out of your account",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
   }

    return (
        <Box>
            <Text textAlign="center" mb={4} fontSize={20}> Account Details </Text>
            <Button onClick={handleLogoutClick}>Log Out</Button>
        </Box>
    )
}

export default Profile;