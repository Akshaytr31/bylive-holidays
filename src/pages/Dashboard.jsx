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

      <Container maxW="6xl" pt={10} pb={20}>
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
          <Box
            bg="gray.900"
            color="white"
            p={{ base: 12, md: 24 }}
            borderRadius="4xl"
            textAlign="center"
            position="relative"
            overflow="hidden"
            shadow="2xl"
          >
            {/* Decorative background glow */}
            <Box
              position="absolute"
              top="-20%"
              right="-10%"
              w="400px"
              h="400px"
              bg="blue.500"
              filter="blur(120px)"
              opacity="0.3"
            />
            <Box
              position="absolute"
              bottom="-20%"
              left="-10%"
              w="400px"
              h="400px"
              bg="purple.500"
              filter="blur(120px)"
              opacity="0.2"
            />

            <Stack gap={8} position="relative" zIndex={1} align="center">
              <LuGlobe size={60} color="#60A5FA" />
              <Heading size="2xl" fontWeight="bold">
                Seamless Experiences
              </Heading>
              <Text
                fontSize="xl"
                color="gray.300"
                maxW="3xl"
                mx="auto"
                lineHeight="relaxed"
              >
                By bridging travelers and service providers through a unified
                digital platform, we ensure a frictionless, reliable, and
                personalized booking experience.
              </Text>
            </Stack>
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
          <Box
            p={10}
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="3xl"
            shadow="xl"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              h: "4px",
              bg: "blue.500",
              borderTopRadius: "3xl",
            }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              align="center"
              gap={10}
            >
              <Box textAlign={{ base: "center", lg: "left" }}>
                <Heading size="xl" mb={3} fontWeight="extrabold">
                  Grow Our Ecosystem
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Share your unique referral link and join our mission to
                  redefine travel.
                </Text>
              </Box>

              <Box w={{ base: "100%", lg: "450px" }}>
                {loading ? (
                  <Skeleton height="60px" width="100%" borderRadius="xl" />
                ) : (
                  <Clipboard.Root value={referralLink}>
                    <HStack
                      gap={0}
                      shadow="md"
                      borderRadius="xl"
                      overflow="hidden"
                    >
                      <Clipboard.Input
                        borderRadius={0}
                        border="none"
                        h="60px"
                        bg="gray.50"
                        fontSize="md"
                        px={6}
                        _focus={{ bg: "white", boxShadow: "none" }}
                      />
                      <Clipboard.Trigger asChild>
                        <Button
                          colorPalette="blue"
                          h="60px"
                          borderRadius={0}
                          px={10}
                          fontSize="lg"
                          fontWeight="bold"
                        >
                          <Clipboard.Indicator copied={<LuCheck />}>
                            <HStack gap={2}>
                              <LuCopy />
                              <Text>Copy Link</Text>
                            </HStack>
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
