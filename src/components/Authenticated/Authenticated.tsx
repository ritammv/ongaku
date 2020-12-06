import React, { useEffect } from 'react';
import './Authenticated.scss';
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';
import { randomCircles, slideInAndUp } from '../../helpers/animation';
import { OnClickRoute } from '../../helpers/onClickRoute';

const Authenticated: React.FC = () => {
  const isAuthenticated = useSelector((state: State) => state.authentication);
  const user = useSelector((state: State) => state.user);
  const navigate = OnClickRoute();

  useEffect(() => {
    const intervalId = setInterval(
      () => randomCircles('.container_animation_circles'),
      600
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && user.channels) {
      const toNavigate = user.channels.length ? 'dashboard' : 'discover';
      isAuthenticated &&
        slideInAndUp('login_container_logo', 'authenticated_welcome', () =>
          navigate(toNavigate)
        );
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <>
      <div className="container-full container_animation_circles">
        <div className="container_login">
          <div className="login_container_logo">
            <Logo
              widthPx={180}
              innerColor="#fefefe"
              outerColor="#0f0e0e"
              textColor="#065dc2"
            />
          </div>
        </div>
        <div className="authenticated_welcome"> Welcome to Ongaku </div>
      </div>
    </>
  );
};

export default Authenticated;
