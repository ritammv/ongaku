import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actionCreators';

interface Props {
  selected: Release
}

const Createbutton: React.FC<Props> = ({ selected }) => {

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setSelected(selected));
  }

  return (
    <>
      {
        selected.id !== 0
          ?
            <Link to='/create'>
              <Flex justifyContent='center'>
                <Button
                  className="button-default"
                  backgroundColor="#0f0e0e"
                  color="white"
                  borderRadius="12px"
                  padding="2% 5%"
                  fontWeight="lighter"
                  mr={3}
                  onClick={handleClick}
                  position='absolute'
                >
                  CREATE
                </Button>
              </Flex>
            </Link>

          :
            <Flex justifyContent='center'>
              <Button
                className="button-default"
                backgroundColor="#0f0e0e"
                color="white"
                borderRadius="12px"
                padding="2% 5%"
                fontWeight="lighter"
                mr={3}
                disabled={true}
                position='absolute'
              >
                CREATE
              </Button>
            </Flex>
      }
    </>
  );
};

export default Createbutton;


