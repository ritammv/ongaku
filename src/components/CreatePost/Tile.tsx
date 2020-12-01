import React from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';

interface Props {
  artist: string
  title: string
  image: string

}

const Tile: React.FC<Props> = ({ artist, title, image }) => {

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={image} alt={title} />
      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
        border='1px solid #e2e4e4'
      >
        <Box
          p='10px'
        
        >
          <p>Title: {title}</p>
          <p>Artist: {artist}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Tile;