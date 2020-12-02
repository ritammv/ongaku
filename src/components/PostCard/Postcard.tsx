import { Container, Box, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillBookmarksFill, BsChevronDown } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { post } from './mockCard';
import * as apiclient from '../../helpers/apiClient';
import './Postcard.scss';



const Postcard: React.FC = () => {

  const [savePost, setSavePost] = useState<boolean>(false);
  const user = useSelector<State, User>((state) => state.user);
  
  function handleComments() {
    console.log('toggle the comments');
  }

  function handleSave() {
    console.log('toggle saving post');
    apiclient.savePost(user.id, post.id);
    setSavePost(!savePost);
  }

  return (
    <Container
      border='1px solid #d2d2d2'
      w='90%'
      display='flex'
      flexDir='column'
      marginY='1.5rem'
    >
      <div className='message_tile'>
        <div className="tile_image">
          <img src={post.image} alt='release' />
        </div>
        <div className='tile_info'>
          {post.title && post.title.length && 
          <Box isTruncated>Title: {post.title}</Box>}
          {post.artists && post.artists.length && 
          <Box isTruncated>Artist: {post.artists[0].name} </Box>}
          {post.labels && post.labels.length && 
          <Box isTruncated>Label: {post.labels[0].name}</Box>}
          {post.year && 
          <Box isTruncated>Year: {post.year}</Box>}
        </div>
        {
            !savePost
              ?
                <IconButton 
                  aria-label="Add to List"
                  icon={<HiOutlinePlus />}
                  position='relative'
                  top='-10px'
                  right='-15px'
                  onClick={handleSave}
                />

              :
                <IconButton 
                  aria-label="Add to List"
                  icon={<BsFillBookmarksFill />}
                  position='relative'
                  top='-10px'
                  right='-15px'
                  onClick={handleSave}
                />

          }

      </div>

      <div className='message_content'>
        <div className="message_title">
          {post.message_title}
        </div>
        <Box 
          className="message_body"
          noOfLines={5}
        >
          {post.message_body}
        </Box>

        <div className="message_stats">
          <div className="stats_comments">
            <IconButton 
              size='sm'
              aria-label="See comments" 
              icon={<BsChevronDown />}
              onClick={handleComments}
            />
            {post.comments.length} comments
          </div>
          <div className="stats_author">
            Posted by <b>{post.username}</b>
          </div>

        </div>

      </div>
     
    </Container>
  );
};

export default Postcard;