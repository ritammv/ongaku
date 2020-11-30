import React, { useEffect } from 'react';
import './discover.scss';
import gsap from 'gsap';
import GenreTags from './GenreTags/GenreTags';

const Discover = () => {
  const genres = [
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
      .from('.li0', { opacity: 0, duration: 0.25 })
      .from('.li1', { opacity: 0, duration: 0.25 })
      .from('.li2', { opacity: 0, duration: 0.25 })
      .from('.li3', { opacity: 0, duration: 0.25 })
      .from('.li4', { opacity: 0, duration: 0.25 })
      .from('.li5', { opacity: 0, duration: 0.25 })
      .from('.li6', { opacity: 0, duration: 0.25 })
      .from('.li7', { opacity: 0, duration: 0.25 })
      .from('.li8', { opacity: 0, duration: 0.25 })
      .from('.li9', { opacity: 0, duration: 0.25 })
      .from('.li10', { opacity: 0, duration: 0.25 });
  }, []);

  return (
    <div className="discover_container">
      <div className="discover_header">
        <h3>Welcome Ritam</h3>
      </div>
      <div className="discover_title">
        <h4>Discover...</h4>
      </div>

      <div className="genre_container">
        <ul>
          {genres.map((genre, i) => (
            <li className={`li${i}`} key={genre}>
              <GenreTags genre={genre} />
            </li>
          ))}
        </ul>
      </div>
      <div className="discover_next">
        <button className="next_button" type="button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Discover;
