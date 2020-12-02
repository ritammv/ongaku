import { useState, useEffect } from 'react';

const getSize = (width: number): string => {
  let size = 'LARGE';
  if (width < 500) size = 'SMALL';
  else if (width < 800) size = 'MED';
  return size;
};

export const useGetScreenSize = (): string  => {
  const [screenSize, setScreenSize] = useState(getSize(window.innerWidth));
  
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      const { innerWidth } = window;
      setScreenSize(getSize(innerWidth));
    });
  }, []);

  return screenSize;
};