/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import './AdditionalDetails.scss';
import { useSelector } from 'react-redux';
import { Details } from '../getDetails';
import { OnClickRoute } from '../../../helpers/onClickRoute';
import { getFromDiscogs } from '../../../helpers/apiClientServer';

interface Props {
  data: Details;
}

const AdditionalDetails: React.FC<Props> = ({ data }) => {
  const user = useSelector((state: State) => state.user);
  const [showTracks, setShowTracks] = useState<boolean>(false);
  const [showRelease, setShowRelease] = useState<boolean>(false);
  const navigate = OnClickRoute();

  const navigateAway = (url: string) => {
    setShowTracks(false);
    setShowRelease(false);
    navigate(`${`details/${url.split('.com/')[1]}`}`);
  };

  const handleClick = () => {
    setShowTracks((curr) => !curr);
  };

  const handleClickRelease = () => {
    setShowRelease((curr) => !curr);
  };

  const fetchMore = () => {
    getFromDiscogs(`/${data.moreReleases.split('com/')[1]}`, user.token, user.tokenSecret)
      .then((results) => {
        data.moreReleases = results.pagination.urls.next;
        data.releases = [...data.releases, ...results.releases];
      });
  };

  const mapAndFormat = (array: any[], iteratee: string) => {
    return array.map((el: any, i) => (
      <span className="link_hover" key={el[iteratee]} onClick={() => navigateAway(el.resource_url)}>
        {i === array.length - 1 ? el[iteratee] : `${el[iteratee]}, `}
      </span>
    ));
  };

  return (
    <>
      <div className="container_details">
        {data.country && data.year && 
        <div className="details_country_year detail_item">
          <h1><span>Country</span>: {data.country}</h1>
          <h1><span>Year</span>: {data.year}</h1>
        </div>}
        {data.artists && 
          <div className="details_artists detail_item">
            <h1>
              <span>Artist{data.artists.length > 1 ? 's' : ''}</span>: 
              {mapAndFormat(data.artists, 'name')}
            </h1>
          </div>}
        {data.community && 
        <div className="details_rating_average detail_item">
          <h1><span>Average</span>: {data.community.rating.average}</h1>
          <h1><span>Votes</span>: {data.community.rating.count}</h1>
        </div>}
        {data.num_for_sale && data.lowest_price &&
        <div className="details_for_sale detail_item">
          <h1><span>For Sale</span>: {data.num_for_sale}</h1>
          <h1><span>Lowest</span>: {data.lowest_price}$</h1>
        </div>}
        {data.genres && 
          <div className="details_genres detail_item">
            <h1><span>Genre{data.genres.length > 1 ? 's' : ''}</span>: {data.genres.join(', ')}</h1>
          </div>}
        {data.styles && 
          <div className="details_styles detail_item">
            <h1><span>Style{data.styles.length > 1 ? 's' : ''}</span>: {data.styles.join(', ')}</h1>
          </div>}
        {data.labels && 
          <div className="details_labels detail_item">
            <h1>
              <span>
                Labels{data.labels.length > 1 ? 's' : ''}
              </span>: 
              {mapAndFormat(data.labels, 'name')}
            </h1>
          </div>}
        {data.notes &&
        <div className="details_notes detail_item">
          <h1><span>Notes</span>: {data.notes}</h1>
        </div>}
        { data.tracklist && 
          <div className="details_tracklist">
            <div className="tracklist_header" onClick={handleClick}>See Tracks <span>{'>'}</span></div>
            { showTracks && 
            data.tracklist.map((track) => (
              <div className="tracklist_track" key={track.title}>
                <div className="track_title">
                  {track.title}
                </div>
                <div className="track_duration">
                  {track.duration ? track.duration : '0:00'}
                </div>
              </div>))}
          </div>}
        {data.name &&
          <div className="details_name detail_item">
            <h1><span>Name</span>: {data.name}</h1>
          </div>}
        {data.aliases &&
          <div className="details_aliases detail_item">
            <h1>
              <span>Aliases</span>:  
              {mapAndFormat(data.aliases, 'name')}
            </h1>
          </div>}
        {data.profile &&
          <div className="details_profile detail_item">
            <h1>
              <span>Profile</span>:  
              {data.profile}
            </h1>
          </div>}
        {data.releases && 
        <div className="details_releases">
          <div className="releases_header" onClick={handleClickRelease}>See Releases <span>{'>'}</span></div>
          { showRelease && 
            data.releases.map((release, i) => (
              <div className="releases_release" key={release.id}>
                <div className="release_name" onClick={() => navigateAway(release.resource_url)}>
                  {release.title}
                </div>
              </div>))}
          {showRelease && data.moreReleases && 
            <div className="releases_fetch_more" onClick={fetchMore}>
              See More <span>{'>'}</span>
            </div>}
        </div>}
      </div>
      )
    </>
  );
};

export default AdditionalDetails;