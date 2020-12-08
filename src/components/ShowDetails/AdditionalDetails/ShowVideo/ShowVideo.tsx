/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import './ShowVideo.scss';

interface Props {
  data: {
    description: string;
    uri: string;
    title: string;
  }[];
}

const ShowVideo: React.FC<Props> = ({ data }) => {
  const [currVideo, setCurrVideo] = useState<number>(0);

  const videoChange = (incr: number) => {
    setCurrVideo((curr) => {
      if  (incr === -1 && curr === 0) return data.length - 1; 
      if (incr === 1 && curr === data.length - 1) return 0;
      return curr + incr;
    });
  };

  return (
    <> 
      <div className="detail_video_container detail_item">
        <div className="video_title">
          <h1>{data && data[currVideo].title}</h1>
        </div>
        <div className="video_frame">
          <iframe
            src={data[currVideo].uri.replace('watch?v=', 'embed/')}
            frameBorder='0'
            allow='autoplay; encrypted-media'
            title='video'
          />
        </div>
        {data.length > 1 &&
        <div className="video_buttons">
          <button className="video_buttons_prev" type="button" onClick={() => videoChange(-1)}>Previous Video</button>
          <button className="video_buttons_next" type="button" onClick={() => videoChange(1)}>Next Video</button>
        </div>}
      </div>
    </>
  );
};

export default ShowVideo;