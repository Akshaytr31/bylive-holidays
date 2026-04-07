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
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

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
      }, 100);
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
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      bg="gray.50"
    >
      {/* Animated Background Gradients */}
      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        w="70%"
        h="70%"
        bgGradient="radial(circle, blue.100 0%, transparent 70%)"
        filter="blur(120px)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        as={motion.div}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <Box
        position="absolute"
        bottom="-20%"
        right="-10%"
        w="70%"
        h="70%"
        bgGradient="radial(circle, blue.50 0%, transparent 70%)"
        filter="blur(120px)"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.8, 0.5, 0.8],
        }}
        as={motion.div}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <Container maxW="md" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          p={{ base: 6, md: 10 }}
          borderRadius="2xl"
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="white"
          boxShadow="0 8px 32px 0 rgba(148, 163, 184, 0.2)"
        >
          <MotionVStack gap={8} align="stretch">
            <Box textAlign="center">
              <Heading
                size="3xl"
                color="blue.600"
                mb={2}
                fontWeight="800"
                letterSpacing="tight"
              >
                Welcome Back
              </Heading>
              <Text color="gray.600" fontSize="lg" fontWeight="500">
                Please enter your details to login
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack gap={6}>
                <Field.Root invalid={!!error}>
                  <Field.Label
                    color="blue.800"
                    fontWeight="600"
                    mb={1}
                    fontSize="sm"
                  >
                    User ID
                  </Field.Label>
                  <Input
                    placeholder="Enter your User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "blue.300" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    color="gray.800"
                    size="lg"
                    borderRadius="xl"
                  />
                </Field.Root>

                <Field.Root invalid={!!error}>
                  <Field.Label
                    color="blue.800"
                    fontWeight="600"
                    mb={1}
                    fontSize="sm"
                  >
                    Password
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: "blue.300" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                    color="gray.800"
                    size="lg"
                    borderRadius="xl"
                  />
                  {error && (
                    <Field.ErrorText mt={1} color="red.500" fontSize="xs">
                      {error}
                    </Field.ErrorText>
                  )}
                </Field.Root>

                <Button
                  type="submit"
                  loading={loading}
                  bg="blue.600"
                  color="white"
                  width="full"
                  size="xl"
                  borderRadius="xl"
                  fontWeight="bold"
                  _hover={{
                    bg: "blue.700",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px -10px rgba(37, 99, 235, 0.3)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                  as={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Log In
                </Button>
              </Stack>
            </form>
          </MotionVStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Login;
