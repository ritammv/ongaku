import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../../Dashboard/SideBar/SideBar';
import ongaku from '../../../assets/ongaku-2-dark.svg';
import chatIcon from '../../../assets/chatNav.svg';
import { getChannel } from '../../../helpers/apiClientServer';

interface Props {
  name: string;
}

const ChannelNavBar = ({ name }: Props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [users, setUsers] = useState<number | null>(null);
  const channel = useSelector<State, Channel>((state) => state.currChannel);

  useEffect(() => {
    if (channel.id) {
      getChannel(channel.id).then((result: ChannelAndUsers) => {
        setUsers(result.users);
      });
    }
  }, [channel]);

  return (
    <nav className="header channel_header">
      <img src={ongaku} alt="vinyl_image" />
      <h1 className="channel_title">{name && `#${name}`}</h1>
      <div className="welcome_user">
        <button
          className="button_emoji"
          type="button"
          style={{ margin: '1rem 0.5rem' }}
          ref={btnRef}
          onClick={() => {
            setShowSideBar((state) => !state);
          }}
        >
          <img
            style={{ height: '1.5rem', width: 'auto' }}
            src={chatIcon}
            alt="icon"
          />
        </button>
      </div>
      <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </nav>
  );
};

export default ChannelNavBar;
