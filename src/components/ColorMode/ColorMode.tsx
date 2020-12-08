import React from 'react';
import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react';
import { HiMoon, HiOutlineMoon  } from 'react-icons/hi';

const ColorMode: React.FC = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'black');

  return (
    <>
      <IconButton 
        aria-label="Search database" 
        icon={<HiOutlineMoon />}
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? 'Dark' : 'Light'}
      </IconButton>
    </>
  );
};

export default ColorMode;