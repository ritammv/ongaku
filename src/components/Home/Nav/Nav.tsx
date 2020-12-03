import React from 'react';
import './Nav.scss';
import Logo from '../../Logo/Logo';
import { OnClickRoute } from '../../../helpers/onClickRoute';


const Nav: React.FC = () => {
  
  const handleClick = OnClickRoute();

  return (
    <>
      <div className="home_nav">
        <button type="submit" className="nav_login" onClick={() => handleClick('login')}>
          Login
        </button>
        <Logo
          widthPx={50}
          innerColor="#fefefe"
          outerColor="#0f0e0e"
          textColor="#065dc2"
        />
        <button type="submit" className="nav_channels" onClick={() => handleClick('dashboard')}>
          Channels
        </button>
      </div>
    </>
  );
};

export default Nav;
