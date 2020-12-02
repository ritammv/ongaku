import React, { useEffect, useState } from 'react';
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

import { createChannel, getChannels } from '../../../helpers/apiClientServer';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChannel: React.FC<Props> = ({ showModal, setShowModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const initialState = {
    title: '',
    parentId: '',
    isPrivate: false,
  };
  const [options, setOptions] = useState(initialState);
  const handleClose = () => {
    onClose();
    setShowModal(false);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, isPrivate, parentId } = options;

    if (title && isPrivate && parentId) {
      createChannel(options);
      setOptions(initialState);
    }
  };

  useEffect(() => {
    if (showModal) onOpen();
  }, [showModal, onOpen]);

  useEffect(() => {
    getChannels().then((channelsReq) => {
      setChannels(channelsReq);
    });
  });

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
                  name="title"
                  onChange={handleChange}
                  value={options.title}
                />
                <Select
                  name="isPrivate"
                  onChange={handleChange}
                  placeholder="Privacy"
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
