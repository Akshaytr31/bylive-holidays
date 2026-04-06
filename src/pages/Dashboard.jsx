import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Clipboard,
  HStack,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { LuCheck, LuCopy } from "react-icons/lu";

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
    <Container maxW="4xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="xl">Dashboard</Heading>
          <Text color="gray.600">Welcome to your overview.</Text>
        </Box>

        <Box p={6} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Heading size="md" mb={4}>
            Your Referral Link
          </Heading>
          {loading ? (
            <Skeleton height="40px" />
          ) : (
            <Clipboard.Root value={referralLink}>
              <HStack>
                <Clipboard.Input />
                <Clipboard.Trigger asChild>
                  <Button variant="ghost" size="sm">
                    <Clipboard.Indicator copied={<LuCheck />}>
                      <LuCopy />
                    </Clipboard.Indicator>
                  </Button>
                </Clipboard.Trigger>
              </HStack>
            </Clipboard.Root>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;
