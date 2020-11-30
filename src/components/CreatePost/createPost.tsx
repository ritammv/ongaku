import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from '@chakra-ui/react';
import PostForm from './PostForm';

interface Props {

}

const Createpost: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal 
        blockScrollOnMount={false} 
        isOpen={isOpen} 
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent 
          backgroundColor='#f0f1ef'
          h='90vh'
        >
          <ModalCloseButton />

          <PostForm />

          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              You can scroll the content behind the modal
            </Text>
            
          </ModalBody>

          <ModalFooter>
            <Button 
              className='button-default' 
              backgroundColor='#0f0e0e' 
              color='white'
              borderRadius='25px'
              padding='2% 5%'
              fontWeight='lighter'
              mr={3} 
              onClick={onClose}
            >
              NEXT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default Createpost;