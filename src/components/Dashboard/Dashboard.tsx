import React, { useRef, useState } from 'react';
import './dashboard.scss';
// import { useSelector } from 'react-redux';
import vinyl from '../../assets/vinyl.jpg';
import SideBar from './SideBar/SideBar';
import DashboardWelcome from './DashboardWelcome/DashboardWelcome';
// import { getFromDiscogs } from '../../helpers/apiClientServer';

const Dashboard: React.FC = () => {
  // const user = useSelector((state: State) => state.user);
  // const [showModal, setShowModal] = useState(false);

  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

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
      <div className="header">
        <div className="user_info">
          {' '}
          <img src={vinyl} alt="vinyl_image" />
        </div>
        <div className="welcome_user">
          <button
            className="button_emoji"
            type="button"
            ref={btnRef}
            onClick={() => {
              setShowSideBar((state) => !state);
            }}
          >
            +
          </button>
        </div>
        <div className="dashboard_info">
          <h3>2098 Members</h3> <h3>13209 Posts</h3>
        </div>
        <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      </div>

      <DashboardWelcome />
    </div>
  );
};

export default Dashboard;
