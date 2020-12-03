import { useState, useEffect } from 'react';

export const useIsInScroll = 
  (ref: React.RefObject<HTMLDivElement>, startsOnPage?: boolean) => {
    const [isInScroll, setIsInScroll] = useState(startsOnPage);

    useEffect(() => {
      let checkScroll: () => void;
      if (ref.current) {
        const topPos: number = ref.current.getBoundingClientRect().y;
        checkScroll = () => {
          if (window.scrollY + window.innerHeight - 170 >= topPos) {
            setIsInScroll(true);
          } else setIsInScroll(false);
        };
        
        window.addEventListener('scroll', checkScroll);
      }
      return () => { 
        window.removeEventListener('scroll', checkScroll);
      };
    }, [ref]);

    
  
    return isInScroll;
  };