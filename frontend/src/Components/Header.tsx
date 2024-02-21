import { Box, Button, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Log In", path: "/log-in", showWhenLoggedIn: false },
  { name: "Sign Up", path: "/sign-up", showWhenLoggedIn: false },
  { name: "Projects", path: "/projects", showWhenLoggedIn: true },
  { name: "Account Details", path: "/profile", showWhenLoggedIn: true },
];

type Props = {
  loggedIn: boolean;
};

const Header = ({ loggedIn }: Props) => {
  return (
    <Box display="flex" border="1px solid" alignItems="center">
      <Box display="flex" gap={4} alignItems="center">
        <Image borderRadius="full" boxSize="100px" src="/logo.svg" alt="logo" />
        <Heading fontSize={30}>Project Planner </Heading>
      </Box>
      <Box gap={4} display="flex" justifyContent="space-around" w="70%">
        {pages.map((page) => {
          if (loggedIn && page.showWhenLoggedIn || !loggedIn && !page.showWhenLoggedIn) {
            return (
              <Link to={page.path} key={page.name}>
                <Button>{page.name}</Button>
              </Link>
            );
          } else {
          return  null;
          }
        })}
      </Box>
    </Box>
  );
};

export default Header;
