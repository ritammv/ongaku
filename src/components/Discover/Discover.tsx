import React, { useEffect } from 'react';
import './discover.scss';
import gsap from 'gsap';
import GenreTags from './GenreTags/GenreTags';

const Discover: React.FC = () => {
  const genres: string[] = [
    '#classical',
    '#country',
    '#electronic',
    '#hip-hop',
    '#indie',
    '#jazz',
    '#rock',
    '#metal',
    '#experimental',
    '#pop',
  ];

  useEffect(() => {
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
          {genres.map((genre, i) => (
            <li className={`li${i} genre_list_item`} key={genre}>
              <GenreTags genre={genre} />
            </li>
          ))}
        </ul>
      </div>
      <div className="discover_next">
        <button
          className="genre_tag_button"
          style={{ color: ' black', backgroundColor: 'white ' }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Discover;
