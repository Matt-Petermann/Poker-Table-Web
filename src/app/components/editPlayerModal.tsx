import { CustomAvatar } from "@/lib/avatars";
import { Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react";
import { forwardRef, useImperativeHandle } from "react";

export interface EditPlayerModalRef {
  /** Open the edit player modal. */
  openModal: () => void
}

interface EditPlayerModal {
  /** Avatar to edit with this modal. */
  avatar: CustomAvatar
}

const EditPlayerModal = forwardRef<EditPlayerModalRef, EditPlayerModal>(({ avatar }, ref) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal: onOpen
  }));
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})

export default EditPlayerModal;
