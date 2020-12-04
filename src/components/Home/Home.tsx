import React, { useEffect } from 'react';
import './Home.scss';
import { useSelector } from 'react-redux';
import Nav from './Nav/Nav';
import Hero from './Hero/Hero';
import ChannelsInfo from './ChannelsInfo/ChannelsInfo';
import AboutUs from './AboutUs/AboutUs';
import { OnClickRoute } from '../../helpers/onClickRoute';

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: State) => state.authentication);
  const user = useSelector((state: State) => state.user);
  const navigate = OnClickRoute();

  useEffect(() => {
    if (isAuthenticated && user.channels) {
      console.log('check');
      if (user.channels.length) navigate('dashboard');
      else navigate('discover');
    }
  }, [isAuthenticated, navigate, user]);
  return (
    <>
      <Nav />
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
