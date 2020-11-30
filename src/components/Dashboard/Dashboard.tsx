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
import React, { useRef } from 'react';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome Ritam </h1>
        <div className="dashboard_info">
          <h3>Members</h3> <h3>Posts</h3>
        </div>
        <button type="button" ref={btnRef} onClick={onOpen}>
          Click here
        </button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Hello! Welcome back</DrawerHeader>
              <DrawerBody>
                <div className="drawer_channel">Channels</div>

                <div className="drawer_public">
                  Public
                  <ul>
                    <li>#electronic</li>
                    <li>#world</li>
                    <li>#hip-hop</li>
                  </ul>
                </div>
                <div className="drawer_private">
                  Private
                  <ul>
                    <li>#codeworks</li>
                    <li>#festivals</li>
                    <li>#bath</li>
                  </ul>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <button type="button"> Create a channel</button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </div>

      <div className="dashboard_welcome">
        <span>
          Welcome to ongaku! We are a music sharing community and we pride
          ourselves on our core values of creating a safe space for everyone to
          share, discover and enjoy music freely.
        </span>
        <span>
          On the left you will see the public channels you have already
          subscribed to, but feel free to use the search bar to discover other
          channels! You can also create private or public channels on demand,
          however we really encourage you to look for other like minded channels
          to connect with.
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
