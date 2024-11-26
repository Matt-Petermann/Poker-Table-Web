"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaArrowLeft, FaBarcode } from "react-icons/fa6";
import CardImages from "@/lib/cards";

export default () => {
    const disclosure = useDisclosure();

    return (
        <>
            <Modal {...disclosure} hideCloseButton size="4xl" isDismissable={false}>
                <ModalContent className="backdrop-blur-md bg-opacity-25">
                    <ModalHeader>Scan all Cards</ModalHeader>
                    <ModalBody>Stepper, Card Image</ModalBody>
                    <ModalFooter>Cancel, Save</ModalFooter>
                </ModalContent>
            </Modal>
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
                        onClick={() => disclosure.onOpen()}
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
