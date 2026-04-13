import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Skeleton,
  Table,
  Badge,
  Flex,
  Accordion,
  HStack,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { authService } from "../services/authService";
import {
  LuUsers,
  LuUser,
  LuChevronDown,
  LuTrophy,
  LuGlobe,
  LuZap,
  LuShieldCheck,
} from "react-icons/lu";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionFlex = motion.create(Flex);

const StatCard = ({ title, value, icon, color, delay = 0 }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    bg="whiteAlpha.800"
    backdropFilter="blur(12px)"
    p={6}
    borderRadius="2xl"
    border="1px solid"
    borderColor="whiteAlpha.400"
    flex={1}
    shadow="sm"
    _hover={{
      transform: "translateY(-4px)",
      shadow: "md",
      borderColor: `${color}.200`,
    }}
  >
    <Flex justify="space-between" align="center">
      <VStack align="start" gap={1}>
        <Text
          fontSize="xs"
          fontWeight="900"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          {title}
        </Text>
        <Heading
          size="2xl"
          fontWeight="950"
          color="gray.800"
          letterSpacing="tighter"
        >
          {value}
        </Heading>
      </VStack>
      <Box p={3} bg={`${color}.50`} color={`${color}.600`} borderRadius="xl">
        {icon}
      </Box>
    </Flex>
  </MotionBox>
);

