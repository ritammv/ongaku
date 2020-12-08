/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import './RenderList.scss';

interface Props {
  data: ReleaseDetail[] | null;
  navigateAway: (url: string) => void;
  fetchMore: () => void;
  moreReleases: boolean | string;
}

const RenderList: React.FC<Props> = ({ data, navigateAway, fetchMore, moreReleases }) => {
  return (
    <> 
      {data && 
      data.map((release, i) => (
        <div className="releases_release" key={release.id}>
          <div className="release_name" onClick={() => navigateAway(release.resource_url)}>
            {release.title}
          </div>
        </div>))}
      {moreReleases && 
        <div className="releases_fetch_more" onClick={fetchMore}>
          See More <span>{'>'}</span>
        </div>}
    </>
  );
};

export default RenderList;