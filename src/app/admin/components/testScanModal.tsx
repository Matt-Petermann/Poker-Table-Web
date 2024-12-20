import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

import type { CardImage } from "@/types/cardImage";
import { useTableContext } from "@/contexts/tableContext";
import Cards from "@/lib/cards";

export interface TestScanModal {
    onOpen: () => void;
}

const _Modal = forwardRef<TestScanModal>((_props, ref) => {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const [scannedCard, setScannedCard] = useState<CardImage | null | undefined>();

    const { cardHashes, newlyScannedCards, handlePopNewlyScannedCards } = useTableContext();

    /** When a new card is scanned, record it. */
    useEffect(() => {
        const finalIndex = newlyScannedCards.length - 1;
        if(isOpen && finalIndex >= 0) {
            // Find a saved card by hash
            const foundCard = cardHashes.find(ch => ch.hash === newlyScannedCards[finalIndex]);

            // Set the scanned card and pop the last entry off the stack
            setScannedCard(foundCard ? Cards[foundCard.index] : null);
            handlePopNewlyScannedCards();
        }
    }, [newlyScannedCards]);

    useImperativeHandle(ref, () => ({
        onOpen: () => {
            setScannedCard(undefined);
            onOpenChange();
        }
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
                    {scannedCard
                        ? <img
                            src={scannedCard.src}
                            className="w-1/4 mx-auto"
                        />
                        : scannedCard === null
                            ? <Snippet
                                hideCopyButton
                                hideSymbol
                                color="danger"
                                size="lg"
                                className="mx-auto border-2 border-danger-300"
                            >
                                Card not found.
                            </Snippet>
                            : null
                    }
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
