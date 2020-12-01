import { useState, useEffect } from 'react';

export const useIsInScroll = 
  (ref: React.RefObject<HTMLDivElement>, startsOnPage?: boolean) => {
    const [isInScroll, setIsInScroll] = useState(startsOnPage);
    
    useEffect(() => {
      if (ref.current) {
        const topPos: number = ref.current.getBoundingClientRect().y;
        window.addEventListener('scroll', () => {
          if (window.scrollY + window.innerHeight - 200 >= topPos) {
            setIsInScroll(true);
          } else setIsInScroll(false);
        });
      }
    }, [ref]);
  
    return isInScroll;
  };