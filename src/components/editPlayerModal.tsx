import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

import type { Player } from "@/types/player";
import { useTableContext } from "@/contexts/tableContext";

export interface EditPlayerModal {
    /** Open the edit player modal. */
    openModal: () => void;
}

interface EditPlayerModalProps {
    /** Player to edit with this modal. */
    player: Player;
}

export const EditPlayerModal = forwardRef<EditPlayerModal, EditPlayerModalProps>(({ player }, ref) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { handleUpdatePlayers } = useTableContext();
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Update player name
     */
    const save = () => {
        // Update the player name
        handleUpdatePlayers(player.id, {
            ...player,
            name: inputRef.current?.value ?? null
        })

        // Close the modal
        onClose();
    };

    useImperativeHandle(ref, () => ({
        openModal: onOpen
    }));

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalBody>
                    <Input
                        ref={inputRef}
                        autoFocus
                        variant="underlined"
                        color="primary"
                        label="Name"
                        defaultValue={player.name ?? ""}
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
                        className="rounded-full"
                        variant="ghost"
                        color="success"
                        startContent={<FaFloppyDisk />}
                        onClick={save}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
