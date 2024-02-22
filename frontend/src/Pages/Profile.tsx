import { Avatar, Box, Button, IconButton, Text, useToast } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";
import {EditIcon} from "@chakra-ui/icons";
import UserDetailsRow from "../Components/Profile/UserDetailsRow";


type Data = {
    name: string,
    email: string,
    username: string,
    password: string
}
const Profile = () => {
    const data = useLoaderData() as Data;
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

    console.log("CONTEXT:", context)
    console.log("Data:", data);

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
            <Text textAlign="center">Welcome, {data.name}! You can manage your account details here!</Text>
            <Box display="flex" w='60%' gap={10} m="0 auto" py={20}>
                <Box display='flex' alignItems='center'>
                <Avatar size='2xl' name={data.name} bg='teal.500' />
                </Box>
                <Box w='100%' display='flex' flexDirection='column' gap={4} >
                    <UserDetailsRow field="Name" value={data.name}/>
                    <UserDetailsRow field="Email Address" value={data.email}/>
                    <UserDetailsRow field="Username" value={data.username}/>
                    <UserDetailsRow field="Password" value="***********"/>
                </Box>
            </Box>
            <Box display='flex' gap={4} justifyContent='center' >
                <Button onClick={handleLogoutClick}>Log Out</Button>
                <Button onClick={()=> {}}>Delete Account</Button>
            </Box>
            
        </Box>
    )
}

export default Profile;