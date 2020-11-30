import React from 'react';
import './Home.scss';
import Hero from './Hero/Hero';
import ChannelsInfo from './ChannelsInfo/ChannelsInfo';
import AboutUs from './AboutUs/AboutUs';

const Home: React.FC = () => {
  return (
    <>
      <div className="container-full">
        <Hero />
      </div>
      <div className="container-full">
        <ChannelsInfo />
      </div>
      <div className="container-full">
        <AboutUs />
      </div>
    </>
  );
};

export default Home;
