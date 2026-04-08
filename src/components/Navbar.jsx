import {
  Box,
  Flex,
  Heading,
  Button,
  Container,
  Menu,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { LuUser, LuLogOut, LuMenu, LuWallet, LuUsers } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "./ConfirmationModal";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const NavButton = ({ icon, children, onClick, color, ...props }) => (
  <MotionButton
    variant="ghost"
    size="sm"
    onClick={onClick}
    display="flex"
    alignItems="center"
    gap={2}
    fontWeight="medium"
    color={color || "gray.600"}
    _hover={{
      bg: "blue.50",
      color: "blue.600",
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    {...props}
  >
    {icon}
    <Text>{children}</Text>
  </MotionButton>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token"),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [canOpenModal, setCanOpenModal] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));
    // Explicitly reset modal states on every route change
    setIsOpen(false);
    setCanOpenModal(false);
  }, [location]);

  // Prevent accidental modal triggers immediately after mount/navigation
  useEffect(() => {
    if (isAuthenticated && location.pathname !== "/") {
      const timer = setTimeout(() => {
        setCanOpenModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, location.pathname]);

  const onOpen = (e) => {
    if (canOpenModal) {
      setIsOpen(true);
    }
  };
  const onClose = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/");
    }
  };

  if (!isAuthenticated || location.pathname === "/") return null;

  return (
    <Box
      bg="rgba(255, 255, 255, 0.7)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
      py={3}
      position="sticky"
      top={0}
      zIndex={100}
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.05)"
    >
      <Container maxW="8xl">
        <Flex justify="space-between" align="center">
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heading
                size="md"
                display="flex"
                alignItems="center"
                gap={2}
                bgGradient="to-r"
                gradientFrom="blue.600"
                gradientTo="cyan.500"
                bgClip="text"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Bylive Holidays
              </Heading>
            </motion.div>
          </Link>

          <HStack gap={2} display={{ base: "none", lg: "flex" }}>
            <NavButton
              icon={<LuUser />}
              onClick={() => navigate("/profile")}
              fontWeight="bold"
            >
              Profile
            </NavButton>
            <NavButton
              icon={<LuWallet />}
              onClick={() => navigate("/wallet")}
              fontWeight="bold"
            >
              Wallet
            </NavButton>
            <NavButton
              icon={<LuUsers />}
              onClick={() => navigate("/downlines")}
              fontWeight="bold"
            >
              Downlines
            </NavButton>
            <Box w="1px" h="20px" bg="gray.200" mx={2} />
            <NavButton
              icon={<LuLogOut />}
              onClick={(e) => onOpen(e)}
              color="red.600"
              _hover={{ bg: "red.50", color: "red.700" }}
              fontWeight="bold"
            >
              Logout
            </NavButton>
          </HStack>

          {/* Mobile Menu */}
          <Box display={{ base: "block", lg: "none" }}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  variant="ghost"
                  aria-label="Menu"
                  size="sm"
                  _hover={{ bg: "blue.50" }}
                >
                  <LuMenu size={20} />
                </IconButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  boxShadow="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  p={2}
                  minW="200px"
                >
                  <Menu.Item
                    value="profile"
                    onClick={() => navigate("/profile")}
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{ bg: "blue.50", color: "blue.600" }}
                    p={3}
                  >
                    <Flex align="center" gap={3}>
                      <LuUser size={18} />
                      <Text fontWeight="medium">Profile</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="wallet"
                    onClick={() => navigate("/wallet")}
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{ bg: "blue.50", color: "blue.600" }}
                    p={3}
                  >
                    <Flex align="center" gap={3}>
                      <LuWallet size={18} />
                      <Text fontWeight="medium">Wallet</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Item
                    value="downlines"
                    onClick={() => navigate("/downlines")}
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{ bg: "blue.50", color: "blue.600" }}
                    p={3}
                  >
                    <Flex align="center" gap={3}>
                      <LuUsers size={18} />
                      <Text fontWeight="medium">Downlines</Text>
                    </Flex>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item
                    value="logout"
                    onClick={(e) => onOpen(e)}
                    color="red.500"
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{ bg: "red.50" }}
                    p={3}
                  >
                    <Flex align="center" gap={3}>
                      <LuLogOut size={18} />
                      <Text fontWeight="medium">Logout</Text>
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
