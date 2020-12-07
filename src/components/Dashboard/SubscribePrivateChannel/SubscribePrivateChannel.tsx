import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import * as actions from '../../../store/actionCreators';
import { OnClickRoute } from '../../../helpers/onClickRoute';

import { subscribeToChannels } from '../../../helpers/apiClientServer';

interface Props {
  showSubscribe: boolean;
  setShowSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
  closePrivateChannels: () => void;
}

const SubscribePrivateChannel = ({
  showSubscribe,
  setShowSubscribe,
  closePrivateChannels,
}: Props) => {
  const navigate = OnClickRoute();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector<State, User>((state: State) => state.user);
  const dispatch = useDispatch();
  const [options, setOptions] = useState<{ id: string }>({
    id: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);

    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setShowSubscribe(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options) {
      subscribeToChannels(user.id, options).then((newChannel) => {
        if (newChannel) dispatch(actions.addChannel(newChannel));
        navigate(`channels/${newChannel.name}`);
        onClose();
        closePrivateChannels();
      });
    }
    setOptions({
      id: '',
    });
  };

  useEffect(() => {
    if (showSubscribe) onOpen();
  }, [showSubscribe, onOpen]);
  return (
    <div className="subscribe_channel">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Copy and paste your unique code here...</ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                type="text"
                className="search_input create_channel_form"
                placeholder="..."
                name="id"
                onChange={handleChange}
                value={options.id}
              />
            </ModalBody>

            <ModalFooter>
              <button className="genre_tag_button channel_btn" type="submit">
                Subscribe
              </button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubscribePrivateChannel;
