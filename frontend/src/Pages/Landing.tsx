import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FiGrid,
  FiTrello,
  FiCheckCircle,
  FiUsers,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

const Landing = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, brand.500, brand.600)",
    "linear(to-br, brand.600, brand.700)"
  );

  const steps = [
    {
      number: "1",
      title: "Create Projects",
      description: "Set up your projects and define your goals",
    },
    {
      number: "2",
      title: "Add Features & Stories",
      description: "Break down work into manageable user stories",
    },
    {
      number: "3",
      title: "Track Progress",
      description: "Monitor completion and deliver on time",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        color="white"
        py={{ base: 20, md: 32 }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center" maxW="3xl" mx="auto">
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              lineHeight="1.2"
            >
              Plan. Organize. Deliver.
            </Heading>
            <Text fontSize={{ base: "lg", md: "2xl" }} opacity={0.9}>
              The simple project management tool for modern teams.
              <br />
              Keep everyone aligned and moving forward.
            </Text>
            <HStack spacing={4} pt={4}>
              <Link to="/sign-up">
                <Button
                  size="lg"
                  bg="white"
                  color="brand.600"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "xl",
                  }}
                  rightIcon={<Icon as={FiArrowRight} />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/log-in">
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{
                    bg: "whiteAlpha.200",
                    transform: "translateY(-2px)",
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" fontWeight="bold">
                How it works
              </Heading>
              <Text fontSize="xl" color="gray.600" maxW="2xl">
                Get started in three simple steps
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {steps.map((step, index) => (
                <VStack
                  key={index}
                  spacing={4}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="md"
                  border="1px"
                  borderColor="gray.200"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={-4}
                    bg="brand.500"
                    color="white"
                    w={12}
                    h={12}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="xl"
                    boxShadow="md"
                  >
                    {step.number}
                  </Box>
                  <Heading size="md" fontWeight="bold" pt={4}>
                    {step.title}
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    {step.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Box bgGradient={bgGradient} color="white" py={{ base: 8, md: 8 }}>
        <Container maxW="container.xl">
          <VStack spacing={3} textAlign="center">
            <Text fontSize="sm">
              Built by Shuveksha Tuladhar
            </Text>
            <HStack spacing={4}>
              <Button
                as="a"
                href="https://github.com/shuveksha-tuladhar/project-planner"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Icon as={FiGithub} />}
                variant="outline"
                borderColor="whiteAlpha.600"
                color="white"
                size="md"
                _hover={{
                  bg: "whiteAlpha.200",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                }}
              >
                View on GitHub
              </Button>
              <Button
                as="a"
                href="https://www.linkedin.com/in/shuvekshatuladhar"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Icon as={FiLinkedin} />}
                variant="outline"
                borderColor="whiteAlpha.600"
                color="white"
                size="md"
                _hover={{
                  bg: "whiteAlpha.200",
                  borderColor: "white",
                  transform: "translateY(-2px)",
                }}
              >
                Connect on LinkedIn
              </Button>
            <Button
                as="a"
                href="https://shuveksha-tuladhar.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<Icon as={FiArrowRight} />}
                variant="outline"
                borderColor="whiteAlpha.600"
                color="white"
                size="md"
                _hover={{
                    bg: "whiteAlpha.200",
                    borderColor: "white",
                    transform: "translateY(-2px)",
                }}
            >
                Portfolio Website
            </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
