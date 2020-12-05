import React, { useRef, useState } from 'react';
import { IconButton, Container } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './dashboard.scss';
import { useSelector } from 'react-redux';
import vinyl from '../../assets/vinyl.jpg';
import SideBar from './SideBar/SideBar';
import DashboardWelcome from './DashboardWelcome/DashboardWelcome';
// import {
//   getFromDiscogs,
//   postToDiscogs,
//   putToDiscogs,
//   deleteFromDiscogs,
// } from '../../helpers/apiClientServer';

const Dashboard: React.FC = () => {
  const user = useSelector((state: State) => state.user);
  // const [showModal, setShowModal] = useState(false);

  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   if (user.username) {
  //     console.log(user);
  //     deleteFromDiscogs(
  //       `/users/${user.username}/wants/1`,
  //       user.token,
  //       user.tokenSecret
  //     ).then((wants) => {
  //       console.log(wants);
  //     });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user.username) {
  //     console.log(user);
  //     getFromDiscogs(
  //       `/users/${user.username}/wants`,
  //       user.token,
  //       user.tokenSecret
  //     ).then((wants) => {
  //       console.log(wants);
  //     });
  //   }
  // }, [user]);

  return (
    <div className="container">
      <nav className="header">
        <img src={vinyl} alt="vinyl_image" />
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
