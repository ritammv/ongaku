import React, { useEffect, useState } from 'react';
import './discover.scss';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import GenreTags from './GenreTags/GenreTags';
import { getChannels } from '../../helpers/apiClientServer';

const Discover: React.FC = () => {
  const [channels, setChannels] = useState<Channel[] | null>(null);
  useEffect(() => {
    getChannels()
      .then((channelsReq) => {
        setChannels(channelsReq);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        gsap
          .timeline()
          .from('.li0', { opacity: 0, duration: 0.2 })
          .from('.li5', { opacity: 0, duration: 0.2 })
          .from('.li1', { opacity: 0, duration: 0.2 })
          .from('.li6', { opacity: 0, duration: 0.2 })
          .from('.li2', { opacity: 0, duration: 0.2 })
          .from('.li7', { opacity: 0, duration: 0.2 })
          .from('.li3', { opacity: 0, duration: 0.2 })
          .from('.li8', { opacity: 0, duration: 0.2 })
          .from('.li4', { opacity: 0, duration: 0.2 })
          .from('.li9', { opacity: 0, duration: 0.2 });
      });
  }, []);

  return (
    <div className="discover_container">
      <div className="discover_header">
        <h3>Welcome Ritam</h3>
      </div>
      <div className="discover_title">
        <h4>Discover your channels...</h4>
      </div>

      <div className="genre_container">
        <ul className="genre_list">
          {channels &&
            channels.map((channel: Channel, i: number) => (
              <li className={`li${i} genre_list_item`} key={channel.id}>
                <GenreTags genre={channel.name} />
              </li>
            ))}
        </ul>
      </div>
      <div className="discover_next">
        <Link to="/dashboard">
          <button
            className="genre_tag_button"
            style={{ color: ' black', backgroundColor: 'white ' }}
            type="button"
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Discover;
