import React from 'react';
import { Container } from '@chakra-ui/react';

import './dashboard.scss';

import DashboardWelcome from './DashboardWelcome/DashboardWelcome';
import ChannelNavBar from '../Channel/ChannelNavBar/ChannelNavBar';

const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <nav className="header">
        <ChannelNavBar name="" />
      </nav>
      <Container position="relative" top="110px">
        <DashboardWelcome />
      </Container>
    </div>
  );
};

export default Dashboard;
