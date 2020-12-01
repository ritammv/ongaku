import React, { useRef, useState, useEffect } from 'react';
import './ChannelsInfo.scss';
import { useIsInScroll } from '../../../helpers/isInScroll';
import { infoContainerAnimation, fadeInAnimation } from '../../../helpers/animation';
import ChatIcon from '../../../assets/chat-icon.svg';
import ChannelTree from './ChannelTree/ChannelTree';

const ChannelsInfo: React.FC = () => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerIsInScroll = useIsInScroll(containerRef);
  const [infoContainerTimeline, setInfoContainerTimeline]
    = useState<GSAPTimeline | null>(null);

  const channelContentRef = useRef<HTMLDivElement>(null);
  const isInScrollInfo = useIsInScroll(channelContentRef);
  const [channelContentTimeline, setChannelContentTimeline]
    = useState<GSAPTimeline | null>(null);
  
  useEffect(() => {
    if (!infoContainerTimeline) {
      setInfoContainerTimeline(infoContainerAnimation());
    } 
    if (containerIsInScroll && infoContainerTimeline) {
      infoContainerTimeline.play();
    } else if (infoContainerTimeline) {
      infoContainerTimeline.reverse();
    }
  }, [containerIsInScroll, infoContainerTimeline]);

  useEffect(() => {
    if (!channelContentTimeline) setChannelContentTimeline(fadeInAnimation('channels-info_content'));
    if (isInScrollInfo && channelContentTimeline) {
      channelContentTimeline.play();
    } else if (channelContentTimeline) {
      channelContentTimeline.reverse();
    }
  }, [isInScrollInfo, channelContentTimeline]);

  return (
    <>
      <div className="container_channels-info" ref={containerRef}>
        <img src={ChatIcon} alt="chat icon" className="channels-info_chat-icon" />
        <div className="channels-info_content fadein" ref={channelContentRef}>
          <div className="content_title">Channels</div>
          <div className="content_body">
            <div className="body_first">
              Find Channels For Music You Love Where You Can Chat With Other
              Like Minded Music Enthusiasts
            </div>
            <div className="body_second">
              Share Music You Love, Ask Questions You've Always Had, Or 
              Just See If You Can Find Some New Awesome Music
            </div>
          </div>
        </div>
        <ChannelTree />
      </div>
    </>
  );
};

export default ChannelsInfo;