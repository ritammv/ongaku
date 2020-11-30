import React from 'react';
import {
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from '@chakra-ui/react';



interface Props {

}

const PostForm: React.FC<Props> = () => {
  

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
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default PostForm;
