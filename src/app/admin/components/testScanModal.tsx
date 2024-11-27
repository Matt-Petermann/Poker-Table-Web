import { forwardRef, memo, useEffect, useImperativeHandle } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

import { useTableContext } from "@/contexts/tableContext";

export interface TestScanModal {
    onOpen: () => void;
}

const _Modal = forwardRef<TestScanModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const { newlyScannedCards } = useTableContext();

    /** When a new card is scanned, record it. */
    useEffect(() => {
        const finalIndex = newlyScannedCards.length - 1;
        if(isOpen && finalIndex >= 0)
            console.log("Test Scan:", newlyScannedCards[finalIndex]);
    }, [newlyScannedCards]);

    useImperativeHandle(ref, () => ({ onOpen: onOpenChange }));

    return (
        <Modal
            {...{ isOpen, onOpenChange, onClose }}
            hideCloseButton
            size="4xl"
        >
            <ModalContent className="backdrop-blur-md bg-black/25">
                <ModalHeader>Test Scan</ModalHeader>
                <ModalBody className="w-11/12 mx-auto">
                    Scan a card to display the associated image.
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        startContent={<FaX />}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export const TestScanModal = memo(_Modal);
