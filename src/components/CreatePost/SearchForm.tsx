import React, { SyntheticEvent, useState } from 'react';
import { Input, Stack } from '@chakra-ui/react';
import _, { debounce } from 'lodash';
import { getData } from '../../helpers/apiClient';
import Tile from './Tile';

// eslint-disable-next-line max-len


interface Data {
  title: string
  artist: string
  cover_image: string
}

const SearchForm: React.FC = () => {

  const [searchResults, setSearchResults] = useState<Data[]>([]);
  
  function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    target.value = '';
    console.log('submitted');
  }

  async function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLTextAreaElement;
    const data = await getData(target.value);
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
        onChange={debounce(handleChange, 700)}
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
