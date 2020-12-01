import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  selected: Release | Want | SearchData
}

const Createbutton: React.FC<Props> = ({ selected }) => {

  return (
    <>
      {
        selected.id !== 0
          ?
            <Link to='/create'>
              <Button
                className="button-default"
                backgroundColor="#0f0e0e"
                color="white"
                borderRadius="12px"
                padding="2% 5%"
                fontWeight="lighter"
                mr={3}
              >
                CREATE
              </Button>
            </Link>

          :
            <Button
              className="button-default"
              backgroundColor="#0f0e0e"
              color="white"
              borderRadius="12px"
              padding="2% 5%"
              fontWeight="lighter"
              mr={3}
              disabled={true}
            >
              CREATE
            </Button>
      }
    </>
  );
};

export default Createbutton;


