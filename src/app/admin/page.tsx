"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Snippet } from "@nextui-org/react";
import { FaArrowLeft, FaBarcode, FaLayerGroup, FaTrash } from "react-icons/fa6";

import CardImages from "@/lib/cards";
import { useTableContext } from "@/contexts/tableContext";
import { TestScanModal } from "./components/testScanModal";
import { ScanAllModal } from "./components/scanAllModal";
import { ConfirmClearAllModal } from "./components/confirmClearAllModal";

export default () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const testScanModal = useRef<TestScanModal>(null);
    const scanAllModal = useRef<ScanAllModal>(null);
    const confirmClearAllModal = useRef<ConfirmClearAllModal>(null);

    const { cardHashes, handleUpdateCardHash, newlyScannedCards, handlePopNewlyScannedCards } = useTableContext();
    const hasSomeHashes = useMemo(() => cardHashes.some(ch => ch.hash), [cardHashes]);
    const hashCount = useMemo(() => cardHashes.reduce((count, ch) => ch.hash ? count + 1 : count, 0), [cardHashes]);

    /**
     * Clear the selected card index and open the test scan modal.
     */
    const handleOpenTestScan = useCallback(() => {
        setSelectedCardIndex(null);
        testScanModal.current?.onOpen()
    }, []);

    /**
     * Clear the selected card index and open the scan all modal.
     */
    const handleOpenScanAll = useCallback(() => {
        setSelectedCardIndex(null);
        scanAllModal.current?.onOpen();
    }, []);

    /** When a new card is scanned, record it. */
    useEffect(() => {
        const finalIndex = newlyScannedCards.length - 1;
        if(selectedCardIndex !== null && finalIndex >= 0) {
            handleUpdateCardHash(selectedCardIndex, newlyScannedCards[finalIndex]);
            handlePopNewlyScannedCards();
            setSelectedCardIndex(null);
        }
    }, [newlyScannedCards]);

    return (
        <>
            <TestScanModal ref={testScanModal} />
            <ScanAllModal ref={scanAllModal} />
            <ConfirmClearAllModal ref={confirmClearAllModal} />
            <main className="pt-4 space-y-8 max-h-screen overflow-hidden" onClick={() => setSelectedCardIndex(null)}>
                <Button
                    as="a"
                    color="success"
                    className="fixed top-2 right-2 z-10"
                    startContent={<FaArrowLeft />}
                    href="/"
                >
                    Return to Table
                </Button>
                <div className="flex place-content-center gap-2">
                    <Button
                        size="lg"
                        color="warning"
                        startContent={<FaLayerGroup />}
                        onClick={handleOpenTestScan}
                    >
                        Test
                    </Button>
                    <Button
                        size="lg"
                        color="primary"
                        startContent={<FaBarcode />}
                        onClick={handleOpenScanAll}
                    >
                        Scan All
                    </Button>
                    <Button
                        size="lg"
                        color="danger"
                        startContent={<FaTrash />}
                        isDisabled={!hasSomeHashes}
                        onClick={() => confirmClearAllModal.current?.onOpen()}
                    >
                        Clear All
                    </Button>
                </div>
                <Snippet
                    hideSymbol
                    hideCopyButton
                    color="primary"
                    size="lg"
                    className="block w-fit border-2 border-primary-300 mx-auto"
                >
                    <p>
                        <span className={`${hashCount < 52 && "text-red-400"}`}>{hashCount}</span>
                        <span>/52 cards scanned.</span>
                    </p>
                </Snippet>
                <div className="grid grid-cols-6 w-3/4 mx-auto max-h-[75vh] overflow-y-scroll">
                    {CardImages.map((img, idx) => (
                        <div className="w-fit relative" key={idx}>
                            <img
                                src={img.src}
                                className={`
                                    inline-block p-2 rounded-xl hover:cursor-pointer
                                    ${idx === selectedCardIndex && "bg-yellow-500"}
                                    ${!cardHashes[idx].hash && idx !== selectedCardIndex && "opacity-25"}
                                `}
                                onClick={e => {
                                    e.stopPropagation();
                                    setSelectedCardIndex(prevIdx => prevIdx === idx ? null : idx);
                                }}
                            />
                            <Button
                                isIconOnly
                                color="danger"
                                size="lg"
                                startContent={<FaTrash />}
                                className={`
                                    absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    ${!(idx === selectedCardIndex && cardHashes[idx].hash) && "hidden"}
                                `}
                                onClick={() => {
                                    handleUpdateCardHash(idx, null);
                                    setSelectedCardIndex(null);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
