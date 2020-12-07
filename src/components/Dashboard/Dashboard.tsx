import React, { useRef, useState } from 'react';
import { IconButton, Container } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './dashboard.scss';
import { useSelector } from 'react-redux';
import ongaku from '../../assets/ongaku-2.svg';
import SideBar from './SideBar/SideBar';
import DashboardWelcome from './DashboardWelcome/DashboardWelcome';

const Dashboard: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <nav className="header">
        <img className="header_log" src={ongaku} alt="vinyl_image" />
        <div className="welcome_user">
          <IconButton
            className="button_emoji"
            aria-label="burger-icon"
            backgroundColor="inherit"
            size="lg"
            icon={<GiHamburgerMenu />}
            type="button"
            ref={btnRef}
            onClick={() => {
              setShowSideBar((state) => !state);
            }}
          />
        </div>
        <div className="dashboard_info">
          <h3>2098 Members</h3> <h3>13209 Posts</h3>
        </div>
        <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      </nav>
      <Container position="relative" top="110px">
        <DashboardWelcome />
      </Container>
    </div>
  );
};

export default Dashboard;
