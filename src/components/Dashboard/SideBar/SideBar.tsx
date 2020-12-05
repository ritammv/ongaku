import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import * as actions from '../../../store/actionCreators';
import CreateChannel from '../CreateChannel/CreateChannel';
import { getUser } from '../../../helpers/apiClient';
import { unsubscribeFromChannel } from '../../../helpers/apiClientServer';

interface Props {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<Props> = ({ showSideBar, setShowSideBar }) => {
  const channel = useSelector((state: State) => state.currChannel);
  const userDetails = useSelector((state: State) => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userDetails.id) {
      getUser(userDetails.id).then((user) => {
        actions.setUser(user)(dispatch);
      });
    }
  }, [dispatch, userDetails.id]);

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newChannel: Channel
  ) => {
    dispatch(actions.addCurrChannel(newChannel));
    history.push(`/channels/${newChannel.name}`);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setShowSideBar(false);
  };

  const unsubscribe = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newChannel: Channel
  ) => {
    unsubscribeFromChannel(userDetails.id, newChannel);
    dispatch(actions.unsubscribeChannel(newChannel));
  };

  useEffect(() => {
    if (showSideBar) onOpen();
  }, [showSideBar, onOpen]);

  // useEffect(() => {
  //   getUser(3294829).then((user) => {
  //     dispatch(actions.setUser);
  //     setUserDetails(user);
  //   });
  // }, [dispatch]);

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
                    (userDetails.channels as Channel[]).map((chan: Channel) => {
                      return (
                        !chan.private && (
                          <div key={chan.id}>
                            <button
                              type="button"
                              className={`channel_item ${
                                chan.name === channel.name ? 'active' : ''
                              }`}
                              onClick={(e) => changePage(e, chan)}
                            >
                              #{chan.name}
                            </button>
                            <button
                              type="button"
                              className="unsubscribe_channel"
                              onClick={(e) => unsubscribe(e, chan)}
                            >
                              x
                            </button>
                          </div>
                        )
                      );
                    })}
                </ul>
              </div>
              <div className="drawer_private">
                <h3 className="public_title">Private</h3>
                <ul className="private_channel_list">
                  {userDetails.channels &&
                    (userDetails.channels as Channel[]).map(
                      (chan: Channel) =>
                        chan.private === true && (
                          <div key={chan.id}>
                            <button
                              type="button"
                              className={`channel_item ${
                                chan.name === channel.name ? 'active' : ''
                              }`}
                              onClick={(e) => changePage(e, chan)}
                            >
                              #{chan.name}
                            </button>
                            <button
                              type="button"
                              className="unsubscribe_channel"
                              onClick={(e) => unsubscribe(e, chan)}
                            >
                              x
                            </button>
                          </div>
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
      <CreateChannel
        closeChannels={onClose}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default SideBar;
