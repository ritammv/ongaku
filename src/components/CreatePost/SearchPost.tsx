import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Tile from './Tile';
import { SystemState } from '../../redux/reducer';
import { User } from '../../redux/types/User';
import { getLists } from '../../helpers/apiClient';
import * as actions from '../../redux/actions';
import SearchDiscogs from './SearchDiscogs';
import Createbutton from './CreateButton';

const SearchPost: React.FC = () => {
  const [collection, setCollection] = useState<Release[]>([]);
  const [wantList, setWantList] = useState<Want[]>([]);
  const [selected, setSelected] = useState<Release | Want | SearchData>({
    id: 0,
    title: '',
    artist: '',
    cover_image: '',
  });

  const dispatch = useDispatch();
  const user = useSelector<SystemState, User>((state) => state.user);
  const isLoading = useSelector<SystemState, boolean>(
    (state) => state.isLoading
  );

  useEffect(() => {
    dispatch(actions.SetLoading(true));

    getLists(user.username, 'collection')
      .then((data) =>
        setCollection(
          [...data.releases].map((release) => release.basic_information)
        )
      )
      .then(() => dispatch(actions.SetLoading(false)));

    getLists(user.username, 'wants')
      .then((data) =>
        setWantList([...data.wants].map((want) => want.basic_information))
      )
      .then(() => dispatch(actions.SetLoading(false)));

    setSelected({
      id: 0,
      title: '',
      artist: '',
      cover_image: '',
    });
  }, []);

  return (
    <>
      <Tabs>
        <TabList
          display="flex"
          justifyContent="space-between"
          mt="45px"
          color="#d3d3d3"
          maxWidth="90vw"
        >
          <Tab key="1" _focus={{ outline: 0, textDecoration: 'none' }}>
            Search
          </Tab>
          <Tab key="2" _focus={{ outline: 0, textDecoration: 'none' }}>
            Collection
          </Tab>
          <Tab key="3" _focus={{ outline: 0, textDecoration: 'none' }}>
            Wantlist
          </Tab>
        </TabList>

        <TabPanels>

          <TabPanel>
            <SearchDiscogs selected={selected} setSelected={setSelected} />
          </TabPanel>

          <TabPanel>
            {collection.map((release) => {
              return (
                <Tile
                  key={release.id}
                  title={release.title}
                  artist={release.artists_sort}
                  image={release.huge_thumb}
                  result={release}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
            <Createbutton selected={selected} />
          </TabPanel>

          <TabPanel>
            {wantList.map((want) => {
              return (
                <Tile
                  key={want.id}
                  title={want.title}
                  artist={want.artists[0].name}
                  image={want.cover_image}
                  result={want}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
            <Createbutton selected={selected} />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </>
  );
};

export default SearchPost;
