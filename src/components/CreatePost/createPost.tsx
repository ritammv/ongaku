import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getFromDiscogs } from '../../helpers/apiClientServer';
import SearchDiscogs from './SearchDiscogs';
import PanelListItem from './PanelListItem';

const CreatePost: React.FC = () => {
  const [collection, setCollection] = useState<Release[]>([]);
  const [wantList, setWantList] = useState<Release[]>([]);

  const dispatch = useDispatch();
  const user = useSelector<State, User>((state) => state.user);

  useEffect(() => {
    getFromDiscogs(
      `/users/${user.username}/collection`,
      user.token,
      user.tokenSecret
    ).then((data) =>
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
    );

    getFromDiscogs(
      `/users/${user.username}/wants`,
      user.token,
      user.tokenSecret
    ).then((data) =>
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
    );

  }, [dispatch, user.username, user.token, user.tokenSecret]);

  return (
    <>
      <Tabs backgroundColor="#2d3848">
        <TabList
          display="flex"
          justifyContent="space-between"
          mt="20px"
          color="#d3d3d3"
          maxWidth="90vw"
        >
          <Tab
            key="1"
            _focus={{ outline: 0, textDecoration: 'none' }}
            _selected={{ color: '#c3cb52' }}
          >
            Search
          </Tab>
          <Tab
            key="2"
            _focus={{ outline: 0, textDecoration: 'none' }}
            _selected={{ color: '#c3cb52' }}
          >
            Collection
          </Tab>
          <Tab
            key="3"
            _focus={{ outline: 0, textDecoration: 'none' }}
            _selected={{ color: '#c3cb52' }}
          >
            Wantlist
          </Tab>
        </TabList>

        <TabPanels>
          
          <TabPanel overflowX="scroll" minHeight="90vh" display="flex">
            <SearchDiscogs />
          </TabPanel>

          <TabPanel overflowX="scroll" style={{ height: '85vh' }}>
            <PanelListItem data={collection} />
          </TabPanel>

          <TabPanel overflowX="scroll" style={{ height: '85vh' }}>
            <PanelListItem data={wantList} />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </>
  );
};

export default CreatePost;
