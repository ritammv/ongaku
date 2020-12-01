import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,

} from '@chakra-ui/react';
import SearchPost from './SearchPost';


const Createpost: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent 
          backgroundColor='#f0f1ef'
          h='90%'
          w='97%'
        >
          <ModalCloseButton />
          <ModalBody
            overflow='scroll'
          >
            <SearchPost />
            
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default Createpost;