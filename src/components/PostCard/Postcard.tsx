import { Container, Box, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsFillBookmarksFill, BsChevronDown } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import * as apiclient from '../../helpers/apiClient';
import { mockPost } from './mockCard';
import './Postcard.scss';

// interface Props {
//   post: Post
// }

const Postcard: React.FC = () => {
  const post: Post = mockPost;

  const [savePost, setSavePost] = useState<boolean>(false);
  const [author, setAuthor] = useState<User>({
    id: '',
    discogsId: 0,
    username: '',
    avatarUrl: '',
    wantsUrl: '',
    collectionUrl: '',
  });

  useEffect(() => {
    async function getAuthor() {
      const result = apiclient.getUser(post.userId);
      setAuthor(await result);
    }
    getAuthor();
  }, [post.userId]);

  function handleComments() {
    console.log('toggle the comments');
  }

  function handleSave() {
    console.log('toggle saving post');
    if (savePost) {
      apiclient.savePost(author.id, post.id);
      setSavePost(!savePost);
    } else {
      console.log('delete post from My List');
    }
  }

  return (
    <Container
      border="1px solid #d2d2d2"
      w="90%"
      display="flex"
      flexDir="column"
      marginY="1.5rem"
    >
      <div className="message_tile">
        <div className="tile_image">
          <img src={post.thumbnail} alt="release" />
        </div>
        <div className="tile_info">
          {post.title && <Box isTruncated>Title: {post.title}</Box>}
          {post.artist && <Box isTruncated>Artist: {post.artist} </Box>}
          {post.label && <Box isTruncated>Label: {post.label}</Box>}
          {post.year && <Box isTruncated>Year: {post.year}</Box>}
        </div>
        {!savePost ? (
          <IconButton
            aria-label="Add to List"
            icon={<HiOutlinePlus />}
            position="relative"
            top="-10px"
            right="-15px"
            onClick={handleSave}
          />
        ) : (
          <IconButton
            aria-label="Add to List"
            icon={<BsFillBookmarksFill />}
            position="relative"
            top="-10px"
            right="-15px"
            onClick={handleSave}
          />
        )}
      </div>

      <div className="message_content">
        <div className="message_title">{post.title}</div>
        <Box className="message_body" noOfLines={5}>
          {post.body}
        </Box>

        <div className="message_stats">
          <div className="stats_comments">
            <IconButton
              size="sm"
              aria-label="See comments"
              icon={<BsChevronDown />}
              onClick={handleComments}
            />
            {post.comments.length} comments
          </div>
          <div className="stats_author">
            Posted by <b>{author.username}</b>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Postcard;
