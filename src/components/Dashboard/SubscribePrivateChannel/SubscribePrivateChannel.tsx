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

import { subscribeToChannels } from '../../../helpers/apiClientServer';

interface Props {
  showSubscribe: boolean;
  setShowSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubscribePrivateChannel = ({
  showSubscribe,
  setShowSubscribe,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector<State, User>((state: State) => state.user);
  const dispatch = useDispatch();

  const [options, setOptions] = useState([
    {
      id: '',
      name: '',
    },
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);

    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options) {
      subscribeToChannels(user.id, options).then((newChannel) => {
        dispatch(actions.addChannel(newChannel));
      });
    }
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
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                type="text"
                className="search_input create_channel_form"
                placeholder="..."
                name="id"
                onChange={handleChange}
              />
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Go Back
              </Button>
              <Button variant="ghost">Subscribe</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubscribePrivateChannel;
