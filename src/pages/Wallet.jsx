import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Skeleton,
  Stack,
  SimpleGrid,
  Flex,
  Icon,
  Separator,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { walletService } from "../services/walletService";
import {
  LuWallet,
  LuTrendingUp,
  LuLayers,
  LuShieldCheck,
} from "react-icons/lu";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

const WalletCard = ({
  title,
  balance,
  icon,
  color,
  delay = 0,
  isLarge = false,
}) => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    bg="rgba(255, 255, 255, 0.7)"
    backdropFilter="blur(24px)"
    p={isLarge ? 12 : 8}
    borderRadius="xl"
    border="1px solid"
    borderColor="whiteAlpha.400"
    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.07)"
    position="relative"
    overflow="hidden"
    h="full"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    _hover={{
      transform: "scale(1.02)",
      shadow: "2xl",
      borderColor: `${color}.200`,
    }}
  >
    <Box
      position="absolute"
      top="-10%"
      left="-5%"
      w={isLarge ? "300px" : "150px"}
      h={isLarge ? "300px" : "150px"}
      bgGradient={`radial(circle, ${color}.50 0%, transparent 70%)`}
      opacity={0.6}
      zIndex={0}
    />

    <VStack
      align="start"
      gap={isLarge ? 8 : 4}
      position="relative"
      zIndex={1}
      h="full"
      justify="space-between"
    >
      <Flex
        w={isLarge ? "16" : "12"}
        h={isLarge ? "16" : "12"}
        bg={`${color}.50`}
        color={`${color}.600`}
        borderRadius="2xl"
        align="center"
        justify="center"
        shadow="sm"
      >
        {icon}
      </Flex>

      <VStack align="start" gap={1}>
        <Text
          fontSize={isLarge ? "sm" : "xs"}
          fontWeight="900"
          color="gray.400"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          {title}
        </Text>
        <Heading
          size={isLarge ? "5xl" : "xl"}
          fontWeight="900"
          color="gray.800"
          letterSpacing="tighter"
        >
          ₹ {balance?.toLocaleString() || "0.00"}
        </Heading>
      </VStack>
    </VStack>
  </MotionBox>
);

