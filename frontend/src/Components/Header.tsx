import {
  Box,
  Button,
  Heading,
  Container,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiUser, FiLogIn, FiUserPlus } from "react-icons/fi";

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
};

const Header = ({ loggedIn }: Props) => {
  const location = useLocation();

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
          <HStack spacing={4}>
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
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
