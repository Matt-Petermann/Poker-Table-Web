import { forwardRef, memo, useCallback, useImperativeHandle } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

import { useTableContext } from "@/contexts/tableContext";

export interface ConfirmClearAllModal {
    onOpen: () => void;
}

const _Modal = forwardRef<ConfirmClearAllModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const { handleDeleteCardHashes } = useTableContext();

    const handleConfirm = useCallback(() => {
        handleDeleteCardHashes();
        onClose();
    }, []);

    useImperativeHandle(ref, () => ({
        onOpen: onOpenChange
    }));

    return (
        <Modal
            {...{ isOpen, onOpenChange, onClose }}
            hideCloseButton
            size="4xl"
        >
            <ModalContent className="backdrop-blur-md bg-black/25">
                <ModalHeader>Confirm Clear All</ModalHeader>
                <ModalBody className="w-11/12 mx-auto">
                    Are you sure you want to clear all cards? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        startContent={<FaX />}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        startContent={<FaFloppyDisk />}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export const ConfirmClearAllModal = memo(_Modal);
