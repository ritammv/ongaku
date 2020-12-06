import React, { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Tile from './Tile/Tile';
// import { getLists } from '../../helpers/apiClient';
import { getFromDiscogs } from '../../helpers/apiClientServer';
import * as actions from '../../store/actionCreators';
import SearchDiscogs from './SearchDiscogs';
import Createbutton from './CreateButton';

const CreatePost: React.FC = () => {
  const [collection, setCollection] = useState<Release[]>([]);
  const [wantList, setWantList] = useState<Release[]>([]);
  const [selected, setSelected] = useState<Release>({
    id: 0,
    artists: [],
    year: 0,
    labels: [],
    title: '',
    genres: [],
    styles: [],
    url: '',
    image: '',
  });

  const dispatch = useDispatch();
  const user = useSelector<State, User>((state) => state.user);
  const isLoading = useSelector<State, boolean>((state) => state.isLoading);

  useEffect(() => {
    dispatch(actions.setIsLoading(true));
    getFromDiscogs(
      `/users/${user.username}/collection`,
      user.token,
      user.tokenSecret
    )
      .then((data) =>
        setCollection(
          [...data.releases]
            .map((release) => release.basic_information)
            .map((release) => ({
              id: release.id,
              artists: release.artists,
              year: release.year,
              labels: release.labels,
              title: release.title,
              genres: release.genres,
              styles: release.styles,
              url: release.resource_url,
              image: release.huge_thumb,
            }))
        )
      )
      .then(() => dispatch(actions.setIsLoading(false)));

    getFromDiscogs(
      `/users/${user.username}/wants`,
      user.token,
      user.tokenSecret
    )
      .then((data) =>
        setWantList(
          [...data.wants]
            .map((want) => want.basic_information)
            .map((want) => ({
              id: want.id,
              artists: want.artists,
              year: want.year,
              labels: want.labels,
              title: want.title,
              genres: want.genres,
              styles: want.styles,
              url: want.resource_url,
              image: want.cover_image,
            }))
        )
      )
      .then(() => dispatch(actions.setIsLoading(false)));
    setSelected({
      id: 0,
      artists: [],
      year: 0,
      labels: [],
      title: '',
      genres: [],
      styles: [],
      url: '',
      image: '',
    });
  }, [dispatch, user.username, user.token, user.tokenSecret]);
  const collectionColums: number = Math.floor(collection.length / 3 + 1);
  const wantColums: number = Math.floor(wantList.length / 3 + 1);
  return (
    <>
      <Tabs>
        <TabList
          display="flex"
          justifyContent="space-between"
          mt="20px"
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
          <TabPanel overflowX="scroll" minHeight="90vh" display="flex">
            <SearchDiscogs selected={selected} setSelected={setSelected} />
          </TabPanel>
          <TabPanel overflowX="scroll">
            <SimpleGrid columns={[collectionColums, null, 2]} spacing="5px">
              {collection.map((release) => {
                return (
                  <Tile
                    key={release.id}
                    result={release}
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              })}
            </SimpleGrid>
            <Createbutton selected={selected} />
          </TabPanel>
          <TabPanel overflowX="scroll">
            <SimpleGrid columns={[wantColums, null, 2]} spacing="5px">
              {wantList.map((want) => {
                return (
                  <Tile
                    key={want.id}
                    result={want}
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              })}
            </SimpleGrid>
            <Createbutton selected={selected} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CreatePost;
