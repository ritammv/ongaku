import React from 'react';
import './Nav.scss';
import ongaku from '../../../assets/ongaku-2-dark.svg';
import LoginButton from '../LoginButton/LoginButton';

const Nav: React.FC = () => {

  return (
    <>
      <div className="home_nav">
        <img className="nav_logo" src={ongaku} alt="ongaku-logo" />
        <div className="nav_buttons">
          <LoginButton
            text="Login with"
            width="50%"
            fontSize="1rem"
            styles={false}
            discogsLogo={2}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
