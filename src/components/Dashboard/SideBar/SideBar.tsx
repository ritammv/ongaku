import React, { useEffect, useState } from 'react';
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  Input,
} from '@chakra-ui/react';
import CreateChannel from '../CreateChannel/CreateChannel';
import { getUser } from '../../../helpers/apiClient';

interface Props {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<Props> = ({ showSideBar, setShowSideBar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState<UserForRitam>({
    id: 'string',
    // discogsId: 0,
    // username: '',
    // avatarUrl: '',
    // wantsUrl: '',
    // collectionUrl: '',
    posts: [],
    channels: [],
    comments: [],
    token: '',
    tokenSecret: '',
  });

  const handleClose = () => {
    onClose();
    setShowSideBar(false);
  };

  useEffect(() => {
    if (showSideBar) onOpen();
  }, [showSideBar, onOpen]);

  useEffect(() => {
    getUser('76146c9d-d4da-4ab2-bac7-6bbd94d08a43').then((user) => {
      setUserDetails(user);
    });
  }, []);

  return (
    <div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton onClick={() => handleClose()} />
            <DrawerHeader>Hello! Welcome back</DrawerHeader>
            <DrawerBody>
              <div className="drawer_channel">Channels</div>

              <form>
                <Input
                  className="search_input"
                  placeholder="Search a channel"
                  variant="filled"
                />
              </form>

              <div className="drawer_public">
                <h3 className="public_title">Public</h3>
                <ul className="public_channel_list">
                  {userDetails.channels &&
                    userDetails.channels.map(
                      (channel) =>
                        channel.private === false && (
                          <button
                            type="button"
                            className="channel_item"
                            key={channel.id}
                          >
                            #{channel.name}
                          </button>
                        )
                    )}
                </ul>
              </div>
              <div className="drawer_private">
                <h3 className="public_title">Private</h3>
                <ul className="private_channel_list">
                  {userDetails.channels &&
                    userDetails.channels.map(
                      (channel) =>
                        channel.private === true && (
                          <button
                            type="button"
                            key={channel.id}
                            className="channel_item"
                          >
                            #{channel.name}
                          </button>
                        )
                    )}
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
  );
};

export default SideBar;
