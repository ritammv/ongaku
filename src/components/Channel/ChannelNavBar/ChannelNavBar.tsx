import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IconButton } from '@chakra-ui/react';
import SideBar from '../../Dashboard/SideBar/SideBar';
import vinyl from '../../../assets/ongaku1.svg';
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
        // onClose();
      });
    }
  }, [channel]);

  return (
    <nav className="header">
      <img src={vinyl} alt="vinyl_image" />

      <div className="channel_title">{name && name.toUpperCase()}</div>
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
      {/* <div className="dashboard_info">
        <h3>{users && `${users} Members`}</h3> <h3>{posts.length} Posts</h3>
      </div> */}
      <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </nav>
  );
};

export default ChannelNavBar;
