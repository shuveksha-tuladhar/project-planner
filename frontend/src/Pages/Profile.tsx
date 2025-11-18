import { 
  Avatar, 
  Box, 
  Button, 
  Text, 
  useToast,
  Container,
  VStack,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";
import UserDetailsRow from "../Components/Profile/UserDetailsRow";
import { useState } from "react";
import axios from "axios";
import { FiLogOut, FiTrash2 } from "react-icons/fi";


export type Data = {
    projects(projects: any): [any, any];
    user: Data;
    name: string,
    email: string,
    username: string,
    password: string
}
const Profile = () => {
    const loaderData = useLoaderData() as Data;
    const [data, setData] = useState(loaderData);
    const navigate = useNavigate();
    const toast = useToast();
    const context = useOutletContext() as Context;

   const handleLogoutClick = () => {
        localStorage.removeItem("token");
        context.toggleLoggedIn();
        navigate("/log-in")
        toast({
            title: 'Logged Out',
            description: "You have been logged out successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
   }

   const deleteAccount = () => {
        const token = localStorage.getItem("token")
        axios.post(
            `${process.env.REACT_APP_API_URL}/auth/delete-user`, 
            {},
            {headers: {Authorization: `Bearer ${token}`} } 
        ).then ((response) => {
            localStorage.removeItem("token");
            navigate("/sign-up")
            toast({
                title: 'Account Deleted',
                description: "Your account has been deleted successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }).catch ((error) => {
            toast({
                title: "Error",
                description:
                  "Unable to delete your account. Please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            
        })
   }

    return (
        <Box bg="gray.50" minH="100vh" py={8}>
          <Container maxW="container.lg">
            <VStack spacing={8} align="stretch">
              {/* Header */}
              <VStack spacing={3}>
                <Heading size="xl" fontWeight="bold">
                  Account Details
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Welcome, {data.name}! Manage your account settings here
                </Text>
              </VStack>

              {/* Profile Card */}
              <Box
                bg="white"
                p={8}
                borderRadius="2xl"
                boxShadow="md"
                border="1px"
                borderColor="gray.200"
              >
                <VStack spacing={8}>
                  <HStack spacing={8} w="100%" align="start">
                    <Box>
                      <Avatar 
                        size='2xl' 
                        name={data.name} 
                        bg='brand.500'
                        color="white"
                        fontWeight="bold"
                      />
                    </Box>
                    <VStack flex={1} spacing={4} align="stretch">
                      <UserDetailsRow field="Name" value={data.name} username={data.username} setData={setData}/>
                      <UserDetailsRow field="Email" value={data.email} username={data.username} setData={setData}/>
                      <UserDetailsRow field="Username" value={data.username} username={data.username} setData={setData}/>
                      <UserDetailsRow field="Password" value="***********" username={data.username} setData={setData}/>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>

              {/* Actions */}
              <HStack spacing={4} justify="center">
                <Button
                  leftIcon={<Icon as={FiLogOut} />}
                  onClick={handleLogoutClick}
                  colorScheme="gray"
                  size="lg"
                  variant="outline"
                >
                  Log Out
                </Button>
                <Button
                  leftIcon={<Icon as={FiTrash2} />}
                  onClick={deleteAccount}
                  colorScheme="red"
                  size="lg"
                  variant="outline"
                >
                  Delete Account
                </Button>
              </HStack>
            </VStack>
          </Container>
        </Box>
    )
}

export default Profile;