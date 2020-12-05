import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
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
  Text,
} from '@chakra-ui/react';
import * as actions from '../../../store/actionCreators';
import * as apiClientServer from '../../../helpers/apiClientServer';
import CreateChannel from '../CreateChannel/CreateChannel';
import { getUser } from '../../../helpers/apiClient';
import { unsubscribeFromChannel } from '../../../helpers/apiClientServer';

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const [value, setValue] = useState<Channel | null>({
    id: 'f8d71201-8a5f-4cd5-9989-46242eb4b49c',
    name: 'Electronic',
    ownerId: null,
    private: false,
    parentId: null,
    posts: [],
  });
  const [searchResult, setSearchResult] = useState<string>('');

  useEffect(() => {
    if (userDetails.id) {
      getUser(userDetails.id).then((user) => {
        actions.setUser(user)(dispatch);
      });
    }
  }, []);

  useEffect(() => {
    apiClientServer.getPublicChannels().then((result) => {
      setAllChannels(result);
    });
  }, []);

  const changePage = (e: Event, newChannel: Channel) => {
    onClose();
    dispatch(actions.addCurrChannel(newChannel));
    history.push(`/channels/${newChannel.name}`);
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

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  //   | React.ChangeEvent<{}>) => {
  //   const target = e.target as HTMLTextAreaElement ;
  //   const newSearch = target.value;
  //   console.log('new search', newSearch);
  //   setSearchResult(newSearch);
  // };

  const handleClickAutocomplete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channelToChange = allChannels.filter(
      (chan) => chan.name.toLowerCase() === searchResult.toLowerCase()
    );

    if (channelToChange[0] !== undefined) {
      changePage(e, channelToChange[0]);
    }
  };

  return (
    <div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton onClick={() => handleClose()} />
            <DrawerHeader>Hello! Welcome back</DrawerHeader>
            <DrawerBody>
              <div className="drawer_channel">Channels</div>

              <form
                onSubmit={(e) => handleClickAutocomplete(e)}
                className="drawer_search"
              >
                <Autocomplete
                  inputValue={searchResult}
                  onInputChange={(e, newInput) => {
                    setSearchResult(newInput);
                  }}
                  value={value}
                  onChange={(e, newValue: Channel | null) => {
                    setValue(newValue);
                  }}
                  id="size-small-standard"
                  options={allChannels}
                  getOptionLabel={(option) => option.name}
                  style={{ width: '100%', border: 'none', padding: '10%' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search for a Channel"
                      // onChange={(e) => handleChange(e)}
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
