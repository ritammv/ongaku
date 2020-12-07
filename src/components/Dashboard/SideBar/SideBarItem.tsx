import React, { useEffect, useState } from 'react';
import { getChannel } from '../../../helpers/apiClientServer';

interface Props {
  channel: Channel;
  activeChannel: Channel;
  user: User;
  changePage: (
    e:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newChannel: Channel) => void;
  unsubscribe: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    newChannel: Channel) => void;
}

const SideBarItem: React.FC<Props> = (
  { channel, activeChannel, changePage, unsubscribe, user }) => {

  const [currChannel, setCurrChannel] = useState<ChannelAndUsers>({
    users: 0,
    channel
  });

  // const filteredSubChannels = currChannel.channel.subChannel.filter(
  //   (subChan) => user.channels.id === subChan.id)

  useEffect(() => {
    getChannel(channel.id)
      .then((result: ChannelAndUsers) => {
        setCurrChannel(result);
      });
  }, []);


  
  return (
    <>
      
 
      <div className='channel_list_content'>
        <button
          type="button"
          className={`channel_item ${
            channel.name === activeChannel.name ? 'active' : ''
          }`}
          onClick={(e) => changePage(e, channel)}
        >
          #{channel.name}
        </button>
        <button
          type="button"
          className="unsubscribe_channel"
          onClick={(e) => unsubscribe(e, channel)}
        >
          x
        </button>
      </div>


          

    </>
  );
};

export default SideBarItem;
