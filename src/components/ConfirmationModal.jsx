import React from "react";
import { Button, Text, Box, Flex, HStack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogBackdrop,
} from "./ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { LuLogOut, LuCircleAlert } from "react-icons/lu";

const MotionBox = motion.create(Box);

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  confirmText = "Yes",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  const isLogout = title.toLowerCase().includes("logout");

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      role="alertdialog"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DialogContent
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.400"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        overflow="hidden"
        p={2}
      >
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DialogHeader borderBottom="none" p={3}>
                <HStack gap={4} align="center" width="full">
                  <Box
                    p={3}
                    borderRadius="xl"
                    bg={isLogout ? "red.50" : "blue.50"}
                    color={isLogout ? "red.500" : "blue.500"}
                  >
                    {isLogout ? (
                      <LuLogOut size={16} />
                    ) : (
                      <LuCircleAlert size={16} />
                    )}
                  </Box>
                  <DialogTitle
                    fontSize="xl"
                    fontWeight="800"
                    letterSpacing="tight"
                    textAlign="center"
                  >
                    {title}
                  </DialogTitle>
                </HStack>
              </DialogHeader>

              <DialogBody py={4}>
                <Text
                  color="gray.600"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="600"
                  lineHeight="relaxed"
                >
                  {description}
                </Text>
              </DialogBody>

              <DialogFooter
                borderTop="none"
                p={3}
                gap={3}
                justifyContent="flex-end"
              >
                <DialogActionTrigger asChild>
                  <Button
                    variant="solid"
                    onClick={onClose}
                    size="sm"
                    borderRadius="lg"
                    fontWeight="bold"
                    px={8}
                    _hover={{ bg: "gray.100" }}
                    bg="gray.200"
                    color="gray.600"
                  >
                    {cancelText}
                  </Button>
                </DialogActionTrigger>
                <Button
                  bg={isLogout ? "red.600" : "blue.600"}
                  color="white"
                  onClick={onConfirm}
                  loading={isLoading}
                  size="sm"
                  borderRadius="lg"
                  fontWeight="bold"
                  px={10}
                  _hover={{
                    bg: isLogout ? "red.700" : "blue.700",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 20px -10px rgba(0,0,0,0.3)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s"
                >
                  {confirmText}
                </Button>
              </DialogFooter>
            </MotionBox>
          )}
        </AnimatePresence>
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmationModal;
