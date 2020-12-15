import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Tile from './Tile/Tile';
import CreateButton from './CreateButton';
import * as actions from '../../store/actionCreators';

interface Props {
  search: Release[];
  setSearch: Function;
}

const initialStateSelected: Release = {
  id: 1,
  artists: [
    {
      name: '',
    },
  ],
  year: 2014,
  labels: [
    {
      name: '',
    },
  ],
  title: '',
  genres: [''],
  styles: [],
  url: '',
  image: '',
};

const SearchResult: React.FC<Props> = ({ search, setSearch }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setSelected(initialStateSelected));
  }, []);

  const searchColums: number = Math.floor(search.length / 3 + 1);

  return (
    <>
      <SimpleGrid columns={[searchColums, null, 3]} spacing="5px">
        {search.slice(0, 150).map((result) => (
          <Tile
            result={result}
            key={result.id}
          />
        ))}
      </SimpleGrid>

      <div className="button_container_search">
        <button
          type="button"
          className="genre_tag_button one"
          onClick={() => setSearch([])}
          style={{ position: 'fixed' }}
        >
          {'<'}
        </button>
        <CreateButton position={true}>
          {' '}
          CREATE
        </CreateButton>
      </div>
    </>
  );
};

export default SearchResult;
