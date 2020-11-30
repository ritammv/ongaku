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
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from '@chakra-ui/react';

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

          <Tabs>
            <TabList 
              display='flex'
              justifyContent='space-between'
              mt='45px'
              color='#d3d3d3'
            >
              <Tab _focus={{ outline: 0 }}>Search</Tab>
              <Tab _focus={{ outline: 0 }}>Collection</Tab>
              <Tab _focus={{ outline: 0 }}>Wantlist</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

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