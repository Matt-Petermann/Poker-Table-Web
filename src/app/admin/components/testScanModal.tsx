import { forwardRef, memo, useImperativeHandle } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

export interface TestScanModal {
    onOpen: () => void;
}

const _Modal = forwardRef<TestScanModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();

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
