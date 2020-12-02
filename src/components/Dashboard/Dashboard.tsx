import React, { useRef, useState } from 'react';
import './dashboard.scss';
import vinyl from '../../assets/vinyl.jpg';
import SideBar from './SideBar/SideBar';

const Dashboard: React.FC = () => {
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

      <div className="dashboard_welcome">
        <div>
          <div className="welcome_title">Welcome to Ongaku!</div> <br />
          We are a music sharing <i>community</i> and we pride ourselves on our
          core values of creating a safe space for everyone to share, discover
          and enjoy music freely.
        </div>
        <div className="ongaku_text">音楽</div>
        <div className="welcome_instructions">
          <br />
          On the left you will see the public channels you have already
          subscribed to, but feel free to use the search bar to discover other
          channels! You can also create private or public channels on demand,
          however we really encourage you to look for other like minded channels
          to connect with.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
