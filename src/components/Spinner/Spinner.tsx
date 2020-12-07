import React from 'react';
import Loader from 'react-loader-spinner';
import { Flex } from '@chakra-ui/react';
import './Spinner.scss'
;

const Spinner: React.FC = () => {
  return (
    <Flex
      position='relative'
      top='300px'
    >
      <Loader
        type="Rings"
        color="#065dc2"
        height={150}
        width={150}
        timeout={3000}
      />
    </Flex>
  );
};

export default Spinner;