import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
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

import CreatePost from '../CreatePost/createPost';
import Postcard from '../PostCard/Postcard';
import { getChannel, removePost } from '../../helpers/apiClientServer';
import ChannelNavBar from './ChannelNavBar/ChannelNavBar';
// import ForLater from '../ForLater/ForLater';

interface Props {
  name: string;
}

const Channel: React.FC<Props> = ({ name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const channel = useSelector<State, Channel>((state) => state.currChannel);
  const [posts, setPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    if (channel.id) {
      getChannel(channel.id).then((result: ChannelAndUsers) => {
        setPosts(result.channel.posts);
      });
    }
  }, [channel]);

  function deletePost(postId: string, userId: number) {
    removePost(postId, userId).then(() => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    });
  }

  return (
    <div className="container">
      <ChannelNavBar name={name} />
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
      !(posts && posts.length) ? (<Text>Be the first to post</Text>) : (
      <Container position="relative" top="150px">
        {posts
          .sort(
            (
              a: { createdAt: string | number | Date },
              b: { createdAt: string | number | Date }
            ) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
          )
          .map((post) => (
            <Postcard key={post.id} post={post} deletePost={deletePost} />
          ))}
      </Container>
      ){}
    </div>
  );
};

export default Channel;
