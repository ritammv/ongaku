import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDisclosure,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
} from '@chakra-ui/react';
import * as actions from '../../../store/actionCreators';
import { OnClickRoute } from '../../../helpers/onClickRoute';
import { createChannel, getChannels } from '../../../helpers/apiClientServer';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeChannels: () => void;
}

const CreateChannel: React.FC<Props> = ({
  showModal,
  setShowModal,
  closeChannels,
}) => {
  const navigate = OnClickRoute();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channels, setChannels] = useState<Channel[]>([]);
  const user = useSelector<State, User>((state: State) => state.user);
  const [options, setOptions] = useState({
    name: '',
    parentId: '',
    isPrivate: false,
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    setShowModal(false);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (options) {
      createChannel(user.id, options).then((newChannel) => {
        dispatch(actions.addChannel(newChannel));
        navigate(`channels/${newChannel.name}`);
        onClose();
        closeChannels();
      });
      setOptions({
        name: '',
        parentId: '',
        isPrivate: false,
      });
    }
  };

  useEffect(() => {
    if (showModal) onOpen();
  }, [showModal, onOpen]);

  useEffect(() => {
    getChannels().then((channelsReq) => {
      setChannels(channelsReq);
    });
  }, []);

  // useEffect(() => {
  //   getPublicChannels().then((publicChannels) => {
  //     setAllChannels(publicChannels);
  //   });
  // }, []);

  return (
    <div className="create_channel">
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="lg">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Create a channel</DrawerHeader>
            <DrawerCloseButton onClick={() => handleClose()} />
            <form onSubmit={handleSubmit}>
              <DrawerBody>
                Channel Title
                <Input
                  className="search_input"
                  id="channel_title"
                  type="text"
                  placeholder="#"
                  name="name"
                  onChange={handleChange}
                  value={options.name}
                />
                <Select
                  name="isPrivate"
                  onChange={handleChange}
                  placeholder="Public"
                  value={options.isPrivate.toString()}
                >
                  <option value="true">Private</option>
                </Select>
                <Select
                  name="parentId"
                  onChange={handleChange}
                  placeholder="Genre"
                  value={options.parentId}
                >
                  {channels &&
                    channels.map((channel: Channel, i: number) => (
                      <option key={channel.id} value={channel.id}>
                        {channel.name}
                      </option>
                    ))}
                </Select>
              </DrawerBody>

              <DrawerFooter>
                <button className="genre_tag_button" type="submit">
                  Create!
                </button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default CreateChannel;
