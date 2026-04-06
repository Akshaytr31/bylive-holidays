import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

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
      }, 1500);
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
    <Container maxW="md" py={20}>
      <VStack gap={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl">Welcome Back</Heading>
          <Text color="gray.600">Please enter your details to login.</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack gap={6}>
            <Field.Root invalid={!!error}>
              <Field.Label fontWeight="600" mb={1} fontSize="sm">
                User ID
              </Field.Label>
              <Input
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Field.Root>

            <Field.Root invalid={!!error}>
              <Field.Label fontWeight="600" mb={1} fontSize="sm">
                Password
              </Field.Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Field.ErrorText mt={1} color="red.500" fontSize="xs">
                  {error}
                </Field.ErrorText>
              )}
            </Field.Root>

            {success && (
              <Text color="green.500" textAlign="center" fontSize="sm">
                Login successful!
              </Text>
            )}

            <Button
              type="submit"
              loading={loading}
              colorPalette="blue"
              width="full"
              size="lg"
            >
              Log In
            </Button>
          </Stack>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
