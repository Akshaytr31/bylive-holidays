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
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { walletService } from "../services/walletService";
import { LuWallet } from "react-icons/lu";

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
      <Container maxW="4xl" py={10}>
        <VStack gap={6} align="stretch">
          <Skeleton height="40px" width="200px" />
          <Skeleton height="200px" />
          <Skeleton height="300px" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="xl">My Wallet</Heading>
          <Text color="gray.600">
            View your balance and transaction history.
          </Text>
        </Box>

        {/* Total Balance Card */}
        <Box
          p={8}
          bg="blue.600"
          borderRadius="2xl"
          color="white"
          shadow="lg"
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" top="-10%" right="-5%" opacity={0.1}>
            <LuWallet size={200} />
          </Box>
          <VStack align="start" gap={1}>
            <Text fontSize="sm" fontWeight="medium" opacity={0.8}>
              Total Balance
            </Text>
            <Heading size="3xl">
              ₹ {walletData?.total_balance?.toLocaleString() || "0.00"}
            </Heading>
          </VStack>
        </Box>

        {/* Level and Passive Wallets */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
          >
            <VStack align="start" gap={1}>
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                textTransform="uppercase"
              >
                Level Wallet
              </Text>
              <Heading size="lg" color="blue.600">
                ₹{" "}
                {walletData?.level_wallet?.balance?.toLocaleString() || "0.00"}
              </Heading>
            </VStack>
          </Box>
          <Box
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
          >
            <VStack align="start" gap={1}>
              <Text
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                textTransform="uppercase"
              >
                Passive Wallet
              </Text>
              <Heading size="lg" color="green.600">
                ₹{" "}
                {walletData?.passive_wallet?.balance?.toLocaleString() ||
                  "0.00"}
              </Heading>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Wallet;
