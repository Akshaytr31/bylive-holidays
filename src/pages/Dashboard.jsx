import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Clipboard,
  HStack,
  Skeleton,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  LuCheck,
  LuCopy,
  LuRocket,
  LuSettings,
  LuTarget,
  LuGlobe,
  LuUserPlus,
} from "react-icons/lu";
import HeroSlider from "../components/HeroSlider";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const Dashboard = () => {
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const data = await authService.getReferralLink();
        setReferralLink(data.referral_link || "No link available");
      } catch (error) {
        console.error("Failed to fetch referral link:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, []);

  return (
    <Box width="full">
      {/* Hero Section */}
      <HeroSlider />

      <Container maxW="8xl" px={10} pt={10} pb={20}>
        <Stack gap={20}>
          {/* Intro Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            width="full"
            margin={0}
            padding={0}
          >
            <Heading
              size="2xl"
              mt={20}
              mb={6}
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Next-Generation Travel Technology
            </Heading>
            <Text fontSize="xl" color="gray.600" lineHeight="tall">
              We are a next-generation Online Travel Agency (OTA) built to
              redefine the travel ecosystem through AI-driven innovation and
              automation.
            </Text>
          </MotionBox>

          {/* Features Grid */}
          {/* Features alternating Section */}
          <Stack gap={24}>
            {/* Row 1: Intelligent Integration */}
            <Stack
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 10, lg: 20 }}
              align="center"
            >
              <MotionBox
                flex={1}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/intelligent_integration.png"
                  alt="Intelligent Integration"
                  borderRadius="6px"
                  shadow="2xl"
                  w="full"
                  h={{ base: "300px", md: "450px" }}
                  objectFit="cover"
                />
              </MotionBox>
              <MotionBox
                flex={1}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  bg="blue.600"
                  w="60px"
                  h="60px"
                  borderRadius="2xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={6}
                >
                  <LuRocket size={30} color="white" />
                </Box>
                <Heading
                  size="2xl"
                  mb={6}
                  fontWeight="extrabold"
                  letterSpacing="tight"
                >
                  Intelligent Integration
                </Heading>
                <Text fontSize="xl" color="gray.600" lineHeight="relaxed">
                  Our platform integrates intelligent CRM systems with a
                  seamless booking engine, enabling travel businesses to operate
                  smarter, faster, and more efficiently. By automating key
                  processes and enhancing customer engagement, we unlock higher
                  conversions and scalable growth.
                </Text>
              </MotionBox>
            </Stack>

            {/* Row 2: Niche Focus */}
            <Stack
              direction={{ base: "column", lg: "row-reverse" }}
              gap={{ base: 10, lg: 20 }}
              align="center"
            >
              <MotionBox
                flex={1}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/niche_focus.png"
                  alt="Niche Focus"
                  borderRadius="6px"
                  shadow="2xl"
                  w="full"
                  h={{ base: "300px", md: "450px" }}
                  objectFit="cover"
                />
              </MotionBox>
              <MotionBox
                flex={1}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  bg="purple.600"
                  w="60px"
                  h="60px"
                  borderRadius="2xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={6}
                >
                  <LuTarget size={30} color="white" />
                </Box>
                <Heading
                  size="2xl"
                  mb={6}
                  fontWeight="extrabold"
                  letterSpacing="tight"
                >
                  Niche Focus
                </Heading>
                <Text fontSize="xl" color="gray.600" lineHeight="relaxed">
                  We focus on a niche segment within the travel and tourism
                  industry, delivering targeted solutions that solve real
                  operational challenges and create measurable value.
                </Text>
              </MotionBox>
            </Stack>
          </Stack>

          {/* Experience Section */}
          {/* Experience Section - Redesigned to Premium Atmospheric */}
          <Box
            position="relative"
            h={{ base: "auto", md: "500px" }}
            borderRadius="6px"
            overflow="hidden"
            shadow="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Background Image with Zoom Animation */}
            <MotionBox
              initial={{ scale: 1.2, rotate: 2 }}
              animate={{ rotate: -2, scale: 1.3 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              zIndex={0}
              bgImage="url('/images/animate.jpg')"
              bgSize="cover"
              bgPos="center"
            />

            {/* Premium Gradient Overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, blackAlpha.400, blackAlpha.800)"
              zIndex={1}
            />

            {/* Content Container */}
            <Container
              maxW="4xl"
              position="relative"
              zIndex={2}
              px={10}
              py={20}
            >
              <Stack gap={10} align="center" textAlign="center">
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Box
                    p={6}
                    bg="whiteAlpha.100"
                    backdropFilter="blur(12px)"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    boxShadow="0 0 30px rgba(59, 130, 246, 0.4)"
                  >
                    <LuGlobe size={50} color="#60A5FA" />
                  </Box>
                </MotionBox>

                <Stack gap={6}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Heading
                      size={{ base: "3xl", md: "4xl" }}
                      fontWeight="black"
                      color="white"
                      letterSpacing="tighter"
                      textShadow="0 4px 12px rgba(0,0,0,0.5)"
                    >
                      Seamless Global Experiences
                    </Heading>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      color="whiteAlpha.900"
                      lineHeight="relaxed"
                      maxW="3xl"
                      fontWeight="medium"
                      textShadow="0 2px 8px rgba(0,0,0,0.5)"
                    >
                      By bridging travelers and service providers through a
                      unified digital platform, we ensure a frictionless,
                      reliable, and personalized booking journey across the
                      entire globe.
                    </Text>
                  </MotionBox>
                </Stack>
              </Stack>
            </Container>
          </Box>

          {/* Vision Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            textAlign="center"
            py={10}
          >
            <LuSettings
              size={40}
              color="#D1D5DB"
              style={{ margin: "0 auto 24px" }}
            />
            <Heading
              size="sm"
              mb={4}
              color="blue.600"
              letterSpacing="widest"
              textTransform="uppercase"
              fontWeight="black"
            >
              Our Vision
            </Heading>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              maxW="4xl"
              mx="auto"
              color="gray.800"
              fontStyle="italic"
              lineHeight="shorter"
            >
              "To lead the digital transformation of travel by building a
              scalable, tech-first ecosystem that adapts to the evolving needs
              of modern travelers and businesses."
            </Text>
          </MotionBox>

          {/* Referral Section (Preserved Functionality) */}
          {/* Referral Section - Redesigned to Premium Glassmorphic */}
          <Box
            position="relative"
            p={{ base: 8, md: 14 }}
            bg="gray.950"
            borderRadius="10px"
            overflow="hidden"
            shadow="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            {/* Background Glow */}
            <Box
              position="absolute"
              bottom="-10%"
              right="-5%"
              w="300px"
              h="300px"
              bg="blue.600"
              filter="blur(100px)"
              opacity="0.2"
              zIndex={0}
            />

            <Stack
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align="center"
              gap={12}
              position="relative"
              zIndex={1}
            >
              <Box textAlign={{ base: "center", lg: "left" }}>
                <HStack
                  gap={3}
                  mb={4}
                  justify={{ base: "center", lg: "flex-start" }}
                >
                  <Box bg="blue.600" p={2} borderRadius="lg">
                    <LuUserPlus size={20} color="white" />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="black"
                    color="blue.400"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    Partner Program
                  </Text>
                </HStack>
                <Heading
                  size="2xl"
                  mb={4}
                  fontWeight="black"
                  color="white"
                  letterSpacing="tight"
                >
                  Grow Our{" "}
                  <Box as="span" color="blue.500">
                    Ecosystem
                  </Box>
                </Heading>
                <Text
                  fontSize="lg"
                  color="gray.400"
                  maxW="xl"
                  lineHeight="relaxed"
                >
                  Share your unique referral link and join our mission to
                  redefine the travel landscape through technology.
                </Text>
              </Box>

              <Box w={{ base: "100%", lg: "500px" }}>
                {loading ? (
                  <Skeleton height="70px" width="100%" borderRadius="10px" />
                ) : (
                  <Clipboard.Root value={referralLink}>
                    <HStack
                      justifyContent={"space-between"}
                      gap={0}
                      bg="whiteAlpha.50"
                      backdropFilter="blur(10px)"
                      borderRadius="10px"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      overflow="hidden"
                      transition="all 0.3s"
                      _focusWithin={{
                        borderColor: "blue.500",
                        shadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <Clipboard.Input
                        borderRadius={0}
                        border="none"
                        h="70px"
                        bg="transparent"
                        color="white"
                        fontSize="md"
                        px={8}
                        _focus={{ boxShadow: "none" }}
                      />
                      <Clipboard.Trigger asChild>
                        <Button
                          h="70px"
                          minW={"150px"}
                          px={10}
                          bgGradient="linear(to-r, blue.600, blue.700)"
                          color="white"
                          borderRadius={0}
                          fontSize="lg"
                          fontWeight="bold"
                          _hover={{
                            bgGradient: "linear(to-r, blue.500, blue.600)",
                            shadow: "lg",
                          }}
                          _active={{ transform: "scale(0.98)" }}
                        >
                          <Clipboard.Indicator
                            copied={
                              <Stack gap={1} align="center">
                                <LuCheck size={18} color="blue" />
                                <Text fontSize="sm">Copyed</Text>
                              </Stack>
                            }
                          >
                            <Stack gap={1} align="center">
                              <LuCopy size={18} />
                              <Text fontSize="sm">Copy Link</Text>
                            </Stack>
                          </Clipboard.Indicator>
                        </Button>
                      </Clipboard.Trigger>
                    </HStack>
                  </Clipboard.Root>
                )}
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Dashboard;
