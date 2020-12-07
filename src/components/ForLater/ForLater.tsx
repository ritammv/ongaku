import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Text } from '@chakra-ui/react';
import ChannelNavBar from '../Channel/ChannelNavBar/ChannelNavBar';
import { getForLater, removeSavedPost } from '../../helpers/apiClientServer';
import Postcard from '../PostCard/Postcard';

const ForLater: React.FC = () => {
  const user = useSelector<State, User>((state: State) => state.user);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    getForLater(user.id).then((posts: Post[]) => setSavedPosts(posts));
  }, [user.id]);

  function deletePost(postId: string, userId: number) {
    removeSavedPost(postId, userId).then(() => {
      setSavedPosts((prev) => prev.filter((p) => p.id !== postId));
    });
  }

  return (
    <div className="container">
      <ChannelNavBar name="forLater" />
      {!(savedPosts && savedPosts.length) ? (
        <Container position="relative" top="100px">
          <Text>This is your personal space to save posts for later</Text>
        </Container>
      ) : (
        <Container position="relative" top="80px">
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
                />
              ))}
        </Container>
      )}
      ;
    </div>
  );
};

export default ForLater;
