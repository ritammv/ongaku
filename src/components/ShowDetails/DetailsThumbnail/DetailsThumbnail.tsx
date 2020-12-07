/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteFromDiscogs, getFromDiscogs, postToDiscogs, putToDiscogs } from '../../../helpers/apiClientServer';
import { Details } from '../getDetails';
import './DetailsThumbnail.scss';

interface Props {
  data: Details
}

const DetailsThumbnail: React.FC<Props> = ({ data }) => {
  const user = useSelector((state: State) => state.user);
  const [isWaitingWants, setIsWaitingWants] = useState(false); 
  const [isWaitingCollection, setIsWaitingCollection] = useState(false); 

  const handleClick = (list: string) => {
    if (!data.user_data.in_wantlist && list === 'want') {
      setIsWaitingWants(true);
      putToDiscogs(
        `/users/${user.username}/wants/${data.id}`,
        user.token,
        user.tokenSecret,
        '',
        ''
      )
        .then((respFromWant) => { 
          console.log(respFromWant);
          data.user_data.in_wantlist = true; 
          setIsWaitingWants(false);
        });
    } else if (data.user_data.in_wantlist && list === 'want') {
      setIsWaitingWants(true);
      deleteFromDiscogs(
        `/users/${user.username}/wants/${data.id}`,
        user.token,
        user.tokenSecret
      )
        .then((respFromWantDelete) => { 
          console.log(respFromWantDelete);
          data.user_data.in_wantlist = false;
          setIsWaitingWants(false);
        });
    } else if (!data.user_data.in_collection && list === 'collection') {
      setIsWaitingCollection(true);
      postToDiscogs(
        `/users/${user.username}/collection/folders/1/releases/${data.id}`,
        user.token,
        user.tokenSecret,
        '',
        ''
      )
        .then((respData) => { 
          console.log(respData);
          data.user_data.in_collection = true;
          setIsWaitingCollection(false);
        });
    } else if (data.user_data.in_collection && list === 'collection') {
      setIsWaitingCollection(true);
      getFromDiscogs(
        `/users/${user.username}/collection/releases/${data.id}`,
        user.token,
        user.tokenSecret
      ).then((folder) => {
        console.log(folder);
        deleteFromDiscogs(
          `/users/${user.username}/collection/folders/${folder.releases[0].folder_id}/releases/${data.id}/instances/${folder.releases[0].instance_id}`,
          user.token,
          user.tokenSecret
        )
          .then((respFromDel) => { 
            console.log(respFromDel);
            data.user_data.in_collection = false; 
            setIsWaitingCollection(false);
          });
      });
    } 
  };
  return (
    <>
      <div className="img_buttons_container">
        <div className="content_thumb_container">
          <img src={data.thumb ? data.thumb : ''} alt="thumbnail" />
        </div>
        {data.user_data &&
        <div className="content_body_buttons">
          <button 
            type="button"
            disabled={isWaitingWants}
            className={`button_wants ${data.user_data.in_wantlist && 'is_in'} ${isWaitingWants ? 'button_inactive' : ''}`} 
            onClick={() => handleClick('want')}
          >
            {data.user_data.in_wantlist ? '-' : '+'} Wantlist
          </button>
          <button 
            type="button"
            disabled={isWaitingCollection}
            className={`button_collection ${data.user_data.in_collection && 'is_in'} ${isWaitingCollection ? 'button_inactive' : ''}`}
            onClick={() => handleClick('collection')}
          >
            Collection {data.user_data.in_collection ? '-' : '+'}
          </button>
        </div>}
      </div>
    </>
  );
};

export default DetailsThumbnail;