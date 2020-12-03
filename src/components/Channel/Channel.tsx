import React, { useRef, useState } from 'react';
import SideBar from '../Dashboard/SideBar/SideBar';
import vinyl from '../../assets/vinyl.jpg';

const Channel: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

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
    </div>
  );
};

export default Channel;
