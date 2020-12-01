import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import './tile.scss';

interface Props {
  result: Release;
  selected: Release;
  setSelected: Function;
}

const Tile: React.FC<Props> = ({
  result,
  selected,
  setSelected,
}) => {


  return (
    <Box
      maxW="120px"
      m="7px"
      p="7px"
      borderWidth="1px"
      overflow="hidden"
      onClick={() => {
        setSelected(result);
      }}
      className={result.id === selected.id ? 'activeCard' : undefined}
    >
      <Image src={result.image} alt={result.title} />
      <Box isTruncated fontSize="12px">
        <Text isTruncated>Title: {result.title}</Text>
        {
          result.artists && result.artists.length &&
          <Text isTruncated>Artist: {result.artists[0].name}</Text>
        }
      </Box>
    </Box>
  );
};

export default Tile;
