import React, { SyntheticEvent, useState } from 'react';
import { Input, Stack } from '@chakra-ui/react';
import { getData } from '../../helpers/apiClient';
import Tile from './Tile';

// eslint-disable-next-line max-len
const debounce = (func: { (e: React.SyntheticEvent<Element, Event>): void; }, delay = 1000) => {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args);
    }, delay);
  };
};

interface Data {
  title: string
  artist: string
  cover_image: string
}

const SearchForm: React.FC = () => {

  const [searchResults, setSearchResults] = useState<Data[]>([]);
  
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    e.target.value = '';
    console.log('submitted');
  }

  async function handleChange(e: SyntheticEvent) {
    const data = await getData(e.target.value);
    setSearchResults(data.results);
    console.log(data);
  }


  return (
    <Stack spacing={3}>
      <Input 
        my='20px'
        variant="flushed" 
        placeholder="Search by /ARTIST/LABEL/RECORD/..." 
        _focus={{ outline: 'none' }}
        onChange={debounce(handleChange)}
        onSubmit={handleSubmit}
        name='query'
      />
      {
        searchResults && searchResults.length
          ?
          searchResults.map(result => (
            <Tile 
              key={result.title}
              artist='...'
              title={result.title}
              image={result.cover_image}
            />
          ))
          :
          null
      }
      {/* <Input variant="flushed" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
      <Input variant="flushed" placeholder="Unstyled" /> */}
    </Stack>
  );
};

export default SearchForm;
