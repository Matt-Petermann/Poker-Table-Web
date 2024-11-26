import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

export interface ScanAllModal {
    onOpen: () => void;
}

const _Modal = forwardRef<ScanAllModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const [cardNumber, setCardNumber] = useState(0);

    useImperativeHandle(ref, () => ({
        onOpen: () => {
            setCardNumber(0);
            onOpenChange();
        }
    }))

    return (
        <Modal
            {...{ isOpen, onOpenChange, onClose }}
            hideCloseButton
            size="4xl"
            isDismissable={false}
        >
            <ModalContent className="backdrop-blur-md bg-black/25">
                <ModalHeader>Scan all Cards</ModalHeader>
                <ModalBody className="w-11/12 mx-auto">
                    <Progress
                        value={cardNumber}
                        maxValue={51}
                        classNames={{
                            indicator: "bg-gradient-to-r from-blue-500 to-green-500"
                        }}
                        aria-label="Card Progress"
                    />
                    <h2
                        style={{
                            marginBottom: "16px",
                            marginLeft: `${cardNumber/51*100}%`
                        }}
                        className="transition-all duration-500"
                    >
                        <span className="absolute -translate-x-1/2">
                            <span>{cardNumber+1}</span>
                            <span className="text-xs">/52</span>
                        </span>
                    </h2>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        startContent={<FaX />}
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        startContent={<FaFloppyDisk />}
                        onClick={() => setCardNumber(num => num+1)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export const ScanAllModal = memo(_Modal);
