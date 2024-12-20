import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

import type { Player } from "@/types/player";
import { useTableContext } from "@/contexts/tableContext";

export interface EditPlayerModalRef {
    /** Open the edit player modal. */
    openModal: () => void;
}

interface EditPlayerModalProps {
    /** Player to edit with this modal. */
    player: Player;
}

const EditPlayerModal = forwardRef<EditPlayerModalRef, EditPlayerModalProps>(({ player }, ref) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { handleUpdatePlayer } = useTableContext();

    /**
     * Update player name
     */
    const handleSave = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        // Update the player name
        handleUpdatePlayer(player.id, {
            ...player,
            name: ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
        });

        // Close the modal
        onClose();
    }, []);

    useImperativeHandle(ref, () => ({
        openModal: onOpen
    }));

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="xl"
            disableAnimation
            hideCloseButton
        >
            <ModalContent className="bg-opacity-50 backdrop-blur-md">
                <form onSubmit={handleSave}>
                    <ModalBody>
                        <Input
                            autoFocus
                            variant="underlined"
                            color="primary"
                            label="Name"
                            size="lg"
                            defaultValue={player.name ?? ""}
                            aria-label="Name"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className="rounded-full"
                            variant="ghost"
                            color="danger"
                            startContent={<FaX />}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-full"
                            variant="ghost"
                            color="success"
                            startContent={<FaFloppyDisk />}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
});

export default React.memo(EditPlayerModal);