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
  Button,
  AlertDialog,
  Flex,
  AlertDialogHeader,
  AlertDialogContent,
  useClipboard,
} from '@chakra-ui/react';
import CreatePost from '../CreatePost/createPost';
import Postcard from '../PostCard/Postcard';
import ChannelNavBar from './ChannelNavBar/ChannelNavBar';
import Spinner from '../Spinner/Spinner';
import {
  getChannel,
  removePost,
  subscribeToChannels,
  unsubscribeFromChannel,
} from '../../helpers/apiClientServer';
import * as actions from '../../store/actionCreators';

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
  const savedPosts = useSelector<State, Post[]>(
    (state: State) => state.savedPosts
  );
  const channel = useSelector<State, Channel>((state) => state.currChannel);
  const [copyValue, setCopyValue] = useState(`${channel.id}`);
  const { hasCopied, onCopy } = useClipboard(copyValue);

  const isLoading = useSelector<State, boolean>((state) => state.isLoading);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isSubsribed, setIsSubscribed] = useState<Boolean>(
    !!currUser.channels.filter((chan) => chan.id === channel.id).length
  );

  const close = () => {
    setOpen(false);
    onCopy();
  };

  useEffect(() => {
    if (channel.id) {
      setTimeout(() => {
        getChannel(channel.id)
          .then((result: ChannelAndUsers) => {
            setPosts(result.channel.posts);
          })
          .finally(() => dispatch(actions.setIsLoading(false)));
      }, 2000);
    } else {
      history.push('/dashboard');
    }
  }, [channel, dispatch, history]);

  const deletePost = (postId: string, userId: number) => {
    removePost(postId, userId).then(() => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    });
  };

  const handleSubscribe = () => {
    if (isSubsribed) {
      unsubscribeFromChannel(currUser.id, channel).then(() => {
        dispatch(actions.unsubscribeChannel(channel));
        setIsSubscribed((current) => !current);
      });
    } else {
      subscribeToChannels(currUser.id, [channel]).then(() => {
        dispatch(actions.addChannel(channel));
        setIsSubscribed((current) => !current);
      });
    }
  };

  return (
    <div className="container">
      <ChannelNavBar name={name} />
      <div className="">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Container position="fixed" top="100px">
              <Flex justify="center">
                <div className="channel_buttons_container">
                  {!channel.private || channel.ownerId !== currUser.id ? (
                    <button
                      className={`genre_tag_button ${
                        isSubsribed ? 'two' : 'one'
                      }`}
                      onClick={handleSubscribe}
                      type="button"
                    >
                      {isSubsribed ? 'unsubscribe' : 'subscribe'}
                    </button>
                  ) : null}
                  {currUser.id === channel.ownerId && channel.private ? (
                    <button
                      className="genre_tag_button two "
                      onClick={() => setOpen(true)}
                      type="button"
                    >
                      + Invite
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className="genre_tag_button two"
                    onClick={onOpen}
                  >
                    + Create Post
                  </button>
                </div>
              </Flex>
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
                <textarea style={{ textAlign: 'center' }} value={copyValue}>
                  {channel.id}
                </textarea>
                <button
                  style={{ width: '100%' }}
                  type="button"
                  className="genre_tag_button two"
                  ref={closeRef}
                  onClick={close}
                >
                  Copy to clipboard
                </button>
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
            {!posts.length ? (
              <h1
                style={{
                  position: 'relative',
                  top: '150px',
                  textAlign: 'center',
                }}
              >
                Be the first to post
              </h1>
            ) : (
              <Container position="relative" top="130px">
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
                    <Postcard
                      key={post.id}
                      post={post}
                      deletePost={deletePost}
                      savedPosts={savedPosts}
                    />
                  ))}
              </Container>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Channel;
