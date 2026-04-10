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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { LuUsers, LuUser, LuChevronDown } from "react-icons/lu";

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

  if (loading) {
    return (
      <Container maxW="4xl" py={10}>
        <VStack gap={6} align="stretch">
          <Skeleton height="40px" width="200px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="8xl" py={10}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="xl">My Downlines</Heading>
          <Text color="gray.600">
            View all members who joined using your referral network, grouped by
            level.
          </Text>
        </Box>

        {downlines.length > 0 ? (
          <Accordion.Root
            variant="subtle"
            collapsible
            defaultValue={["level-1"]}
          >
            {downlines.map((levelGroup) => (
              <Accordion.Item
                key={`level-${levelGroup.level}`}
                value={`level-${levelGroup.level}`}
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
                mb={4}
                overflow="hidden"
              >
                <Accordion.ItemTrigger p={4} _hover={{ bg: "gray.50" }}>
                  <Flex justify="space-between" align="center" width="full">
                    <Flex align="center" gap={3}>
                      <Box
                        p={2}
                        bg="blue.50"
                        color="blue.600"
                        borderRadius="md"
                      >
                        <LuUsers />
                      </Box>
                      <Box textAlign="left">
                        <Heading size="sm">Level {levelGroup.level}</Heading>
                        <Text fontSize="xs" color="gray.500">
                          {levelGroup.count} Members
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Box overflowX="auto" p={2}>
                    <Table.Root variant="line" size="sm">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>Member</Table.ColumnHeader>
                          <Table.ColumnHeader>User ID</Table.ColumnHeader>
                          <Table.ColumnHeader>Phone</Table.ColumnHeader>
                          <Table.ColumnHeader>Status</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {levelGroup.users.map((user) => (
                          <Table.Row key={user.user_id}>
                            <Table.Cell>
                              <Flex align="center" gap={2}>
                                <LuUser size={14} />
                                <Text fontWeight="500">
                                  {user.name || "N/A"}
                                </Text>
                              </Flex>
                            </Table.Cell>
                            <Table.Cell fontSize="xs">
                              {user.user_id}
                            </Table.Cell>
                            <Table.Cell fontSize="xs">
                              {user.phone || "N/A"}
                            </Table.Cell>
                            <Table.Cell>
                              <Badge
                                colorPalette={user.is_active ? "green" : "red"}
                                variant="solid"
                                size="xs"
                              >
                                {user.is_active ? "Active" : "Inactive"}
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
          </Accordion.Root>
        ) : (
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            bg="white"
            shadow="sm"
            p={20}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              color="gray.400"
            >
              <LuUsers size={64} strokeWidth={1} />
              <Heading size="md" mt={4} color="gray.500">
                No downlines found
              </Heading>
              <Text mt={2}>Share your referral link to grow your network!</Text>
            </Flex>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Downlines;
