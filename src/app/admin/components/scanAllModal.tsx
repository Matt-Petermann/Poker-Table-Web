import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Progress, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

import Cards from "@/lib/cards";
import { useTableContext } from "@/contexts/tableContext";

export interface ScanAllModal {
    onOpen: () => void;
}

const _Modal = forwardRef<ScanAllModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const [cardIndex, setCardIndex] = useState(0);

    const { newlyScannedCards } = useTableContext();

    /**
     * Increment the index of the card to scan.
     */
    const handleIncrementCardIndex = useCallback(() => {
        setCardIndex(num => num + 1);
    }, []);

    /** When a new card is scanned, record it. */
    useEffect(() => {
        const lastIndex = newlyScannedCards.length - 1;
        if (isOpen && lastIndex >= 0) {
            console.log("Scan All:", newlyScannedCards[lastIndex]);
        }
    }, [newlyScannedCards]);

    useImperativeHandle(ref, () => ({
        onOpen: () => {
            setCardIndex(0);
            onOpenChange();
        }
    }));

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
                    {cardIndex < 52
                        ? <>
                            <Progress
                                value={cardIndex}
                                maxValue={51}
                                classNames={{
                                    indicator: "bg-gradient-to-r from-blue-500 to-green-500"
                                }}
                                aria-label="Card Progress"
                            />
                            <h2
                                style={{
                                    marginBottom: "16px",
                                    marginLeft: `${cardIndex/51*100}%`
                                }}
                                className="transition-all duration-500"
                            >
                                <span className="absolute -translate-x-1/2">
                                    <span>{cardIndex + 1}</span>
                                    <span className="text-xs">/52</span>
                                </span>
                            </h2>
                            <img src={Cards[cardIndex]} className="w-1/2 mx-auto" />
                        </>
                        : <h1>Everything scanned! Press save to continue...</h1>
                    }
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
                        startContent={
                            <FaFloppyDisk />
                        }
                        onClick={handleIncrementCardIndex}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});

export const ScanAllModal = memo(_Modal);
