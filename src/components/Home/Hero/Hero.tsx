import React, { useRef, useState, useEffect } from 'react';
import './Hero.scss';
import { useIsInScroll } from '../../../helpers/isInScroll';
import { heroAnimation } from '../../../helpers/animation';
import Logo from '../../Logo/Logo';
import DownArrow from '../../../assets/arrow-down.svg';
import { OnClickRoute } from '../../../helpers/onClickRoute';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerIsInScroll = useIsInScroll(containerRef, true);
  const [heroTimeline, setHeroTimeline] = useState<GSAPTimeline | null>(null);

  const handleClick = OnClickRoute();

  useEffect(() => {
    if (!heroTimeline) {
      setHeroTimeline(heroAnimation());
    }
    if (containerIsInScroll && heroTimeline) {
      heroTimeline.play();
    } else if (heroTimeline) {
      heroTimeline.reverse();
    }
  }, [containerIsInScroll, heroTimeline]);

  return (
    <>
      <div className="container_hero" ref={containerRef}>
        <div className="logo">
          <div className="logo_img_container">
            <Logo
              widthPx={200}
              innerColor="#fefefe"
              outerColor="#0f0e0e"
              textColor="#065dc2"
            />
          </div>
          <div className="logo_title logo-text"> Ongaku </div>
          <div className="hero_subtitle">
            <span id="music">Music</span>
            <span id="sharing">Sharing</span>
            <span id="community">Community</span>
          </div>
          <div className="hero_subtext">
            The Platform That Allows You To Share 
            Music You Love With The Community You Love
          </div>
        </div>
        <div className="hero_buttons">
          <button type="button" className="buttons_join" onClick={() => handleClick('login')}>
            Log In With Discogs
          </button>
          <button type="button" className="buttons_channels" onClick={() => handleClick('dashboard')}>
            Channels
          </button>
        </div>
        <div className="container_scrolldown">
          <img className="svg-arrow" src={DownArrow} alt="arrow_down" />
        </div>
      </div>
    </>
  );
};

export default Home;
