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
  Button,
  Input,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { walletService } from "../services/walletService";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "../components/ui/dialog";
import {
  LuWallet,
  LuTrendingUp,
  LuLayers,
  LuShieldCheck,
  LuArrowUpRight,
  LuCoins,
  LuInfo,
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
    borderRadius="lg"
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
        borderRadius="lg"
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
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payoutStatus, setPayoutStatus] = useState({ type: "", message: "" });

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

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handlePayoutRequest = async () => {
    if (!payoutAmount || isNaN(payoutAmount) || Number(payoutAmount) <= 0) {
      setPayoutStatus({
        type: "error",
        message: "Please enter a valid amount.",
      });
      return;
    }

    if (Number(payoutAmount) > walletData?.summary?.withdrawable) {
      setPayoutStatus({
        type: "error",
        message: "Insufficient available balance.",
      });
      return;
    }

    setIsSubmitting(true);
    setPayoutStatus({ type: "", message: "" });

    try {
      await walletService.requestPayout(Number(payoutAmount));
      setPayoutStatus({
        type: "success",
        message: "Payout request submitted successfully!",
      });
      setPayoutAmount("");
      // Refresh wallet data after successful payout
      await fetchWalletData();
      // Close modal after a short delay
      setTimeout(() => setIsPayoutModalOpen(false), 2000);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.error ||
            error?.message ||
            "Failed to submit payout request.";
      setPayoutStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box h="100vh" display="flex" alignItems="center" bg="gray.50">
        <Container maxW="8xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
            <Skeleton height="500px" borderRadius="lg" />
            <VStack gap={10}>
              <Skeleton height="245px" width="full" borderRadius="lg" />
              <Skeleton height="245px" width="full" borderRadius="lg" />
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
                borderRadius="lg"
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
              borderRadius="lg"
              color="white"
              p={10}
              boxShadow="0 25px 50px -12px rgba(37, 99, 235, 0.5)"
              overflow="hidden"
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
                align="stretch"
                position="relative"
                zIndex={1}
                gap={8}
              >
                {/* Header Row */}
                <Flex justify="space-between" align="start" w="full">
                  <HStack gap={4}>
                    <Box
                      p={3}
                      bg="whiteAlpha.200"
                      borderRadius="lg"
                      backdropFilter="blur(10px)"
                    >
                      <LuWallet size={24} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Heading size="md" fontWeight="800" letterSpacing="tight">
                        Total Portfolio
                      </Heading>
                      <Text color="blue.100" fontSize="xs" fontWeight="bold">
                        Personal & Network Earnings
                      </Text>
                    </VStack>
                  </HStack>

                  <Badge
                    bg="whiteAlpha.200"
                    color="white"
                    borderRadius="lg"
                    px={3}
                    py={1}
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    fontSize="2xs"
                    fontWeight="black"
                    letterSpacing="wider"
                  >
                    v1.2.0-SECURE
                  </Badge>
                </Flex>

                {/* Main Content Area */}
                <VStack align="start" gap={2}>
                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="blue.200"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    Consolidated Balance
                  </Text>
                  <Heading size="6xl" fontWeight="900" letterSpacing="tighter">
                    ₹{" "}
                    {walletData?.summary?.total_earnings?.toLocaleString() ||
                      "0.00"}
                  </Heading>
                </VStack>

                {/* Liquidity Overview */}
                <HStack
                  gap={10}
                  bg="whiteAlpha.100"
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                >
                  <VStack align="start" gap={0}>
                    <Text
                      fontSize="2xs"
                      fontWeight="900"
                      color="blue.200"
                      textTransform="uppercase"
                    >
                      Available
                    </Text>
                    <Text fontSize="xl" fontWeight="900" color="green.300">
                      ₹{" "}
                      {walletData?.summary?.withdrawable?.toLocaleString() ||
                        "0.00"}
                    </Text>
                  </VStack>
                  <Separator
                    orientation="vertical"
                    h="30px"
                    borderColor="whiteAlpha.200"
                  />
                  <VStack align="start" gap={0}>
                    <Text
                      fontSize="2xs"
                      fontWeight="900"
                      color="blue.200"
                      textTransform="uppercase"
                    >
                      Locked
                    </Text>
                    <Text fontSize="xl" fontWeight="900" color="orange.300">
                      ₹{" "}
                      {walletData?.summary?.locked?.toLocaleString() || "0.00"}
                    </Text>
                  </VStack>
                </HStack>

                {/* Bottom Bar: Stats & Actions */}
                <Flex justify="space-between" align="center" w="full">
                  <HStack gap={8}>
                    <VStack align="start" gap={0.5}>
                      <Text
                        fontSize="2xs"
                        fontWeight="800"
                        color="blue.300"
                        textTransform="uppercase"
                        letterSpacing="widest"
                      >
                        Network
                      </Text>
                      <Text fontSize="md" fontWeight="800">
                        Global Reach
                      </Text>
                    </VStack>
                    <Separator
                      orientation="vertical"
                      h="30px"
                      borderColor="whiteAlpha.300"
                    />
                    <VStack align="start" gap={0.5}>
                      <Text
                        fontSize="2xs"
                        fontWeight="800"
                        color="blue.300"
                        textTransform="uppercase"
                        letterSpacing="widest"
                      >
                        Currency
                      </Text>
                      <Text fontSize="md" fontWeight="800">
                        INR (₹)
                      </Text>
                    </VStack>
                  </HStack>

                  <Button
                    size="lg"
                    bg="white"
                    color="blue.600"
                    fontWeight="900"
                    px={8}
                    height="14"
                    borderRadius="lg"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "2xl",
                      bg: "blue.50",
                    }}
                    onClick={() => {
                      setPayoutStatus({ type: "", message: "" });
                      setIsPayoutModalOpen(true);
                    }}
                    gap={2}
                  >
                    Withdraw Funds <Icon as={LuArrowUpRight} />
                  </Button>
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
                balance={walletData?.passive_wallet?.total}
                icon={<LuTrendingUp size={28} />}
                color="purple"
                delay={0.5}
              />
              {walletData?.next_unlock && (
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  bg="rgba(255, 255, 255, 0.7)"
                  backdropFilter="blur(24px)"
                  p={6}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="orange.200"
                  boxShadow="0 8px 32px 0 rgba(251, 146, 60, 0.07)"
                  _hover={{ transform: "scale(1.02)", shadow: "xl" }}
                >
                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={0}>
                      <Text
                        fontSize="xs"
                        fontWeight="900"
                        color="orange.600"
                        textTransform="uppercase"
                        letterSpacing="widest"
                      >
                        Next Unlock
                      </Text>
                      <Heading size="md" fontWeight="900" color="gray.800">
                        ₹ {walletData.next_unlock.amount?.toLocaleString()}
                      </Heading>
                      <Text fontSize="2xs" color="gray.500" fontWeight="bold">
                        {new Date(
                          walletData.next_unlock.unlock_at,
                        ).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </Text>
                    </VStack>
                    <Box
                      p={3}
                      bg="orange.50"
                      color="orange.600"
                      borderRadius="lg"
                    >
                      <LuShieldCheck size={20} />
                    </Box>
                  </HStack>
                </MotionBox>
              )}
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

      {/* Payout Request Modal */}
      <DialogRoot
        open={isPayoutModalOpen}
        onOpenChange={(e) => setIsPayoutModalOpen(e.open)}
        size="md"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogContent
          bg="rgba(255, 255, 255, 0.85)"
          backdropFilter="blur(32px)"
          borderRadius="lg"
          border="1px solid"
          borderColor="whiteAlpha.400"
          p={0}
          boxShadow="0 40px 100px -20px rgba(0, 0, 0, 0.3)"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-50px"
            right="-50px"
            w="150px"
            h="150px"
            bg="blue.500"
            filter="blur(60px)"
            opacity={0.15}
            zIndex={0}
          />

          <DialogHeader p={8} pb={4} position="relative" zIndex={1}>
            <Flex align="center" gap={4}>
              <Box
                p={3}
                bg="blue.600"
                color="white"
                borderRadius="lg"
                shadow="lg"
              >
                <LuCoins size={24} />
              </Box>
              <VStack align="start" gap={0}>
                <Text
                  fontSize="2xs"
                  fontWeight="800"
                  color="blue.600"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Financial Gateway
                </Text>
                <DialogTitle fontSize="2xl" fontWeight="800" color="gray.900">
                  Request Payout
                </DialogTitle>
              </VStack>
            </Flex>
          </DialogHeader>

          <DialogBody px={8} py={4} position="relative" zIndex={1}>
            <VStack gap={6} align="stretch">
              {/* Balance Chip */}
              <Box
                p={5}
                bgGradient="to-br"
                gradientFrom="blue.600"
                gradientTo="blue.800"
                borderRadius="lg"
                color="white"
                shadow="xl"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="-20%"
                  right="-10%"
                  opacity={0.1}
                  transform="rotate(15deg)"
                >
                  <LuWallet size={120} />
                </Box>
                <VStack align="start" gap={1}>
                  <Text
                    fontSize="2xs"
                    fontWeight="800"
                    color="whiteAlpha.800"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    Withdrawable Liquidity
                  </Text>
                  <Heading size="3xl" fontWeight="900" letterSpacing="tight">
                    ₹{" "}
                    {walletData?.summary?.withdrawable?.toLocaleString() ||
                      "0.00"}
                  </Heading>
                </VStack>
              </Box>

              <VStack align="start" gap={3}>
                <Flex justify="space-between" align="center" w="full">
                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="gray.500"
                    letterSpacing="widest"
                  >
                    PAYOUT MAGNITUDE
                  </Text>
                  <HStack
                    color="blue.600"
                    gap={1}
                    cursor="pointer"
                    onClick={() =>
                      setPayoutAmount(
                        walletData?.summary?.withdrawable?.toString(),
                      )
                    }
                  >
                    <Text fontSize="2xs" fontWeight="900">
                      MAX
                    </Text>
                    <LuArrowUpRight size={12} />
                  </HStack>
                </Flex>
                <Box w="full" position="relative">
                  <Input
                    placeholder="0.00"
                    size="xl"
                    variant="subtle"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="lg"
                    fontSize="2xl"
                    fontWeight="800"
                    h="16"
                    pl={12}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    type="number"
                    _focus={{
                      bg: "white",
                      borderColor: "blue.500",
                      ring: 4,
                      ringColor: "blue.50",
                    }}
                  />
                  <Box
                    position="absolute"
                    left={4}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                  >
                    <Text fontSize="xl" fontWeight="800">
                      ₹
                    </Text>
                  </Box>
                </Box>
              </VStack>

              {payoutStatus.message && (
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  p={4}
                  borderRadius="lg"
                  bg={payoutStatus.type === "success" ? "green.50" : "red.50"}
                  border="1px solid"
                  borderColor={
                    payoutStatus.type === "success" ? "green.200" : "red.200"
                  }
                  display="flex"
                  alignItems="start"
                  gap={3}
                >
                  <Box
                    mt={0.5}
                    color={
                      payoutStatus.type === "success" ? "green.500" : "red.500"
                    }
                  >
                    <LuInfo size={18} />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color={
                      payoutStatus.type === "success" ? "green.700" : "red.700"
                    }
                    lineHeight="shorter"
                  >
                    {payoutStatus.message}
                  </Text>
                </MotionBox>
              )}

              <Text
                fontSize="2xs"
                color="gray.400"
                fontWeight="bold"
                textAlign="center"
                px={4}
              >
                Secure transaction processed via cloud-encrypted financial
                layer.
              </Text>
            </VStack>
          </DialogBody>

          <DialogFooter p={8} pt={4} bg="gray.50/50">
            <HStack w="full" gap={4}>
              <DialogActionTrigger asChild>
                <Button
                  variant="ghost"
                  borderRadius="lg"
                  fontWeight="800"
                  flex={1}
                  _hover={{ bg: "gray.100" }}
                >
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                bg="blue.600"
                color="white"
                flex={2}
                height="14"
                borderRadius="lg"
                fontWeight="800"
                onClick={handlePayoutRequest}
                loading={isSubmitting}
                loadingText="Securing..."
                _hover={{
                  bg: "blue.700",
                  transform: "translateY(-2px)",
                  shadow: "xl",
                }}
                gap={2}
              >
                Confirm Payout <LuShieldCheck size={20} />
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default Wallet;
