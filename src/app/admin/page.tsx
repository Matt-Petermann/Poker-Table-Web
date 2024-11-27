"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
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

    const { cardHashes, handleUpdateCardHash } = useTableContext();
    const hasSomeHashes = useMemo(() => cardHashes.some(ch => ch.hash), [cardHashes]);

    return (
        <>
            <TestScanModal ref={testScanModal} />
            <ScanAllModal ref={scanAllModal} />
            <ConfirmClearAllModal ref={confirmClearAllModal} />
            <main className="pt-4 space-y-8" onClick={() => setSelectedCardIndex(null)}>
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
                        onClick={() => testScanModal.current?.onOpen()}
                    >
                        Test
                    </Button>
                    <Button
                        size="lg"
                        color="primary"
                        startContent={<FaBarcode />}
                        onClick={() => {
                            setSelectedCardIndex(null);
                            scanAllModal.current?.onOpen();
                        }}
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
                <div className="grid grid-cols-6 w-3/4 mx-auto">
                    {CardImages.map((img, idx) => (
                        <div className="relative" key={idx}>
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
                                onClick={() => handleUpdateCardHash(idx, null)}
                            />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
