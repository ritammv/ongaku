import { Container, Box, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BsFillBookmarksFill, BsChevronDown } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import * as apiclient from '../../helpers/apiClient';
import { mockPost } from './mockCard';
import './Postcard.scss';

// interface Props {
//   // post: Post

// }

const Postcard: React.FC = () => {
  // TODO pass down post as prop and get username
  // (state or getUser via userId saved on post?)
  const post: Post = mockPost;

  // const [post, setPost] = useState<Post>({})
  const [savePost, setSavePost] = useState<boolean>(false);
  const [author, setAuthor] = useState<User>({
    id: 'c42a1eb1-129e-452e-9363-acea5f9b2d7c',
    discogsId: 0,
    username: 'Manji',
    avatarUrl: '',
    wantsUrl: '',
    collectionUrl: '',
    posts: [],
    channels: [],
    comments: [],
  });

  const history = useHistory();
  const date = moment(post.createdAt).format('lll');

  useEffect(() => {
    // async function getPost() {
    //   const result= apiclient.getPost(postId);
    //   setPost(await result);
    // }
    // getPost();
    // async function getAuthor() {
    //   const result= apiclient.getUser(post.userId);
    //   setAuthor(await result);
    // }
    // getAuthor();
  }, [post.userId]);

  function handleComments() {
    console.log('toggle the comments');
  }

  function handleSave() {
    console.log('toggle saving post');
    if (!savePost) {
      apiclient.savePost(author.id, post.id);
    } else {
      console.log('delete post from My List');
      apiclient.removeSavedPost(author.id, post.id);
    }
    setSavePost(!savePost);
  }

  return (
    <Container
      border="1px solid #d2d2d2"
      w="90%"
      display="flex"
      flexDir="column"
      marginY="1.5rem"
    >
      <div className="message_date">{date}</div>
      <div className="message_tile">
        <div
          className="tile_image"
          onClick={() => history.push(`/post/${post.id}`)}
          aria-hidden="true"
        >
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
