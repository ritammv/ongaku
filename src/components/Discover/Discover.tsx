import React from 'react';
import './discover.scss';
import GenreTags from './GenreTags/GenreTags';

const Discover = () => {
  return (
    <div className="discover_container">
      <div className="discover_header">
        <h1>Welcome Ritam</h1>
      </div>
      <div className="discover_title">
        <h2>What are you into?</h2>
      </div>
      <ul>
        <li>
          <GenreTags genre="#classical" />
        </li>
        <li>
          <GenreTags genre="#country" />
        </li>
        <li>
          <GenreTags genre="#electronic" />
        </li>
        <li>
          <GenreTags genre="#hip-hop" />
        </li>
        <li>
          <GenreTags genre="#indie" />
        </li>
        <li>
          <GenreTags genre="#jazz" />
        </li>
        <li>
          <GenreTags genre="#rock" />
        </li>
        <li>
          <GenreTags genre="#metal" />
        </li>
        <li>
          <GenreTags genre="#rap" />
        </li>
        <li>
          <GenreTags genre="#experimental" />
        </li>
        <li>
          <GenreTags genre="#pop" />
        </li>
        <li>
          <GenreTags genre="#latin" />
        </li>
      </ul>
    </div>
  );
};

export default Discover;
