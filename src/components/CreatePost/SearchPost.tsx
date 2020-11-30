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
import SearchForm from './SearchForm';
import { SystemState } from '../../redux/reducer';
import { User } from '../../redux/types/User';
import { getLists } from '../../helpers/apiClient';
import * as actions from '../../redux/actions';


export interface Release {
  basic_information: {
    release_id: number
    artists_sort: string
    year: number
    labels: string[]
    title: string
    genres: string[]
    styles: string[]
    url: string
    huge_thumb: string
    data: object
  }
}

export interface Want {
  basic_information: {
    id: number
    artists: string
    year: number
    labels: string[]
    title: string
    genres: string[]
    styles: string[]
    resource_url: string
    cover_image: string
    data: object
  }
}


const SearchPost: React.FC = () => {
  const [collection, setCollection] = useState<Release[]>([]);
  const [wantList, setWantList] = useState<Want[]>([]);
  const dispatch = useDispatch();
  const user = useSelector<SystemState, User>(state => state.user);
  const isLoading = useSelector<SystemState, boolean>(state => state.isLoading);


  useEffect(() => {
    dispatch(actions.SetLoading(true));

    getLists(user.username, 'collection')
      .then((data) => setCollection([...data.releases]))
      .then(() => dispatch(actions.SetLoading(false)));
    
    getLists(user.username, 'wants')
      .then((data) => setWantList([...data.wants]))
      .then(() => dispatch(actions.SetLoading(false)));

  }, []);


  return (
    <>
      <Tabs>
        <TabList 
          display='flex'
          justifyContent='space-between'
          mt='45px'
          color='#d3d3d3'
        >
          <Tab _focus={{ outline: 0, textDecoration: 'none' }}>Search</Tab>
          <Tab _focus={{ outline: 0, textDecoration: 'none' }}>Collection</Tab>
          <Tab _focus={{ outline: 0, textDecoration: 'none' }}>Wantlist
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SearchForm />
          </TabPanel>
          <TabPanel>

            {
              collection.map(release => {
                return <Tile 
                  key={release.basic_information.release_id} 
                  title={release.basic_information.title}
                  artist={release.basic_information.artists_sort}
                  image={release.basic_information.huge_thumb}
                />;
              })
            } 
          </TabPanel>
          <TabPanel>
            {
              wantList.map(want => {
                return <Tile 
                  key={want.basic_information.id} 
                  title={want.basic_information.title}
                  artist={want.basic_information.artists[0].name}
                  image={want.basic_information.cover_image}
                />;
              })
            } 
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default SearchPost;
