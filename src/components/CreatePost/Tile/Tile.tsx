import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import './tile.scss';
import vinyl from '../../../assets/ongaku-bg.svg';

interface Props {
  result: Release;
  selected: Release;
  setSelected: Function;
}

const Tile: React.FC<Props> = ({ result, selected, setSelected }) => {
  return (
    <Box
      w="150px"
      h="170px"
      m="7px"
      p="7px"
      borderWidth="1px"
      overflow="hidden"
      onClick={() => {
        setSelected(result);
      }}
      className={result.id === selected.id ? 'activeCard' : undefined}
    >
      {result.image ? (
        <Image src={result.image} alt="release" h="120px" w="150px" />
      ) : (
        <Image src={vinyl} alt="release" h="120px" w="150px" />
      )}

      <Box isTruncated fontSize="12px">
        <Text isTruncated>Title: {result.title}</Text>
        {result.artists && result.artists.length && (
          <Text isTruncated>Artist: {result.artists[0].name}</Text>
        )}
      </Box>
    </Box>
  );
};

export default Tile;
