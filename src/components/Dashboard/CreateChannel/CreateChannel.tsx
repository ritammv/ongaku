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
  useToast,
} from '@chakra-ui/react';
import './createChannel.scss';
import * as actions from '../../../store/actionCreators';
import { OnClickRoute } from '../../../helpers/onClickRoute';
import {
  createChannel,
  getChannels,
  getAllChannels,
} from '../../../helpers/apiClientServer';

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
  const toast = useToast();
  const navigate = OnClickRoute();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [allChannels, setAllChannels] = useState<Channel[]>([]);
  const user = useSelector<State, User>((state: State) => state.user);
  const [duplicate, setDuplicate] = useState<boolean>(false);
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
        if (newChannel) {
          dispatch(actions.addChannel(newChannel));
          navigate(`channels/${newChannel.name}`);
          onClose();
          closeChannels();
        } else {
          setDuplicate(true);
          toast({
            title: 'Channel already exists',
            description: 'Go join the conversation',
            status: 'warning',
            duration: 6000,
            isClosable: true,
          });
        }
      });
    }

    setOptions({
      name: '',
      parentId: '',
      isPrivate: false,
    });
  };

  useEffect(() => {
    if (showModal) onOpen();
  }, [showModal, onOpen]);

  useEffect(() => {
    getChannels().then((channelsReq) => {
      setChannels(channelsReq);
    });

    getAllChannels().then((allChannelsReq) => {
      setAllChannels(allChannelsReq);
    });
  }, []);

  return (
    <div className="create_channel">
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="lg">
        <DrawerOverlay>
          <DrawerContent style={{ backgroundColor: '#2d3848' }}>
            <DrawerHeader style={{ textAlign: 'center', fontSize: '20px' }}>
              Create a Channel
            </DrawerHeader>
            <DrawerCloseButton onClick={() => handleClose()} />
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setDuplicate(false);
              }}
            >
              <DrawerBody>
                Channel Title
                <Input
                  className="search_input create_channel_form"
                  style={{ border: '1px solid gray' }}
                  id="channel_title"
                  type="text"
                  placeholder="#"
                  name="name"
                  onChange={handleChange}
                  value={options.name}
                  required
                />
                <Select
                  className="create_channel_form"
                  style={{ border: '1px solid gray' }}
                  name="isPrivate"
                  onChange={handleChange}
                  placeholder="Public"
                  value={options.isPrivate.toString()}
                >
                  <option value="true">Private</option>
                </Select>
                <Select
                  className="create_channel_form"
                  style={{ border: '1px solid gray' }}
                  name="parentId"
                  onChange={handleChange}
                  placeholder="Genre"
                  value={options.parentId}
                  required
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
                <button className="genre_tag_button two" type="submit">
                  Create
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
