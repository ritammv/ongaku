import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Createbutton from './CreateButton';
import Tile from './Tile/Tile';

interface Props {
  data: Release[]
  selected: Release
  setSelected: React.Dispatch<React.SetStateAction<Release>>
}

const PanelListItem: React.FC<Props> = ({ data, selected, setSelected }) => {
  
  const colums: number = Math.floor(data.length / 3 + 1);

  return (
    <>
      <SimpleGrid columns={[colums, null, 2]} spacing="5px">
        {data.map((release: Release) => {
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
    </>
  );
};

export default PanelListItem;