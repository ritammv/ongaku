import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
} from '@chakra-ui/react';

import React, { useRef, useState } from 'react';
import './dashboard.scss';
// import { useSelector } from 'react-redux';
import vinyl from '../../assets/vinyl.jpg';
import CreateChannel from './CreateChannel/CreateChannel';

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const user = useSelector((state: State) => state.user);

  const [showModal, setShowModal] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="header">
        <div className="user_info">
          {' '}
          <img src={vinyl} alt="vinyl_image" />
        </div>
        <div className="welcome_user">
          <h1> Welcome Ritam </h1>

          <button
            className="button_emoji"
            type="button"
            ref={btnRef}
            onClick={onOpen}
          >
            +
          </button>
        </div>
        <div className="dashboard_info">
          <h3>2098 Members</h3> <h3>13209 Posts</h3>
        </div>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="full"
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Hello! Welcome back</DrawerHeader>
              <DrawerBody>
                <div className="drawer_channel">Channels</div>
                <ul>
                  <input
                    className="search_input"
                    placeholder="Search a channel"
                  />
                </ul>

                <div className="drawer_public">
                  <h3 className="public_title">Public</h3>
                  <ul className="public_channel_list">
                    <li className="channel_item">#electronic</li>
                    <li className="channel_item">#world</li>
                    <li className="channel_item">#hip-hop</li>
                  </ul>
                </div>
                <div className="drawer_private">
                  <h3 className="public_title">Private</h3>
                  <ul className="private_channel_list">
                    <li className="channel_item">#codeworks</li>
                    <li className="channel_item">#festivals</li>
                    <li className="channel_item">#bath</li>
                  </ul>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <button
                  style={{
                    height: '50px',
                    width: '200px',
                  }}
                  className="genre_tag_button create_channel_button"
                  type="button"
                  onClick={() => {
                    setShowModal((state) => !state);
                  }}
                >
                  Create a channel +
                </button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <CreateChannel setShowModal={setShowModal} showModal={showModal} />
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
