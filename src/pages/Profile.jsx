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
  Separator,
  Icon,
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
  LuMapPin,
  LuShieldCheck,
  LuShare2,
} from "react-icons/lu";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

const SectionCard = ({ title, icon, children, delay = 0 }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    bg="rgba(255, 255, 255, 0.7)"
    backdropFilter="blur(20px)"
    p={{ base: 6, md: 8 }}
    borderRadius="xl"
    border="1px solid"
    borderColor="whiteAlpha.400"
    boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.07)"
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="-10%"
      left="-5%"
      w="150px"
      h="150px"
      bgGradient="radial(circle, blue.50 0%, transparent 70%)"
      opacity={0.5}
      zIndex={0}
    />
    <VStack align="stretch" gap={6} position="relative" zIndex={1}>
      <HStack gap={3}>
        <Box
          p={2}
          bg="blue.50"
          color="blue.600"
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
        <Heading
          size="md"
          color="gray.800"
          fontWeight="800"
          letterSpacing="tight"
        >
          {title}
        </Heading>
      </HStack>
      {children}
    </VStack>
  </MotionBox>
);

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
      <Container maxW="5xl" py={12}>
        <VStack gap={8} align="stretch">
          <Skeleton height="100px" borderRadius="xl" />
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            <Skeleton height="400px" borderRadius="xl" />
            <Skeleton height="400px" borderRadius="xl" />
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }

  const kyc = profile?.kyc || {};

  return (
    <Box minH="100vh" bg="gray.50" position="relative" overflow="hidden">
      {/* Background Atmosphere */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="600px"
        h="600px"
        bgGradient="radial(circle, blue.50 0%, transparent 70%)"
        filter="blur(100px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        w="600px"
        h="600px"
        bgGradient="radial(circle, blue.50 0%, transparent 70%)"
        filter="blur(100px)"
        zIndex={0}
      />

      <Container maxW="8xl" py={12} position="relative" zIndex={1}>
        <MotionVStack gap={10} align="stretch">
          {/* Header Section */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: "column", md: "row" }}
              gap={8}
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="0 4px 20px rgba(0,0,0,0.03)"
              border="1px solid"
              borderColor="gray.100"
            >
              <HStack gap={6} align="center">
                <Box
                  w="100px"
                  h="100px"
                  borderRadius="2xl"
                  bgGradient="to-br"
                  gradientFrom="blue.600"
                  gradientTo="blue.700"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                >
                  <LuUser size={48} color="white" />
                </Box>
                <VStack align="start" gap={1}>
                  <Heading
                    size="2xl"
                    color="gray.800"
                    fontWeight="900"
                    letterSpacing="tight"
                  >
                    {profile?.name || "User Profile"}
                  </Heading>
                  <HStack gap={4}>
                    <HStack gap={1}>
                      <LuShieldCheck size={14} color="#2563EB" />
                      <Text color="blue.600" fontSize="sm" fontWeight="800">
                        {profile?.user_id}
                      </Text>
                    </HStack>
                    <Separator orientation="vertical" h="12px" />
                    <HStack gap={1}>
                      <LuPhone size={14} color="#64748B" />
                      <Text color="gray.500" fontSize="sm" fontWeight="600">
                        {profile?.phone}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
              <Button
                bg="blue.600"
                color="white"
                size="xl"
                borderRadius="2xl"
                onClick={handleSaveChanges}
                loading={updating}
                px={10}
                fontWeight="bold"
                _hover={{
                  bg: "blue.700",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 20px -10px rgba(37, 99, 235, 0.4)",
                }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
              >
                <LuSave size={20} /> Save Changes
              </Button>
            </Flex>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
            {/* Personal Information */}
            <SectionCard
              title="Personal Information"
              icon={<LuUser size={20} />}
              delay={0.2}
            >
              <Stack gap={6}>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Full Name
                  </Field.Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="subtle"
                    bg="white"
                    borderRadius="xl"
                    h="12"
                    fontSize="md"
                    fontWeight="600"
                    _focus={{
                      borderColor: "blue.500",
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    User ID (Permanent)
                  </Field.Label>
                  <Input
                    value={profile?.user_id || ""}
                    readOnly
                    variant="outline"
                    bg="gray.50"
                    borderRadius="xl"
                    h="12"
                    color="gray.400"
                    cursor="not-allowed"
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Mobile Number
                  </Field.Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    variant="subtle"
                    bg="white"
                    borderRadius="xl"
                    h="12"
                    fontSize="md"
                    fontWeight="600"
                    _focus={{
                      borderColor: "blue.500",
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                  />
                </Field.Root>
              </Stack>
            </SectionCard>

            {/* KYC & Bank Details */}
            <SectionCard
              title="Bank & KYC Details"
              icon={<LuCreditCard size={20} />}
              delay={0.3}
            >
              <Stack gap={6}>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Bank Account Number
                  </Field.Label>
                  <Input
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    variant="subtle"
                    bg="white"
                    borderRadius="xl"
                    h="12"
                    fontSize="md"
                    fontWeight="600"
                    _focus={{
                      borderColor: "blue.500",
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    IFSC Code
                  </Field.Label>
                  <Input
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    variant="subtle"
                    bg="white"
                    borderRadius="xl"
                    h="12"
                    fontSize="md"
                    fontWeight="600"
                    _focus={{
                      borderColor: "blue.500",
                      bg: "white",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                    }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    color="gray.600"
                    fontWeight="700"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Registered Address
                  </Field.Label>
                  <HStack gap={3}>
                    <LuMapPin size={24} color="#64748B" />
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      variant="subtle"
                      bg="white"
                      borderRadius="xl"
                      h="12"
                      fontSize="md"
                      fontWeight="600"
                      _focus={{
                        borderColor: "blue.500",
                        bg: "white",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                      }}
                    />
                  </HStack>
                </Field.Root>
              </Stack>
            </SectionCard>
          </SimpleGrid>

          {/* Identity Documents */}
          <SectionCard
            title="Verified Documents"
            icon={<LuShieldCheck size={20} />}
            delay={0.4}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
              <VStack align="start" gap={3}>
                <Text
                  color="gray.600"
                  fontWeight="800"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Aadhaar Front View
                </Text>
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  border="2px solid"
                  borderColor="gray.100"
                  transition="all 0.3s"
                  _hover={{
                    transform: "scale(1.02)",
                    shadow: "xl",
                    borderColor: "blue.200",
                  }}
                  width="full"
                >
                  {kyc.aadhaar_front ? (
                    <Image
                      src={kyc.aadhaar_front}
                      alt="Aadhaar Front"
                      fallback={<Skeleton height="200px" width="full" />}
                    />
                  ) : (
                    <Flex
                      bg="gray.100"
                      height="200px"
                      align="center"
                      justify="center"
                    >
                      <Text color="gray.400" fontWeight="bold">
                        Not Uploaded
                      </Text>
                    </Flex>
                  )}
                </Box>
              </VStack>
              <VStack align="start" gap={3}>
                <Text
                  color="gray.600"
                  fontWeight="800"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="widest"
                >
                  Aadhaar Back View
                </Text>
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  border="2px solid"
                  borderColor="gray.100"
                  transition="all 0.3s"
                  _hover={{
                    transform: "scale(1.02)",
                    shadow: "xl",
                    borderColor: "blue.200",
                  }}
                  width="full"
                >
                  {kyc.aadhaar_back ? (
                    <Image
                      src={kyc.aadhaar_back}
                      alt="Aadhaar Back"
                      fallback={<Skeleton height="200px" width="full" />}
                    />
                  ) : (
                    <Flex
                      bg="gray.100"
                      height="200px"
                      align="center"
                      justify="center"
                    >
                      <Text color="gray.400" fontWeight="bold">
                        Not Uploaded
                      </Text>
                    </Flex>
                  )}
                </Box>
              </VStack>
            </SimpleGrid>
          </SectionCard>

          {/* Referral Link Card */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            p={8}
            bgGradient="to-br"
            gradientFrom="blue.600"
            gradientTo="blue.800"
            borderRadius="xl"
            color="white"
            boxShadow="0 20px 40px -10px rgba(37, 99, 235, 0.5)"
          >
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: "column", lg: "row" }}
              gap={8}
            >
              <VStack align="start" gap={1}>
                <HStack gap={3} mb={1}>
                  <Box p={2} bg="whiteAlpha.200" borderRadius="lg">
                    <LuShare2 size={20} />
                  </Box>
                  <Text
                    fontWeight="800"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="blue.200"
                  >
                    Affiliate Program
                  </Text>
                </HStack>
                <Heading size="xl" fontWeight="900" letterSpacing="tight">
                  Your Referral Network
                </Heading>
                <Text color="blue.100" fontSize="lg" fontWeight="500">
                  Invite travel enthusiasts and grow your digital ecosystem
                  together.
                </Text>
              </VStack>

              <Box w={{ base: "full", lg: "450px" }}>
                <Clipboard.Root value={referralLink}>
                  <HStack
                    bg="whiteAlpha.100"
                    backdropFilter="blur(10px)"
                    p={1}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    overflow="hidden"
                  >
                    <Clipboard.Input
                      border="none"
                      bg="transparent"
                      color="white"
                      fontWeight="bold"
                      fontSize="md"
                      px={6}
                      _focus={{ boxShadow: "none" }}
                    />
                    <Clipboard.Trigger asChild>
                      <Button
                        bg="white"
                        color="blue.700"
                        px={8}
                        h="12"
                        borderRadius="xl"
                        fontWeight="900"
                        _hover={{ bg: "blue.50", transform: "scale(1.02)" }}
                        _active={{ transform: "scale(0.98)" }}
                      >
                        <Clipboard.Indicator
                          copied={
                            <HStack gap={2}>
                              <LuCheck size={18} /> <Text>Copied!</Text>
                            </HStack>
                          }
                        >
                          <HStack gap={2}>
                            <LuCopy size={18} /> <Text>Copy Link</Text>
                          </HStack>
                        </Clipboard.Indicator>
                      </Button>
                    </Clipboard.Trigger>
                  </HStack>
                </Clipboard.Root>
              </Box>
            </Flex>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default Profile;
