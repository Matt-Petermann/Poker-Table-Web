import { forwardRef, useImperativeHandle, useRef } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

import { CustomAvatar } from "@/lib/avatars";
import { useTableContext } from "../contexts/tableContext";

export interface EditPlayerModalRef {
    /** Open the edit player modal. */
    openModal: () => void;
}

interface EditPlayerModal {
    /** Avatar to edit with this modal. */
    avatar: CustomAvatar;
}

const EditPlayerModal = forwardRef<EditPlayerModalRef, EditPlayerModal>(
    ({ avatar }, ref) => {
        const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
        const { refresh } = useTableContext();

        const inputRef = useRef<HTMLInputElement>(null);

        /**
         * Update player name
         */
        const save = () => {
            // Update the player name
            avatar.playerName = inputRef.current?.value;
            refresh();

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
                            defaultValue={avatar.playerName}
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
    }
);

export default EditPlayerModal;
