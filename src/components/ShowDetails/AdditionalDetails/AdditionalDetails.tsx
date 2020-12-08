/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import './AdditionalDetails.scss';
import { useDispatch, useSelector } from 'react-redux';

import { Details } from '../getDetails';
import { OnClickRoute } from '../../../helpers/onClickRoute';
import { getFromDiscogs } from '../../../helpers/apiClientServer';
import RenderList from './RenderList/RenderList';
import ShowVideo from './ShowVideo/ShowVideo';
import { setIsLoading } from '../../../store/actionCreators';

interface Props {
  data: Details;
}

const AdditionalDetails: React.FC<Props> = ({ data }) => {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const [showTracks, setShowTracks] = useState<boolean>(false);
  const [showRelease, setShowRelease] = useState<boolean>(false);
  const [showExtra, setShowExtra] = useState<boolean>(false);
  const [moreReleases, setMoreReleases] = useState<string | boolean>(false);
  const [list, setList] = useState<ReleaseDetail[] | null>(null);
  const navigate = OnClickRoute();

  const navigateAway = (url: string) => {
    setShowTracks(false);
    setShowRelease(false);
    dispatch(setIsLoading(true));
    navigate(`${`details/${url.split('.com/')[1]}`}`);
  };

  const fetchMore = () => {
    if (data.moreReleases) {
      getFromDiscogs(
        `/${data.moreReleases.split('com/')[1]}`,
        user.token,
        user.tokenSecret
      ).then((results) => {
        setList((curr) => {
          if (curr) return [...curr, ...results.releases];
          return curr;
        });
        setMoreReleases(
          results.pagination.urls.next ? results.pagination.urls.next : false
        );
      });
    }
  };

  useEffect(() => {
    if (data.releases) setList(data.releases);
    if (data.moreReleases) setMoreReleases(data.moreReleases);
  }, [data.releases, data.moreReleases]);

  const mapAndFormat = (array: any[], iteratee: string) => {
    return array.map((el: any, i) => (
      <span
        className="link_hover"
        key={el[iteratee]}
        onClick={() => navigateAway(el.resource_url)}
      >
        {i === array.length - 1 ? ` ${el[iteratee]}` : ` ${el[iteratee]},`}
      </span>
    ));
  };

  return (
    <>
      <div className="container_details">
        {data.country && data.year && data.year > 0 && (
          <div className="details_country_year detail_item">
            <h1>
              <span className="details_span_title">Country</span>:{' '}
              {data.country}
            </h1>
            <h1>
              <span className="details_span_title">Year</span>: {data.year}
            </h1>
          </div>
        )}
        {data.artists && (
          <div className="details_artists detail_item">
            <h1>
              <span className="details_span_title">
                Artist{data.artists.length > 1 ? 's' : ''}
              </span>
              :{mapAndFormat(data.artists, 'name')}
            </h1>
          </div>
        )}
        {data.community && (
          <div className="details_rating_average detail_item">
            <h1>
              <span className="details_span_title">Average</span>:{' '}
              {data.community.rating.average}
            </h1>
            <h1>
              <span className="details_span_title">Votes</span>:{' '}
              {data.community.rating.count}
            </h1>
          </div>
        )}
        {data.num_for_sale && data.num_for_sale > 0 && data.lowest_price && (
          <div className="details_for_sale detail_item">
            <h1>
              <span className="details_span_title">For Sale</span>:{' '}
              {data.num_for_sale}
            </h1>
            <h1>
              <span className="details_span_title">Lowest</span>:{' '}
              {data.lowest_price}$
            </h1>
          </div>
        )}
        {data.genres && (
          <div className="details_genres detail_item">
            <h1 className="details_span_title">
              <span className="details_span_title">
                Genre{data.genres.length > 1 ? 's' : ''}
              </span>
              : {data.genres.join(', ')}
            </h1>
          </div>
        )}
        {data.styles && (
          <div className="details_styles detail_item">
            <h1>
              <span className="details_span_title">
                Style{data.styles.length > 1 ? 's' : ''}
              </span>
              : {data.styles.join(', ')}
            </h1>
          </div>
        )}
        {data.labels && (
          <div className="details_labels detail_item">
            <h1>
              <span className="details_span_title">
                Label{data.labels.length > 1 ? 's' : ''}
              </span>
              :{mapAndFormat(data.labels, 'name')}
            </h1>
          </div>
        )}
        {data.notes && (
          <div className="details_notes detail_item">
            <h1>
              <span className="details_span_title">Notes</span>:
              {showExtra ? ` ${data.notes}` : ` ${data.notes.substr(0, 100)}`}
              {data.notes.length > 80 && (
                <span
                  className="link_hover"
                  onClick={() => setShowExtra((curr) => !curr)}
                >
                  {' '}
                  {showExtra ? 'Show Less' : '... Show More'}
                </span>
              )}
            </h1>
          </div>
        )}
        {data.tracklist && (
          <div className="details_tracklist">
            <div
              className="tracklist_header"
              onClick={() => setShowTracks((curr) => !curr)}
            >
              See Tracks <span>{'>'}</span>
            </div>
            {showTracks &&
              data.tracklist.map((track) => (
                <div className="tracklist_track" key={track.title}>
                  <div className="track_title">{track.title}</div>
                  <div className="track_duration">
                    {track.duration ? track.duration : '0:00'}
                  </div>
                </div>
              ))}
          </div>
        )}
        {data.name && (
          <div className="details_name detail_item">
            <h1>
              <span className="details_span_title">Name</span>: {data.name}
            </h1>
          </div>
        )}
        {data.aliases && (
          <div className="details_aliases detail_item">
            <h1>
              <span className="details_span_title">Aliases</span>:
              {mapAndFormat(data.aliases, 'name')}
            </h1>
          </div>
        )}
        {data.profile && (
          <div className="details_profile detail_item">
            <h1>
              <span className="details_span_title">Profile</span>:
              {showExtra ? data.profile : data.profile.substr(0, 80)}
              {data.profile.length > 80 && (
                <span
                  className="show_more"
                  onClick={() => setShowExtra((curr) => !curr)}
                >
                  {' '}
                  {showExtra ? 'Show Less' : '... Show More'}
                </span>
              )}
            </h1>
          </div>
        )}
        {data.releases && (
          <div className="details_releases">
            <div
              className="releases_header"
              onClick={() => setShowRelease((curr) => !curr)}
            >
              See Releases <span>{'>'}</span>
            </div>
            {showRelease && (
              <RenderList
                data={list}
                navigateAway={navigateAway}
                fetchMore={fetchMore}
                moreReleases={moreReleases}
              />
            )}
          </div>
        )}
        {data.videos && (
          <>
            <ShowVideo data={data.videos} />
          </>
        )}
      </div>
    </>
  );
};

export default AdditionalDetails;
