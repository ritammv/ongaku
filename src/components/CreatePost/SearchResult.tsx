import React, { useEffect } from 'react';
import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import Tile from './Tile/Tile';
import Createbutton from './CreateButton';


interface Props {
  search: Release[],
  setSearch: Function
  selected: Release
  setSelected: Function  
}

const SearchResult: React.FC<Props> = 
({ search, setSearch, selected, setSelected }) => {


  useEffect(() => {
    setSelected({
      id: 0,
      title: '',
      artist: '',
      cover_image: '',
    });
  }, [setSelected]);

  const searchColums: number = Math.floor(search.length/3 + 1);

  return (
    <>
      <SimpleGrid 
        columns={[searchColums, null, 3]} 
        spacing='5px'
      >
        {search.slice(0, 150).map(result => (
          <Tile 
            result={result}
            key={result.id}
            selected={selected} 
            setSelected={setSelected}
          />
        ))}

      </SimpleGrid>

      <Flex justify='center'>
        <Button 
          border='0.3px solid #d3d3d3' 
          color='#d3d3d3'
          fontSize='2rem'
          borderRadius='12px'
          padding='2% 5%'
          fontWeight='lighter'
          mr={3}
          onClick={() => setSearch([])}
          position='absolute'
          left='20px'
          
        >
          {'<'}
        </Button> 
        <Createbutton selected={selected} />
      </Flex>
    </>
  );
};

export default SearchResult;
