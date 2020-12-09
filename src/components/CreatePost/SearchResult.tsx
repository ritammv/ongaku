import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Tile from './Tile/Tile';
import CreateButton from './CreateButton';

interface Props {
  search: Release[];
  setSearch: Function;
  selected: Release;
  setSelected: Function;
}

const SearchResult: React.FC<Props> = ({
  search,
  setSearch,
  selected,
  setSelected,
}) => {
  useEffect(() => {
    setSelected({
      id: 0,
      title: '',
      artist: '',
      cover_image: '',
    });
  }, [setSelected]);

  const searchColums: number = Math.floor(search.length / 3 + 1);

  return (
    <>
      <SimpleGrid columns={[searchColums, null, 3]} spacing="5px">
        {search.slice(0, 150).map((result) => (
          <Tile
            result={result}
            key={result.id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </SimpleGrid>

      <div
        className="button_container_search"
        // style={{ display: 'flex', justifyContent: 'center' }}
      >
        <button
          type="button"
          className="genre_tag_button one"
          onClick={() => setSearch([])}
          style={{ position: 'fixed' }}
        >
          {'<'}
        </button>
        <CreateButton position={true} selected={selected}>
          {' '}
          CREATE
        </CreateButton>
      </div>
    </>
  );
};

export default SearchResult;
