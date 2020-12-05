import React, { useState } from 'react';
import { Input, Stack, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getFromDiscogs } from '../../helpers/apiClientServer';
import SearchResult from './SearchResult';

// eslint-disable-next-line max-len
interface Props {
  selected: Release;
  setSelected: Function;
}

const SearchDiscogs: React.FC<Props> = ({ selected, setSelected }) => {
  const user = useSelector<State, User>((state) => state.user);

  const [searchResults, setSearchResults] = useState<Release[]>([]);
  const [form, setForm] = useState<CreatePostForm>({
    query: '',
    artist: '',
    title: '',
    label: '',
    year: '',
  });

  function handleSubmit() {
    getFromDiscogs(
      `/database/search?q=${form.query}&title=${form.title}&artist=${form.artist}&label=${form.label}&year=${form.year}`,
      user.token,
      user.tokenSecret
    ).then((data) =>
      setSearchResults(
        data.results.map((result: SearchResult) => ({
          id: result.id,
          artists: result.artist,
          year: result.year,
          labels: result.label,
          title: result.title,
          genres: result.genre,
          styles: result.styles,
          url: result.resource_url,
          image: result.cover_image,
        }))
      )
    );

    setForm({
      query: '',
      artist: '',
      title: '',
      label: '',
      year: '',
    });
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>, name: string) {
    const target = e.target as HTMLTextAreaElement;
    const newForm: CreatePostForm = { ...form };
    if (name === 'query') newForm.query = target.value;
    if (name === 'artist') newForm.artist = target.value;
    if (name === 'title') newForm.title = target.value;
    if (name === 'label') newForm.label = target.value;
    if (name === 'year') newForm.year = target.value;
    setForm(newForm);
  }

  return (
    <Stack spacing={3}>
      {!(searchResults && searchResults.length) ? (
        <form>
          <Input
            my="20px"
            variant="flushed"
            placeholder="Search Discogs..."
            _focus={{ outline: 'none' }}
            onChange={(e) => handleChange(e, 'query')}
            name="query"
            key="query"
          />
          <Input
            my="20px"
            variant="flushed"
            placeholder="/ARTIST/"
            _focus={{ outline: 'none' }}
            onChange={(e) => handleChange(e, 'artist')}
            name="artist"
            key="artist"
          />
          <Input
            my="20px"
            variant="flushed"
            placeholder="/TITLE/"
            _focus={{ outline: 'none' }}
            onChange={(e) => handleChange(e, 'title')}
            name="title"
            key="title"
          />
          <Input
            my="20px"
            variant="flushed"
            placeholder="/LABEL/"
            _focus={{ outline: 'none' }}
            onChange={(e) => handleChange(e, 'label')}
            name="label"
            key="label"
          />
          <Input
            my="20px"
            variant="flushed"
            placeholder="/RELEASE YEAR/"
            _focus={{ outline: 'none' }}
            onChange={(e) => handleChange(e, 'year')}
            name="year"
            key="year"
          />

          <Button
            className="button-default"
            backgroundColor="#0f0e0e"
            color="white"
            borderRadius="12px"
            padding="2% 5%"
            fontWeight="lighter"
            mr={3}
            onClick={handleSubmit}
          >
            SEARCH
          </Button>
        </form>
      ) : (
        <SearchResult
          search={searchResults}
          setSearch={setSearchResults}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </Stack>
  );
};

export default SearchDiscogs;
