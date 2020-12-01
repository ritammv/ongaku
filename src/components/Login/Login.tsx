import React, { useEffect } from 'react';
import './Login.scss';
import Logo from '../Logo/Logo';
import { randomCircles } from '../../helpers/animation';

const Login: React.FC = () => {

  useEffect(() => {
    const intervalId = setInterval(() => randomCircles('.container_animation_circles'), 600);
    return () => { clearInterval(intervalId); };
  }, []);
  return (
    <>
      <div className="container-full container_animation_circles">
        <div className="container_login">
          <div className="login_container_logo">
            <Logo
              widthPx={180} 
              innerColor='#f0f1ef'
              outerColor='#0f0e0e'
              textColor='#D24848'
            />
          </div>
          <button type="submit" className="login_button">Login With Discogs</button>
        </div>
      </div>
    </>
  );
};

export default Login;
