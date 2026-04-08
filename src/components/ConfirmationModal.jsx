import React from "react";
import { Button, Text } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";

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
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      role="alertdialog"
    >
      <DialogContent top="160px">
        <DialogHeader>
          <DialogTitle fontSize="lg" fontWeight="bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text color="gray.600">{description}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
          </DialogActionTrigger>
          <Button
            colorPalette="red"
            onClick={onConfirm}
            ml={3}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmationModal;
