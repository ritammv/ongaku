import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Createbutton from './CreateButton';
import Tile from './Tile/Tile';

interface Props {
  data: Release[];
}

const PanelListItem: React.FC<Props> = ({ data }) => {
  const colums: number = Math.floor(data.length / 3 + 1);

  return (
    <>
      <SimpleGrid columns={[colums, null, 2]} spacing="5px">
        {data.map((release: Release) => {
          return (
            <Tile
              key={release.id}
              result={release}
            />
          );
        })}
      </SimpleGrid>
      <Createbutton />
    </>
  );
};

export default PanelListItem;
