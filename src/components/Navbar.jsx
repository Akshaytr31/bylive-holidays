import { Box, Flex, Heading, Button, Container, Menu } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { LuUser, LuLogOut, LuMenu } from "react-icons/lu";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API fails, clear local storage and redirect
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="4xl">
        <Flex justify="space-between" align="center">
          <Link to="/dashboard">
            <Heading size="md" color="blue.600" cursor="pointer">
              Bylive Holidays
            </Heading>
          </Link>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" size="sm">
                <LuMenu size={24} />
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile" onClick={() => navigate("/profile")}>
                  <Flex align="center" gap={2}>
                    <LuUser /> Profile
                  </Flex>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item
                  value="logout"
                  onClick={handleLogout}
                  color="red.500"
                >
                  <Flex align="center" gap={2}>
                    <LuLogOut /> Logout
                  </Flex>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
