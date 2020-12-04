import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure, Button, Container, ModalOverlay, Modal, ModalContent, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import SideBar from '../Dashboard/SideBar/SideBar';
import vinyl from '../../assets/vinyl.jpg';
import CreatePost from '../CreatePost/FinalCreatePost/FinalCreatePost';
import Postcard from '../PostCard/Postcard';


interface Props {
  name: string
}

const Channel: React.FC<Props> = ({ name }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const channels = useSelector<State, Channel[]>(
    (state) => state.user.channels
  );
    // SET THIS TO CHANNEL WHERE STATE IS ACTIVE
  const [channel, setChannel] = useState(channels[0]);

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
          <ModalContent backgroundColor="#f0f1ef" w="97%">
            <ModalCloseButton />
            <ModalBody>
              <CreatePost />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
             
      {
        !(channel.posts && channel.posts.length)
          ?
            <Text>
              Be the first to post
            </Text>
          :
            <>
              {
          channel.posts        
            .sort((
              a: { createdAt: string | number | Date; }, 
              b: { createdAt: string | number | Date; }) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
            .map((post) => (
              <Postcard key={post.id} post={post} />
            ))
        }
            </>
      }

    </div>
  );
};

export default Channel;
