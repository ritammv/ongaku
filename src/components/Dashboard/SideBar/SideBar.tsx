import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InputBase } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import SideBarItem from './SideBarItem';
import * as actions from '../../../store/actionCreators';

import CreateChannel from '../CreateChannel/CreateChannel';
import {
  getUser,
  unsubscribeFromChannel,
  getPublicChannels,
} from '../../../helpers/apiClientServer';
import SubscribePrivateChannel from '../SubscribePrivateChannel/SubscribePrivateChannel';

interface Props {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

type Event =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.FormEvent<HTMLFormElement>;

const SideBar: React.FC<Props> = ({ showSideBar, setShowSideBar }) => {
  const channel = useSelector((state: State) => state.currChannel);
  const userDetails = useSelector((state: State) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [value, setValue] = useState<Channel | null>(null);
  const [searchResult, setSearchResult] = useState<string>(
    'Search for something...'
  );

  useEffect(() => {
    if (userDetails.id) {
      getUser(userDetails.id).then((user) => {
        dispatch(actions.setUser(user));
      });
    }
  }, [userDetails.id, dispatch]);

  useEffect(() => {
    getPublicChannels().then((result) => {
      setAllChannels(result);
    });
  }, []);

  const changePage = (e: Event, newChannel: Channel) => {
    onClose();
    dispatch(actions.addCurrChannel(newChannel));
    history.push(`/channels/${newChannel.name}`);
  };

  const navigateToLater = (e: Event) => {
    onClose();
    history.push('/later');
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

  const handleClickAutocomplete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channelToChange = allChannels.filter(
      (chan) => chan.name.toLowerCase() === searchResult.toLowerCase()
    );

    if (channelToChange[0] !== undefined) {
      changePage(e, channelToChange[0]);
    }
    setValue(null);
    setSearchResult('');
  };

  return (
    <div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay className="drawer">
          <DrawerContent>
            <DrawerCloseButton onClick={() => handleClose()} />
            <DrawerHeader>Welcome {userDetails.username}</DrawerHeader>
            <DrawerBody>
              <div className="drawer_channel">Channels</div>

              <form
                onSubmit={(e) => handleClickAutocomplete(e)}
                className="drawer_search"
              >
                <Autocomplete
                  inputValue={searchResult}
                  value={value}
                  onChange={(e, newValue: Channel | null) => {
                    setValue(newValue);
                  }}
                  onInputChange={(e, newInput) => {
                    setSearchResult(newInput);
                  }}
                  id="size-small-standard"
                  options={allChannels}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%', border: 'none', padding: '10%' }}
                  renderInput={(params) => (
                    <InputBase
                      {...params}
                      // variant="filled"
                      style={{
                        opacity: '0.6',
                        borderRadius: '0',
                        backgroundColor: '#d3d3d3'
                      }}
                      placeholder="Search..."
                    />
                  )}
                />
              </form>

              <div className="drawer_public">
                <h3 className="public_title">Public</h3>
                <ul className="public_channel_list">
                  {userDetails.channels &&
                    (userDetails.channels as Channel[]).map((chan: Channel) => {
                      return (
                        !chan.private && (
                          <SideBarItem
                            key={chan.id}
                            channel={chan}
                            activeChannel={channel}
                            changePage={changePage}
                            unsubscribe={unsubscribe}
                            user={userDetails}
                          />
                        )
                      );
                    })}
                </ul>
              </div>
              <div className="drawer_private">
                <h3 className="public_title">Private</h3>
                <ul className="private_channel_list">
                  <button
                    type="button"
                    className="channel_item"
                    onClick={(e) => navigateToLater(e)}
                  >
                    #For Later
                  </button>
                  {userDetails.channels &&
                    (userDetails.channels as Channel[]).map(
                      (chan: Channel) =>
                        chan.private === true && (
                          <SideBarItem
                            key={chan.id}
                            channel={chan}
                            activeChannel={channel}
                            changePage={changePage}
                            unsubscribe={unsubscribe}
                            user={userDetails}
                          />
                        )
                    )}
                </ul>
              </div>
            </DrawerBody>
            <DrawerFooter className="drawer drawer_footer">
              <button
                id="drawer_button"
                style={{
                  height: '50px',
                  width: '130px',
                }}
                className=" genre_tag_button one"
                type="button"
                onClick={() => {
                  setShowModal((state) => !state);
                }}
              >
                + Create Channel
              </button>
              <button
                id="drawer_button"
                style={{
                  height: '50px',
                  width: '130px',
                }}
                className="genre_tag_button one"
                type="button"
                onClick={() => {
                  setShowSubscribe((state) => !state);
                }}
              >
                + Join Private Channel
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
      <SubscribePrivateChannel
        closePrivateChannels={onClose}
        setShowSubscribe={setShowSubscribe}
        showSubscribe={showSubscribe}
      />
    </div>
  );
};

export default SideBar;
