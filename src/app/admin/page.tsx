"use client";

import { useRef } from "react";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaBarcode } from "react-icons/fa6";

import CardImages from "@/lib/cards";
import { ScanAllModal } from "./components/scanAllModal";

export default () => {
    const scanAllModal = useRef<ScanAllModal>(null);

    return (
        <>
            <ScanAllModal ref={scanAllModal} />
            <main className="pt-4 space-y-8">
                <Button
                    as="a"
                    color="success"
                    className="fixed top-2 right-2 z-10"
                    startContent={<FaArrowLeft />}
                    href="/"
                >
                    Return to Table
                </Button>
                <div className="flex">
                    <Button
                        size="lg"
                        color="primary"
                        startContent={<FaBarcode />}
                        className="mx-auto"
                        onClick={() => scanAllModal.current?.onOpen()}
                    >
                        Scan All
                    </Button>
                </div>
                <div className="grid grid-cols-6 w-3/4 mx-auto">
                    {CardImages.map((img, idx) => (
                        <img
                            src={img.src}
                            className="inline-block p-2"
                            key={idx}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
