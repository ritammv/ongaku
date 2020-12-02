import { Container, Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import { post } from './mockCard';
import './Postcard.scss';

const Postcard: React.FC = () => {
  

  return (
    <Container
      border='1px solid #d2d2d2'
      w='90%'
      display='flex'
      flexDir='column'
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
        <div className='tile_button'>
          <IconButton 
            aria-label="Add to List" 
            icon={<HiOutlinePlus />}
          />
        </div>
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
            {post.comments.length} comments
          </div>
          <div className="stats_author">
            Posted by {post.username}
          </div>

        </div>

      </div>
     
    </Container>
  );
};

export default Postcard;