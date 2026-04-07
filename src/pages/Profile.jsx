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
  Field,
  Input,
  Stack,
  SimpleGrid,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import {
  LuCheck,
  LuCopy,
  LuSave,
  LuPhone,
  LuUser,
  LuCreditCard,
} from "react-icons/lu";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Editable states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");

  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileData, referralData] = await Promise.all([
          authService.getProfile(),
          authService.getReferralLink(),
        ]);
        setProfile(profileData);

        // Initialize editable fields
        setName(profileData.name || "");
        setPhone(profileData.phone || "");
        setAddress(profileData.kyc?.address || "");
        setBankAccount(profileData.kyc?.bank_account_number || "");
        setIfsc(profileData.kyc?.ifsc_code || "");

        setReferralLink(referralData.referral_link || "");
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleSaveChanges = async () => {
    setUpdating(true);
    try {
      const updateData = {
        name,
        phone,
        address,
        bank_account_number: bankAccount,
        ifsc_code: ifsc,
      };

      await authService.updateProfile(updateData);

      // Update local profile state
      setProfile({
        ...profile,
        name,
        phone,
        kyc: {
          ...profile.kyc,
          address,
          bank_account_number: bankAccount,
          ifsc_code: ifsc,
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile details.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container maxW="4xl" py={10}>
        <VStack gap={6} align="stretch">
          <Skeleton height="40px" width="200px" />
          <Skeleton height="300px" />
          <Skeleton height="200px" />
        </VStack>
      </Container>
    );
  }

  const kyc = profile?.kyc || {};

  return (
    <Container maxW="4xl" py={10}>
      <VStack gap={8} align="stretch">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap={4}
        >
          <Box>
            <Heading size="xl">Profile Settings</Heading>
            <Text color="gray.600">
              Update your personal and account details.
            </Text>
          </Box>
          <Button
            colorPalette="blue"
            size="lg"
            onClick={handleSaveChanges}
            loading={updating}
          >
            <LuSave /> Save All Changes
          </Button>
        </Flex>

        {/* Personal Information */}
        <Box
          p={6}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="xl"
          bg="white"
          shadow="sm"
        >
          <Heading size="md" mb={6} display="flex" alignItems="center" gap={2}>
            <LuUser /> Personal Information
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Field.Root>
              <Field.Label fontWeight="600">Full Name</Field.Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="subtle"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label fontWeight="600">User ID</Field.Label>
              <Input
                value={profile?.user_id || ""}
                readOnly
                variant="outline"
                opacity={0.7}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label fontWeight="600">Phone Number</Field.Label>
              <HStack>
                <LuPhone />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="subtle"
                />
              </HStack>
            </Field.Root>
          </SimpleGrid>
        </Box>

        {/* KYC & Bank Details */}
        <Box
          p={6}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="xl"
          bg="white"
          shadow="sm"
        >
          <Heading size="md" mb={6} display="flex" alignItems="center" gap={2}>
            <LuCreditCard /> KYC & Bank Details
          </Heading>
          <Stack gap={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Field.Root>
                <Field.Label fontWeight="600">Bank Account Number</Field.Label>
                <Input
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  variant="subtle"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label fontWeight="600">IFSC Code</Field.Label>
                <Input
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  variant="subtle"
                />
              </Field.Root>
            </SimpleGrid>

            <Field.Root>
              <Field.Label fontWeight="600">Address</Field.Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                variant="subtle"
              />
            </Field.Root>
          </Stack>
        </Box>

        {/* Identity Documents */}
        <Box
          p={6}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="xl"
          bg="white"
          shadow="sm"
        >
          <Heading size="md" mb={6}>
            Identity Documents
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            <VStack align="start">
              <Text fontWeight="600" fontSize="sm" mb={2}>
                Aadhaar Front
              </Text>
              {kyc.aadhaar_front ? (
                <Image
                  src={kyc.aadhaar_front}
                  alt="Aadhaar Front"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.100"
                  fallback={<Skeleton height="150px" width="full" />}
                />
              ) : (
                <Box
                  p={4}
                  bg="gray.50"
                  width="full"
                  height="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.400" fontSize="xs">
                    Not available
                  </Text>
                </Box>
              )}
            </VStack>
            <VStack align="start">
              <Text fontWeight="600" fontSize="sm" mb={2}>
                Aadhaar Back
              </Text>
              {kyc.aadhaar_back ? (
                <Image
                  src={kyc.aadhaar_back}
                  alt="Aadhaar Back"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.100"
                  fallback={<Skeleton height="150px" width="full" />}
                />
              ) : (
                <Box
                  p={4}
                  bg="gray.50"
                  width="full"
                  height="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.400" fontSize="xs">
                    Not available
                  </Text>
                </Box>
              )}
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Referral Section */}
        <Box
          p={6}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="xl"
          bg="white"
          shadow="sm"
        >
          <Heading size="md" mb={4}>
            Referral Link
          </Heading>
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
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;
