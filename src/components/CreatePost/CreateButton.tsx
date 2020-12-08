import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actionCreators';

interface Props {
  selected: Release;
}

const Createbutton: React.FC<Props> = ({ selected }) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setSelected(selected));
  }

  return (
    <>
      {selected.id !== 0 ? (
        <Link to="/create">
          <Flex justifyContent="center">
            <button
              type="button"
              className="genre_tag_button one"
              onClick={handleClick}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              CREATE
            </button>
          </Flex>
        </Link>
      ) : (
        <Flex justifyContent="center">
          <button className="genre_tag_button one" type="button">
            CREATE
          </button>
        </Flex>
      )}
    </>
  );
};

export default Createbutton;