const Downlines = () => {
  const [downlines, setDownlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownlines = async () => {
      try {
        const data = await authService.getDownlines();
        setDownlines(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch downlines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownlines();
  }, []);

  const stats = useMemo(() => {
    const total = downlines.reduce((acc, curr) => acc + curr.count, 0);
    const active = downlines.reduce(
      (acc, level) =>
        acc + level.users.filter((u) => u.status === "ACTIVE").length,
      0,
    );
    return { total, active, levels: downlines.length };
  }, [downlines]);

  if (loading) {
    return (
      <Box h="100vh" bg="gray.50" py={10}>
        <Container maxW="6xl">
          <VStack gap={8} align="stretch">
            <Skeleton height="100px" borderRadius="2xl" />
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
              <Skeleton height="120px" borderRadius="2xl" />
              <Skeleton height="120px" borderRadius="2xl" />
              <Skeleton height="120px" borderRadius="2xl" />
            </SimpleGrid>
            <Skeleton height="400px" borderRadius="2xl" />
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.50"
      position="relative"
      minH="100vh"
      overflow="hidden"
      pb={20}
    >
      {/* Background Atmosphere */}
      <Box
        position="absolute"
        top="-5%"
        right="-5%"
        w="800px"
        h="800px"
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
        bgGradient="radial(circle, purple.50 0%, transparent 70%)"
        filter="blur(80px)"
        zIndex={0}
      />

      <Container maxW="7xl" py={10} position="relative" zIndex={1}>
        <VStack gap={10} align="stretch">
          {/* Header Section */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Flex justify="space-between" align="end" wrap="wrap" gap={6}>
              <VStack align="start" gap={1}>
                <Heading size="2xl" fontWeight="950" color="gray.900">
                  Network Architecture
                </Heading>
                <HStack gap={2}>
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.500" fontWeight="bold" fontSize="sm">
                    Strategic Referral Ecosystem Mapping
                  </Text>
                </HStack>
              </VStack>

              <HStack
                gap={4}
                bg="white"
                p={2}
                borderRadius="2xl"
                shadow="sm"
                border="1px solid"
                borderColor="gray.100"
              >
                <Flex align="center" gap={3} px={4}>
                  <LuShieldCheck color="#2563EB" />
                  <Text
                    fontSize="xs"
                    fontWeight="900"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    Verified Network
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          </MotionBox>

          {/* Stats Analytics */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            <StatCard
              title="Total Downlines"
              value={stats.total}
              icon={<LuUsers size={24} />}
              color="blue"
              delay={0.1}
            />
            <StatCard
              title="Active Nodes"
              value={stats.active}
              icon={<LuZap size={24} />}
              color="green"
              delay={0.2}
            />
            <StatCard
              title="Network Depth"
              value={`${stats.levels} Levels`}
              icon={<LuTrophy size={24} />}
              color="purple"
              delay={0.3}
            />
          </SimpleGrid>

          {/* Main Content */}
          {downlines.length > 0 ? (
            <Accordion.Root variant="subtle" collapsible defaultValue={[]}>
              <VStack gap={4} align="stretch" mt={4}>
                {downlines.map((levelGroup) => (
                  <Accordion.Item
                    key={`level-${levelGroup.level}`}
                    value={`level-${levelGroup.level}`}
                    bg="whiteAlpha.700"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="whiteAlpha.600"
                    borderRadius="2xl"
                    overflow="hidden"
                    shadow="sm"
                  >
                    <Accordion.ItemTrigger
                      p={6}
                      _hover={{ bg: "whiteAlpha.900" }}
                    >
                      <Flex justify="space-between" align="center" width="full">
                        <Flex align="center" gap={4}>
                          <Box
                            p={3}
                            bgGradient="to-br"
                            gradientFrom="blue.500"
                            gradientTo="blue.700"
                            color="white"
                            borderRadius="xl"
                            shadow="lg"
                          >
                            <LuGlobe size={20} />
                          </Box>
                          <Box textAlign="left">
                            <Heading
                              size="md"
                              fontWeight="800"
                              color="gray.800"
                            >
                              Tier {levelGroup.level} Nodes
                            </Heading>
                            <Text
                              fontSize="xs"
                              fontWeight="bold"
                              color="blue.600"
                              textTransform="uppercase"
                              letterSpacing="widest"
                            >
                              {levelGroup.count} Associated Members
                            </Text>
                          </Box>
                        </Flex>
                        <LuChevronDown size={20} color="gray.400" />
                      </Flex>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Box overflowX="auto" p={6} pt={0}>
                        <Separator mb={6} />
                        <Table.Root variant="line" size="md">
                          <Table.Header>
                            <Table.Row>
                              <Table.ColumnHeader
                                fontWeight="900"
                                textTransform="uppercase"
                                fontSize="xs"
                                letterSpacing="widest"
                              >
                                Member Identity
                              </Table.ColumnHeader>
                              <Table.ColumnHeader
                                fontWeight="900"
                                textTransform="uppercase"
                                fontSize="xs"
                                letterSpacing="widest"
                              >
                                System ID
                              </Table.ColumnHeader>
                              <Table.ColumnHeader
                                fontWeight="900"
                                textTransform="uppercase"
                                fontSize="xs"
                                letterSpacing="widest"
                              >
                                Connectivity
                              </Table.ColumnHeader>
                              <Table.ColumnHeader
                                fontWeight="900"
                                textTransform="uppercase"
                                fontSize="xs"
                                letterSpacing="widest"
                                textAlign="right"
                              >
                                Protocol Status
                              </Table.ColumnHeader>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {levelGroup.users.map((user) => (
                              <Table.Row
                                key={user.user_id}
                                _hover={{ bg: "blue.50/30" }}
                                transition="background 0.2s"
                              >
                                <Table.Cell>
                                  <Flex align="center" gap={3}>
                                    <Box
                                      p={1.5}
                                      bg="gray.100"
                                      borderRadius="lg"
                                    >
                                      <LuUser size={14} />
                                    </Box>
                                    <Text fontWeight="800" color="gray.800">
                                      {user.name || "Anonymous Member"}
                                    </Text>
                                  </Flex>
                                </Table.Cell>
                                <Table.Cell>
                                  <Badge
                                    variant="subtle"
                                    colorPalette="gray"
                                    fontSize="2xs"
                                    fontWeight="black"
                                    py={1}
                                  >
                                    # {user.user_id}
                                  </Badge>
                                </Table.Cell>
                                <Table.Cell
                                  fontSize="sm"
                                  fontWeight="medium"
                                  color="gray.600"
                                >
                                  {user.phone || "N/A"}
                                </Table.Cell>
                                <Table.Cell textAlign="center" display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                  <Badge
                                    colorPalette={
                                      user.status === "ACTIVE" ? "green" : "red"
                                    }
                                    variant="solid"
                                    size="sm"
                                    px={3}
                                    borderRadius="full"
                                    fontWeight="black"
                                    textTransform="uppercase"
                                    width={'100px'}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                  >
                                    {user.status === "ACTIVE"
                                      ? "Active"
                                      : "Inactive"}
                                  </Badge>
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      </Box>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </VStack>
            </Accordion.Root>
          ) : (
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              bg="whiteAlpha.800"
              backdropFilter="blur(20px)"
              borderRadius="3xl"
              border="1px dashed"
              borderColor="gray.200"
              p={32}
              textAlign="center"
            >
              <VStack gap={6}>
                <Box position="relative">
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="120px"
                    h="120px"
                    bg="blue.100"
                    borderRadius="full"
                    filter="blur(40px)"
                    opacity={0.6}
                  />
                  <LuUsers
                    size={80}
                    strokeWidth={1}
                    color="#BDBDBD"
                    style={{ position: "relative" }}
                  />
                </Box>
                <VStack gap={2}>
                  <Heading
                    size="lg"
                    fontWeight="950"
                    color="gray.400"
                    letterSpacing="tight"
                  >
                    Network Inactive
                  </Heading>
                  <Text color="gray.500" fontWeight="bold" maxW="md">
                    Initialize your growth protocol by sharing your referral
                    nexus with prospective partners.
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          )}

          {/* Footer Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            textAlign="center"
          >
            <Text
              fontSize="xs"
              color="gray.400"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Distributed Network Protocol • Bylive Holidays Systems
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Downlines;
