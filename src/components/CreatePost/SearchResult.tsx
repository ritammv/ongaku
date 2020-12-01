import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Tile from './Tile';
import Createbutton from './CreateButton';


interface Props {
  search: SearchData[],
  setSearch: Function
  selected: Release | Want | SearchData
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
  }, []);

  return (
    <>
      {search.slice(0, 50).map(result => (
        <Tile 
          result={result}
          key={result.id}
          title={result.title}
          image={result.cover_image}
          selected={selected} 
          setSelected={setSelected}
        />
      ))}
      <div>
        <Button 
          backgroundColor='#0f0e0e' 
          color='white'
          borderRadius='12px'
          padding='2% 5%'
          fontWeight='lighter'
          mr={3}
          onClick={() => setSearch([])}
        >
          GO BACK
        </Button> 
        <Createbutton selected={selected} />
      </div>
    </>
  );
};

export default SearchResult;
