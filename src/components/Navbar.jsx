import {
  Box,
  Flex,
  Heading,
  Button,
  Container,
  Menu,
  HStack,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { LuUser, LuLogOut, LuMenu, LuWallet, LuUsers } from "react-icons/lu";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
      <Container maxW="8xl">
        <Flex justify="space-between" align="center">
          <Link to="/dashboard">
            <Heading size="md" color="blue.600" cursor="pointer">
              Bylive Holidays
            </Heading>
          </Link>

          <HStack gap={4} display={{ base: "none", md: "flex" }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
            >
              <LuUser /> Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/wallet")}
            >
              <LuWallet /> Wallet
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/downlines")}
            >
              <LuUsers /> Downlines
            </Button>
            <Button variant="ghost" size="sm" onClick={onOpen} color="red.600">
              <LuLogOut /> Logout
            </Button>
          </HStack>

          <Box display={{ base: "block", md: "none" }}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost" size="sm">
                  <LuMenu size={24} />
                </Button>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="profile"
                    onClick={() => navigate("/profile")}
                  >
                    <Flex align="center" gap={2}>
                      <LuUser /> Profile
                    </Flex>
                  </Menu.Item>
                  <Menu.Item value="wallet" onClick={() => navigate("/wallet")}>
                    <Flex align="center" gap={2}>
                      <LuWallet /> Wallet
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="downlines"
                    onClick={() => navigate("/downlines")}
                  >
                    <Flex align="center" gap={2}>
                      <LuUsers /> Downlines
                    </Flex>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="logout" onClick={onOpen} color="red.500">
                    <Flex align="center" gap={2}>
                      <LuLogOut /> Logout
                    </Flex>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </Box>
          <ConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleLogout}
            title="Logout"
            description="Are you sure you want to logout?"
            confirmText="Logout"
            cancelText="Cancel"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
