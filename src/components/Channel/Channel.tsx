import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  useDisclosure,
  Container,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
} from '@chakra-ui/react';
import CreatePost from '../CreatePost/createPost';
import Postcard from '../PostCard/Postcard';
import {
  getChannel,
  removePost,
  subscribeToChannels,
  unsubscribeFromChannel,
} from '../../helpers/apiClientServer';
import * as actions from '../../store/actionCreators';
import ChannelNavBar from './ChannelNavBar/ChannelNavBar';
import './Channel.scss';

interface Props {
  name: string;
}

const Channel: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector<State, User>((state) => state.user);
  const [open, setOpen] = useState(false);

  const closeRef = useRef<HTMLButtonElement | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [savePost, setSavePost] = useState<boolean>(false);
  const channel = useSelector<State, Channel>((state) => state.currChannel);
  const [posts, setPosts] = useState<Post[] | []>([]);

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (channel.id) {
      getChannel(channel.id).then((result: ChannelAndUsers) => {
        setPosts(result.channel.posts);
      });
    } else {
      history.push('/dashboard');
    }
  }, [channel]);

  function deletePost(postId: string, userId: number) {
    removePost(postId, userId).then(() => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    });
  }

  function handleSubscribe() {
    const result = currUser.channels.filter((chan) => chan.id === channel.id)
      .length;
    if (result) {
      unsubscribeFromChannel(currUser.id, channel);
      dispatch(actions.unsubscribeChannel(channel));
    } else {
      subscribeToChannels(currUser.id, [channel]);
      dispatch(actions.addChannel(channel));
    }
  }

  return (
    <div className="container">
      <ChannelNavBar name={name} />
      <Container display="flex" justifyContent="center">
        <Container className="channel_btn_container">
<<<<<<< HEAD
          <button
            className="genre_tag_button one"
=======
          <Button
            backgroundColor="#065dc2"
            className="genre_tag_button channel_btn"
>>>>>>> main
            onClick={handleSubscribe}
            type="button"
          >
            {currUser.channels.filter((chan) => chan.id === channel.id).length
              ? 'unsubscribe'
              : 'subscribe'}
<<<<<<< HEAD
          </button>
=======
          </Button>
          <Button
            backgroundColor="black"
            className="genre_tag_button channel_btn"
            onClick={() => setOpen(true)}
          >
            {' '}
            + Invite
          </Button>
>>>>>>> main

          <button
            className="genre_tag_button two"
            onClick={onOpen}
            type="button"
          >
            + Create Post
          </button>
        </Container>
        <AlertDialog
          leastDestructiveRef={closeRef}
          isOpen={open}
          onClose={close}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              Invite your friends to your private channel with this code!
            </AlertDialogHeader>
            <textarea>{channel.id}</textarea>
            <Button ref={closeRef} onClick={close}>
              Copy to clipboard
            </Button>
          </AlertDialogContent>
        </AlertDialog>
        ;
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
<<<<<<< HEAD
        <div className="channel_welcome">
          <Text textAlign="center" fontSize="30px" width="80%">
            This is the {name} channel !
          </Text>
          <Text textAlign="center" marginTop="2rem" fontSize="18px">
            Be the first to post
          </Text>
        </div>
=======
        <Text>Be the first to post</Text>
>>>>>>> main
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
<<<<<<< HEAD
              <Postcard key={post.id} post={post} deletePost={deletePost} />
=======
              <Postcard
                key={post.id}
                post={post}
                deletePost={deletePost}
                savePost={savePost}
                setSavePost={setSavePost}
              />
>>>>>>> main
            ))}
        </Container>
      )}
    </div>
  );
};

export default Channel;
