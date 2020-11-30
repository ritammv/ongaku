import React, { useRef, useState, useEffect } from 'react';
import './Hero.scss';
import { useIsInScroll } from '../../../helpers/isInScroll';
import { heroAnimation } from '../../../helpers/animation';
import LogoLightMode from '../../../assets/light-mode-logo.png';

const Home: React.FC = () => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerIsInScroll = useIsInScroll(containerRef);
  const [heroTimeline, setHeroTimeline] = useState<GSAPTimeline | null>(null);
  
  useEffect(() => {
    if (!heroTimeline) {
      setHeroTimeline(heroAnimation());
    }
    if (containerIsInScroll && heroTimeline) {
      heroTimeline.play();
    } else if (heroTimeline) {
      heroTimeline.reverse();
    }
  }, [containerIsInScroll]);

  return (
    <>
      <div className="container_hero" ref={containerRef}>
        <div className="logo">
          <img src={LogoLightMode} alt="logo" />
          <div className="logo_title logo-text"> Ongaku </div>
        </div>
        <div className="hero_subtitle">
          <span id="music">Music</span>
          <span id="sharing">Sharing</span>
          <span id="community">Community</span>
        </div>
        <div className="hero_buttons">
          <button type="button" className="buttons_join">Join</button>
          <button type="button" className="buttons_channels">Channels</button>
        </div>
      </div>
    </>
  );
};

export default Home;