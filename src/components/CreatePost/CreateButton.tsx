import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Props {
  position?: boolean;
}

const Createbutton: React.FC<Props> = ({ position }) => {

  const selected = useSelector<State, Release>((state) => state.selected);

  return (
    <>
      {selected.id !== 0 ? (
        <Link to="/create">
          <Flex justifyContent="center">
            <button
              type="button"
              className="genre_tag_button two"
              style={{
                backgroundColor: '#607382;',
                color: '#ffff',
                position: 'fixed',
                right: position ? '25px' : '',
                marginTop: position ? '' : '15px',
              }}
            >
              CREATE
            </button>
          </Flex>
        </Link>
      ) : (
        <Flex justifyContent="center">
          <button
            className="genre_tag_button one"
            type="button"
            style={{
              position: 'fixed',
              right: position ? '25px' : '',
              marginTop: position ? '' : '15px',
            }}
          >
            CREATE
          </button>
        </Flex>
      )}
    </>
  );
};

export default Createbutton;
