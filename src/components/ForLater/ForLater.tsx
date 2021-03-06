import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Text } from '@chakra-ui/react';
import ChannelNavBar from '../Channel/ChannelNavBar/ChannelNavBar';
import { getForLater, removeSavedPost } from '../../helpers/apiClientServer';
import * as actions from '../../store/actionCreators';
import Postcard from '../PostCard/Postcard';

const ForLater: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<State, User>((state: State) => state.user);
  const savedPosts = useSelector<State, Post[]>(
    (state: State) => state.savedPosts
  );
  // const [savePost, setSavePost] = useState<boolean>(true);

  function deletePost(postId: string, userId: number) {
    removeSavedPost(postId, userId).then(() =>
      dispatch(actions.savedPost(savedPosts.filter((p) => p.id !== postId)))
    );
  }

  return (
    <div
      className="container container_for_later"
      style={{ marginBottom: '150px' }}
    >
      <ChannelNavBar name="forLater" />
      {!(savedPosts && savedPosts.length) ? (
        <Container position="relative" top="100px">
          <Text>This is your personal space to save posts for later</Text>
        </Container>
      ) : (
        <Container
          position="relative"
          top="120px"
          style={{ backgroundColor: '#2d3848' }}
        >
          {savedPosts &&
            savedPosts
              .sort(
                (
                  a: { createdAt: string | number | Date },
                  b: { createdAt: string | number | Date }
                ) =>
                  new Date(b.createdAt).valueOf() -
                  new Date(a.createdAt).valueOf()
              )
              .map((savedPost) => (
                <Postcard
                  key={savedPost.id}
                  post={savedPost}
                  deletePost={deletePost}
                  savedPosts={savedPosts}
                />
              ))}
        </Container>
      )}
      ;
    </div>
  );
};

export default ForLater;
