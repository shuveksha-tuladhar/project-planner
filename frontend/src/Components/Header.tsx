import {
  Box,
  Button,
  Heading,
  Container,
  HStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGrid, FiUser, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";

const pages = [
  { name: "Log In", path: "/log-in", showWhenLoggedIn: false, icon: FiLogIn },
  {
    name: "Sign Up",
    path: "/sign-up",
    showWhenLoggedIn: false,
    icon: FiUserPlus,
  },
  { name: "Projects", path: "/projects", showWhenLoggedIn: true, icon: FiGrid },
  { name: "Profile", path: "/profile", showWhenLoggedIn: true, icon: FiUser },
];

type Props = {
  loggedIn: boolean;
  toggleLoggedIn?: () => void;
};

const Header = ({ loggedIn, toggleLoggedIn }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    if (toggleLoggedIn) {
      toggleLoggedIn();
    }
    navigate("/log-in");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="white"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Container maxW="container.xl" py={4}>
        <HStack justify="space-between" align="center">
          <Link to="/">
            <HStack spacing={4} cursor="pointer">
              <Box
                bg="brand.500"
                p={2}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiGrid} color="white" boxSize={6} />
              </Box>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, brand.500, brand.600)"
                bgClip="text"
              >
                Project Planner
              </Heading>
            </HStack>
          </Link>
          <HStack spacing={3}>
            {pages.map((page) => {
              if (
                (loggedIn && page.showWhenLoggedIn) ||
                (!loggedIn && !page.showWhenLoggedIn)
              ) {
                const isActive = location.pathname === page.path;
                return (
                  <Link to={page.path} key={page.name}>
                    <Button
                      leftIcon={<Icon as={page.icon} />}
                      variant={isActive ? "solid" : "ghost"}
                      colorScheme={isActive ? "brand" : "gray"}
                      size={{ base: "sm", md: "md" }}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                );
              } else {
                return null;
              }
            })}
            {loggedIn && (
              <Button
                leftIcon={<Icon as={FiLogOut} />}
                variant="ghost"
                size={{ base: "sm", md: "md" }}
                onClick={handleLogoutClick}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
              >
                Log Out
              </Button>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
