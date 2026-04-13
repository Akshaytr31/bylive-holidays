import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Flex,
  Image,
  Icon,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionFlex = motion.create(Flex);

const Login = () => {
  const [userId, setUserId] = useState("BHT00010");
  const [password, setPassword] = useState("1234567");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await authService.login(userId, password);
      console.log("Login successful:", data);

      if (data.access) {
        localStorage.setItem("access_token", data.access);
      }
      if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err?.detail ||
          err?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      bg="white"
    >
      {/* Left Side: Premium Gradient & Quote Section */}
      <Flex
        flex="1.2"
        position="relative"
        direction="column"
        justify="center"
        p={{ base: 8, lg: 16 }}
        display={{ base: "none", lg: "flex" }}
        overflow="hidden"
        bg="blue.900"
      >
        {/* Modern Mesh Gradient Background */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          bgGradient="linear(135deg, blue.800 0%, #0a192f 100%)"
        >
          <Box
            position="absolute"
            top="-10%"
            left="-10%"
            w="60%"
            h="60%"
            bg="blue.400"
            filter="blur(120px)"
            opacity="0.15"
            as={motion.create(Box)}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>

        {/* Content Overlay */}
        <VStack align="flex-start" gap={8} zIndex={1} position="relative">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Flex align="center" gap={3}>
              <Box w="32px" h="3px" bg="blue.400" borderRadius="full" />
              <Text
                color="blue.300"
                fontWeight="800"
                letterSpacing="widest"
                textTransform="uppercase"
                fontSize="xs"
              >
                Luxury Travel Partner
              </Text>
            </Flex>
          </MotionBox>

          <VStack align="flex-start" gap={4}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Heading
                fontSize="4xl"
                fontWeight="900"
                color="white"
                lineHeight="1.2"
                letterSpacing="tight"
              >
                "The world is a <br />
                <Text as="span" color="blue.400">
                  book
                </Text>
                , and those <br />
                who do not travel <br />
                read only{" "}
                <Text as="span" color="blue.400">
                  one page.
                </Text>
                "
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <Text
                fontSize="lg"
                color="whiteAlpha.600"
                fontWeight="500"
                fontStyle="italic"
              >
                — Saint Augustine
              </Text>
            </MotionBox>
          </VStack>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            pt={4}
          >
            <VStack align="flex-start" gap={1}>
              <Text color="white" fontWeight="700" fontSize="xl">
                Bylive Holidays
              </Text>
              <Text color="whiteAlpha.500" fontSize="sm">
                Elevating travel experiences since 2024
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Flex>

      {/* Right Side: Login Form Section */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        p={{ base: 6, md: 12 }}
        bg="gray.50"
        position="relative"
      >
        <Container maxW="sm" p={0}>
          <MotionVStack
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            gap={8}
            align="stretch"
          >
            <Box>
              <Heading
                size="2xl"
                color="blue.900"
                mb={2}
                fontWeight="900"
                letterSpacing="tight"
              >
                Welcome Back
              </Heading>
              <Text color="gray.500" fontSize="md" fontWeight="500">
                Securely access your account
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack gap={5}>
                <Field.Root invalid={!!error}>
                  <Field.Label
                    color="gray.700"
                    fontWeight="700"
                    mb={1.5}
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Partner ID
                  </Field.Label>
                  <Input
                    placeholder="Enter ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "blue.200" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    color="gray.800"
                    size="md"
                    h="48px"
                    borderRadius="12px"
                    transition="all 0.2s"
                  />
                </Field.Root>

                <Field.Root invalid={!!error}>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "blue.200" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    color="gray.800"
                    size="md"
                    h="48px"
                    borderRadius="12px"
                    transition="all 0.2s"
                  />
                  <AnimatePresence>
                    {error && (
                      <MotionBox
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Text
                          mt={2}
                          color="red.500"
                          fontSize="xs"
                          fontWeight="600"
                        >
                          {error}
                        </Text>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </Field.Root>

                <Button
                  type="submit"
                  loading={loading}
                  bg="blue.600"
                  color="white"
                  width="full"
                  h="48px"
                  borderRadius="12px"
                  fontSize="md"
                  fontWeight="700"
                  _hover={{
                    bg: "blue.700",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                >
                  Sign In
                </Button>
              </Stack>
            </form>
          </MotionVStack>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Login;
