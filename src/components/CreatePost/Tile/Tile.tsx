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
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="175px"
      h="175px"
      m="7px"
      p="7px"
      borderWidth="1px"
      overflow="hidden"
      onClick={() => {
        setSelected(result);
      }}
      className={result.id === selected.id ? 'activeCard' : 'text'}
    >
      {result.image ? (
        <Image
          src={result.image}
          alt="release"
          h="125px"
          w="125px"
          alignSelf="center"
        />
      ) : (
        <Image
          src={vinyl}
          alt="release"
          h="125px"
          w="125px"
          alignSelf="center"
        />
      )}

      <Box
        isTruncated
        fontSize="12px"
        className={result.id === selected.id ? 'activeCard' : 'text'}
      >
        <Text
          className={result.id === selected.id ? 'activeCard' : 'text'}
          isTruncated
        >
          Title: {result.title}
        </Text>
        {result.artists && result.artists.length && (
          <Text
            className={result.id === selected.id ? 'activeCard' : 'text'}
            isTruncated
          >
            Artist: {result.artists[0].name}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Tile;
