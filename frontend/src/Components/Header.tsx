import { Box, Button, Heading, Image } from "@chakra-ui/react"; 
import { Link } from "react-router-dom";

const pages = [
  { name: "Log In", path: "/log-in" },
  { name: "Sign Up", path: "/sign-up" },
  { name: "Projects", path: "/projects" },
  { name: "Account Details", path: "/profile" },
];

const Header = () => {
  return (
    <Box display="flex" border="1px solid" alignItems="center">
      <Box display="flex" gap={4} alignItems="center">
        <Image
          borderRadius="full"
          boxSize="100px"
          src="/logo.svg"
          alt="logo"
        />
        <Heading fontSize={30}>Project Planner </Heading>
        </Box>
        <Box gap={4}  display="flex" justifyContent="space-around" w="70%">
        {pages.map((page) => {
          return (
            <Link to={page.path}>
            <Button>{page.name}</Button>
            </Link>
          )
        })}
        </Box>
    </Box>
  );
};

export default Header;
