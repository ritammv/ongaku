import React, { useEffect, useRef, useState } from 'react';
import { useDisclosure, Button, Container, ModalOverlay, Modal, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import SideBar from '../Dashboard/SideBar/SideBar';
import vinyl from '../../assets/vinyl.jpg';
import CreatePost from '../CreatePost/CreatePost';
import * as apiClientServer from '../../helpers/apiClientServer';

interface Props {
  name: string
}

const Channel: React.FC<Props> = ({ name }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <div className="container">
      <div className="header">
        <div className="user_info">
          {' '}
          <img src={vinyl} alt="vinyl_image" />
        </div>
        <div className="channel_title">
          #{name.toUpperCase()}
        </div>
        <div className="welcome_user">
          <button
            className="button_emoji"
            type="button"
            ref={btnRef}
            onClick={() => {
              setShowSideBar((state) => !state);
            }}
          >
            +
          </button>
        </div>
        <div className="dashboard_info">
          <h3>2098 Members</h3> <h3>13209 Posts</h3>
        </div>
        <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      </div>
      <Container
        display='flex'
        justifyContent='center'
      >
        <Button 
          backgroundColor='#0f0e0e'
          w='40%'
          marginY='1rem'
          textTransform='uppercase'
          className='genre_tag_button' 
          onClick={onOpen}
        >
          + Create Post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent backgroundColor="#f0f1ef" h="100%" w="97%">
            <ModalCloseButton />
            <ModalBody overflow="scroll">
              <CreatePost />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
};

export default Channel;
