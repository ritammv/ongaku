import React from 'react';
import Loader from 'react-loader-spinner';
import { Flex } from '@chakra-ui/react';
import './Spinner.scss';

const Spinner: React.FC = () => {
  return (
    <Flex position="relative" top="300px">
      <Loader
        type="Rings"
        color="#ffff"
        height={200}
        width={200}
        timeout={3000}
      />
    </Flex>
  );
};

export default Spinner;
