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
  Input,
} from '@chakra-ui/react';
import * as actions from '../../../store/actionCreators';
import * as apiClientServer from '../../../helpers/apiClientServer';
import CreateChannel from '../CreateChannel/CreateChannel';
import { getUser } from '../../../helpers/apiClient';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allChannels, setAllChannels] = useState<Channel[]>();

  useEffect(() => {
    if (userDetails.id) {
      getUser(userDetails.id).then((user) => {
        actions.setUser(user)(dispatch);
      });
    }  
  }, []);

  // useEffect(() => {
  //   apiClientServer.getPublicChannels()
  //     .then((result) => setAllChannels(result));
  // }, []);

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newChannel: Channel
  ) => {
    dispatch(actions.addCurrChannel(newChannel));
    history.push(`/channels/${newChannel.name}`);
  };

  const handleClose = () => {
    onClose();
    setShowSideBar(false);
  };

  useEffect(() => {
    if (showSideBar) onOpen();
  }, [showSideBar, onOpen]);

  return (
    <div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton onClick={() => handleClose()} />
            <DrawerHeader>Hello! Welcome back</DrawerHeader>
            <DrawerBody>
              <div className="drawer_channel">Channels</div>

              {/* <form>
                <Input
                  className="search_input"
                  placeholder="Search a channel"
                  variant="filled"
                />
              </form> */}
              {/* <Autocomplete
                id="search-channel"
                options={allPublicChannels}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search for a Channel" variant="outlined" />}
              /> */}

              <div className="drawer_public">
                <h3 className="public_title">Public</h3>
                <ul className="public_channel_list">
                  {userDetails.channels &&
                    (userDetails.channels as Channel[]).map((chan: Channel) => {
                      return (
                        !chan.private && (
                          <button
                            type="button"
                            className="channel_item"
                            key={chan.id}
                            onClick={(e) => changePage(e, chan)}
                          >
                            #{chan.name}
                          </button>
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
                          <button
                            type="button"
                            key={chan.id}
                            className="channel_item"
                            onClick={(e) => changePage(e, chan)}
                          >
                            #{chan.name}
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
