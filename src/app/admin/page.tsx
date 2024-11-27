"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaBarcode, FaTrash } from "react-icons/fa6";

import CardImages from "@/lib/cards";
import { useTableContext } from "@/contexts/tableContext";
import { ScanAllModal } from "./components/scanAllModal";
import { ConfirmClearAllModal } from "./components/confirmClearAllModal";

export default () => {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const scanAllModal = useRef<ScanAllModal>(null);
    const confirmClearAllModal = useRef<ConfirmClearAllModal>(null);

    const { cardHashes } = useTableContext();
    const hasSomeHashes = useMemo(() => cardHashes.some(ch => ch.hash), [cardHashes]);

    return (
        <>
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
                        <img
                            src={img.src}
                            className={`
                                inline-block p-2 rounded-xl hover:cursor-pointer
                                ${idx === selectedCardIndex && "bg-yellow-500"}
                                ${!cardHashes[idx].hash && idx !== selectedCardIndex && "opacity-25"}
                            `}
                            key={idx}
                            onClick={e => {
                                e.stopPropagation();
                                setSelectedCardIndex(prevIdx => prevIdx === idx ? null : idx);
                            }}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
