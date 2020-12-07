import React, { useRef, useState, useEffect } from 'react';
import './Hero.scss';
import { useIsInScroll } from '../../../helpers/isInScroll';
import { heroAnimation } from '../../../helpers/animation';
// import Logo from '../../Logo/Logo';
import ongaku from '../../../assets/ongaku1.svg';
import DownArrow from '../../../assets/arrow-down.svg';
import { OnClickRoute } from '../../../helpers/onClickRoute';
import LoginButton from '../LoginButton/LoginButton';

const Hero: React.FC = () => {
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
        <img className="ongaku_image" src={ongaku} alt="ongaku_image" />
        <div className="logo">
          <div className="logo_img_container">
            {/* <Logo
              widthPx={200}
              innerColor="#fefefe"
              outerColor="#0f0e0e"
              textColor="#065dc2"
            /> */}
          </div>
          <div className="logo_title logo-text"> Ongaku </div>
          <div className="hero_subtitle">
            <span id="music">Music</span>
            <span id="sharing">Sharing</span>
            <span id="community">Community</span>
          </div>
          {/* <div className="hero_subtext">
            The Platform That Allows You To Share Music You Love With The
            Community You Love
          </div> */}
        </div>
        <div className="hero_buttons">
          <div className="buttons_join">
            <LoginButton
              text="Login With Discogs"
              width="80%"
              fontSize="1.4rem"
              styles={true}
            />
          </div>
          {/* <button
            type="button"
            className="buttons_channels"
            onClick={() => handleClick('dashboard')}
          >
            Channels
          </button> */}
        </div>
        <div className="container_scrolldown">
          <img className="svg-arrow" src={DownArrow} alt="arrow_down" />
        </div>
      </div>
    </>
  );
};

export default Hero;
