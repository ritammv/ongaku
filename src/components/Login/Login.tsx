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
              innerColor='#fefefe'
              outerColor='#0f0e0e'
              textColor='#065dc2'
            />
          </div>
          <a href="http://localhost:3001/auth/provider">
            <button type="submit" className="login_button">Login With Discogs</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
