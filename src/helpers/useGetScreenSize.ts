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
    const eventListenerFunc = () => {
      const { innerWidth } = window;
      setScreenSize(getSize(innerWidth));
    };

    window.addEventListener('resize', eventListenerFunc);
    return () => { 
      window.removeEventListener('resize', eventListenerFunc);
    };
  }, []);

  return screenSize;
};