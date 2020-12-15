import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  useDisclosure,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
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

const Channel: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const currUser = useSelector<State, User>((state) => state.user);
  const savedPosts = useSelector<State, Post[]>(
    (state: State) => state.savedPosts
  );
  const channel = useSelector<State, Channel>((state) => state.currChannel);

  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isSubsribed, setIsSubscribed] = useState<Boolean>(
    !!currUser.channels.filter((chan) => chan.id === channel.id).length
  );
  const [copyValue, setCopyValue] = useState(`${channel.id}`);

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(copyValue);

  const close = () => {
    setOpen(false);
    onCopy();
  };

  useEffect(() => {
    dispatch(actions.setIsLoading(true));

    if (channel.id) {
      getChannel(channel.id)
        .then((result: ChannelAndUsers) => {setPosts(result.channel.posts);})
        .finally(() => dispatch(actions.setIsLoading(false)));
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
    <div className="container channel">
      <ChannelNavBar name={channel.name} />
      <Suspense fallback={<Spinner />}>
        <div className="channel_btn_container">
          {!channel.private || channel.ownerId !== currUser.id ? (
            <button
              className="genre_tag_button one"
              style={{
                backgroundColor: isSubsribed ? '#607382' : 'inherit',
              }}
              onClick={handleSubscribe}
              type="button"
            >
              {currUser.channels.filter((chan) => chan.id === channel.id)
                .length
                ? 'unsubscribe'
                : 'subscribe'}
            </button>
          ) : null}
          {currUser.id === channel.ownerId && channel.private ? (
            <button
              className="genre_tag_button one "
              style={{ backgroundColor: '#607382' }}
              onClick={() => setOpen(true)}
              type="button"
            >
              + Invite
            </button>
          ) : null}

          <button
            type="button"
            className="genre_tag_button one"
            style={{ backgroundColor: '#607382' }}
            onClick={onOpen}
          >
            + Create Post
          </button>
        </div>
        <AlertDialog
          leastDestructiveRef={closeRef}
          isOpen={open}
          onClose={close}
        >
          <AlertDialogContent
            style={{
              backgroundColor: '#2d3848',
              color: '#ffff',
              marginTop: '100px',
            }}
          >
            <AlertDialogHeader>
              Invite your friends to your private channel with this code!
            </AlertDialogHeader>
            <textarea
              style={{
                textAlign: 'center',
                backgroundColor: '#2d3848',
                color: '#ffff',
              }}
              value={copyValue}
            >
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="100%" backgroundColor="#2d3848">
            <ModalCloseButton color="#ffff" />
            <ModalBody>
              <CreatePost />
            </ModalBody>
          </ModalContent>
        </Modal>
        {!posts.length ? (
          <h1
            style={{
              position: 'relative',
              top: '180px',
              textAlign: 'center',
            }}
          >
            Be the first to post
          </h1>
        ) : (
          <div className="postcard-container">
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
                <div key={post.id} className="postcard_inner_container">
                  <Postcard
                    post={post}
                    deletePost={deletePost}
                    savedPosts={savedPosts}
                  />
                </div>
              ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Channel;