const Wallet = () => {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const data = await walletService.getUserWallet();
        setWalletData(data);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <Box h="100vh" display="flex" alignItems="center" bg="gray.50">
        <Container maxW="8xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
            <Skeleton height="500px" borderRadius="xl" />
            <VStack gap={10}>
              <Skeleton height="245px" width="full" borderRadius="xl" />
              <Skeleton height="245px" width="full" borderRadius="xl" />
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.50"
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Background Atmosphere */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="1000px"
        h="1000px"
        bgGradient="radial(circle, blue.50 0%, transparent 70%)"
        filter="blur(140px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        w="800px"
        h="800px"
        bgGradient="radial(circle, purple.50 0%, transparent 70%)"
        filter="blur(120px)"
        zIndex={0}
      />

      <Container
        maxW="8xl"
        flex={1}
        display="flex"
        flexDirection="column"
        gap={8}
        py={5}
        position="relative"
        zIndex={1}
      >
        {/* Compact Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Flex justify="space-between" align="center">
            <VStack align="start" gap={1}>
              <Heading
                size="xl"
                fontWeight="950"
                color="gray.900"
                letterSpacing="tight"
              >
                Financial Ecosystem
              </Heading>
              <HStack gap={2}>
                <Box w={2} h={2} bg="green.500" borderRadius="full" />
                <Text color="gray.500" fontWeight="bold" fontSize="sm">
                  Real-time Balance Synchronization
                </Text>
              </HStack>
            </VStack>

            <Flex align="center" gap={4}>
              <VStack align="end" gap={0}>
                <Text
                  fontSize="xs"
                  fontWeight="900"
                  color="blue.600"
                  textTransform="uppercase"
                >
                  Status
                </Text>
                <Text fontWeight="black" color="gray.800">
                  Verified Partner
                </Text>
              </VStack>
              <Separator orientation="vertical" h="40px" />
              <Box
                p={3}
                bg="white"
                borderRadius="2xl"
                shadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <LuShieldCheck size={24} color="#2563EB" />
              </Box>
            </Flex>
          </Flex>
        </MotionBox>

        {/* Bento Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
          templateRows={{ base: "auto", lg: "1fr" }}
          gap={10}
          flex={1}
        >
          {/* Main Hero Card (60% width) */}
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              h="full"
              position="relative"
              bgGradient="to-br"
              gradientFrom="blue.600"
              gradientTo="blue.950"
              borderRadius="xl"
              color="white"
              p={12}
              boxShadow="0 25px 50px -12px rgba(37, 99, 235, 0.5)"
              overflow="hidden"
              maxH="400px"
            >
              {/* Dynamic Glow */}
              <MotionBox
                position="absolute"
                bottom="-20%"
                left="-10%"
                w="500px"
                h="500px"
                bg="blue.400"
                filter="blur(100px)"
                opacity={0.2}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <VStack
                h="full"
                justify="space-between"
                align="start"
                position="relative"
                zIndex={1}
              >
                <Stack gap={10}>
                  <Flex align="center" gap={4}>
                    <Box
                      p={4}
                      bg="whiteAlpha.200"
                      borderRadius="2xl"
                      backdropFilter="blur(10px)"
                    >
                      <LuWallet size={32} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Heading size="lg" fontWeight="900" letterSpacing="tight">
                        Total Portfolio
                      </Heading>
                      <Text color="blue.100" fontWeight="bold">
                        Personal & Network Earnings
                      </Text>
                    </VStack>
                  </Flex>

                  <VStack align="start" gap={2}>
                    <Text
                      fontSize="sm"
                      fontWeight="900"
                      color="blue.200"
                      textTransform="uppercase"
                      letterSpacing="widest"
                    >
                      Consolidated Balance
                    </Text>
                    <Heading
                      size="6xl"
                      fontWeight="950"
                      letterSpacing="tighter"
                    >
                      ₹ {walletData?.total_balance?.toLocaleString() || "0.00"}
                    </Heading>
                  </VStack>
                </Stack>

                <Flex w="full" justify="space-between" align="end">
                  <HStack gap={8}>
                    <VStack align="start" gap={0}>
                      <Text
                        fontSize="xs"
                        fontWeight="900"
                        color="blue.200"
                        textTransform="uppercase"
                      >
                        Network
                      </Text>
                      <Text fontSize="lg" fontWeight="black">
                        Global Reach
                      </Text>
                    </VStack>
                    <Separator
                      orientation="vertical"
                      h="40px"
                      borderColor="whiteAlpha.300"
                    />
                    <VStack align="start" gap={0}>
                      <Text
                        fontSize="xs"
                        fontWeight="900"
                        color="blue.200"
                        textTransform="uppercase"
                      >
                        Currency
                      </Text>
                      <Text fontSize="lg" fontWeight="black">
                        INR (₹)
                      </Text>
                    </VStack>
                  </HStack>

                  <Box
                    p={4}
                    bg="whiteAlpha.100"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                  >
                    <Text fontSize="xs" fontWeight="black">
                      v1.2.0-SECURE
                    </Text>
                  </Box>
                </Flex>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Sub Wallets Column (40% width) */}
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Grid templateRows="repeat(2, 1fr)" gap={5} h="full" maxH="400px">
              <WalletCard
                title="Level Earnings"
                balance={walletData?.level_wallet?.balance}
                icon={<LuLayers size={28} />}
                color="blue"
                delay={0.4}
              />
              <WalletCard
                title="Passive Revenue"
                balance={walletData?.passive_wallet?.balance}
                icon={<LuTrendingUp size={28} />}
                color="purple"
                delay={0.5}
              />
            </Grid>
          </GridItem>
        </Grid>

        {/* Footer Note */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          textAlign="center"
        >
          <Text
            fontSize="xs"
            color="gray.400"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            Cloud-Encrypted Financial Layer • Bylive Holidays Tech
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Wallet;
