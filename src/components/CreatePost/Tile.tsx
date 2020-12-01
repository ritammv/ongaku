import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import '../../styles/tile.scss';

interface Props {
  artist?: string;
  title: string;
  image: string;
  result: Release | Want | SearchData;
  selected: Release | Want | SearchData;
  setSelected: Function;
}

const Tile: React.FC<Props> = ({
  artist,
  title,
  image,
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
        console.log('result', result);
        console.log('artist', artist);
        setSelected(result);
      }}
      className={result.id === selected.id ? 'activeCard' : undefined}
    >
      <Image src={image} alt={title} />
      <Box isTruncated fontSize="12px">
        <Text isTruncated>Title: {title}</Text>
        {
          artist &&
          <Text isTruncated>Artist: {artist}</Text>
        }
      </Box>
    </Box>
  );
};

export default Tile;
