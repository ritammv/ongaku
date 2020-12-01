import React, { useEffect } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChannel: React.FC<Props> = ({ showModal, setShowModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) onOpen();
  }, [showModal, onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInRight"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a channel</ModalHeader>
        <ModalCloseButton onClick={() => handleClose()} />
        <ModalBody>
          <form>
            <label htmlFor="channel_title">
              Channel Title
              <input
                className="search_input"
                id="channel_title"
                type="text"
                placeholder="#"
              />
            </label>
            <label htmlFor="channel_privacy">
              Public or Private?
              <input
                className="search_input"
                id="channel_privacy"
                type="text"
              />
            </label>
            <label htmlFor="channel_category">
              Categories
              <input
                className="search_input"
                id="channel_category"
                type="text"
              />
            </label>
          </form>
        </ModalBody>

        <ModalFooter>
          <button className="genre_tag_button" type="button">
            Create!
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannel;
