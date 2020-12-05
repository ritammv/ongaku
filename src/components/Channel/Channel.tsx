import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  IconButton,
  useDisclosure,
  Button,
  Container,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

import SideBar from '../Dashboard/SideBar/SideBar';
import vinyl from '../../assets/vinyl.jpg';
import CreatePost from '../CreatePost/createPost';
import Postcard from '../PostCard/Postcard';
import * as ApiClientServer from '../../helpers/apiClientServer';

interface Props {
  name: string;
}

const Channel: React.FC<Props> = ({ name }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const channel = useSelector<State, Channel>((state) => state.currChannel);
  const [posts, setPosts] = useState<Post[] | []>([]);

  // console.log('channel', channel);

  useEffect(() => {
    console.log(channel);

    if (channel.id) {
      ApiClientServer.getChannel(channel.id).then((result: ChannelAndUsers) => {
        console.log('allo');

        console.log(result);

        setPosts(result.channel.posts);
        onClose();
      });
    }
  }, []);

  return (
    <div className="container">
      <nav className="header">
        <img src={vinyl} alt="vinyl_image" />
        <div className="channel_title">@{name.toUpperCase()}</div>
        <div className="welcome_user">
          <IconButton
            className="button_emoji"
            aria-label="burger-icon"
            backgroundColor="inherit"
            size="lg"
            icon={<GiHamburgerMenu />}
            type="button"
            ref={btnRef}
            onClick={() => {
              setShowSideBar((state) => !state);
            }}
          />
        </div>
        <div className="dashboard_info">
          <h3>2098 Members</h3> <h3>1320 Posts</h3>
        </div>
        <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      </nav>

      <Container display="flex" justifyContent="center">
        <Button
          backgroundColor="#0f0e0e"
          w="40%"
          marginY="1rem"
          textTransform="uppercase"
          className="genre_tag_button"
          position="fixed"
          top="90px"
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

      {!(posts && posts.length) ? (
        <Text>Be the first to post</Text>
      ) : (
        <Container position="relative" top="150px">
          {posts
            .sort(
              (
                a: { createdAt: string | number | Date },
                b: { createdAt: string | number | Date }
              ) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            )
            .map((post) => (
              <Postcard key={post.id} post={post} />
            ))}
        </Container>
      )}
    </div>
  );
};

export default Channel;
