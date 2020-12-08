/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DetailsPage.scss';
import { Details } from './getDetails';

import DetailsThumbnail from './DetailsThumbnail/DetailsThumbnail';
import AdditionalDetails from './AdditionalDetails/AdditionalDetails';
import ChannelNav from '../Channel/ChannelNavBar/ChannelNavBar';
import { setIsLoading } from '../../store/actionCreators';

interface Props {
  type: string;
  route: string;
}

const DetailsPage: React.FC<Props> = ({ type, route }) => {
  const [data, setData] = useState<Details | null>(null);
  const user = useSelector((state: State) => state.user);
  const isLoading = useSelector((state: State) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.username !== '') {
      Details.parse(`${type}/${route}`, user, type).then((parseData) => {
        parseData.type = type;
        setData(parseData);
        dispatch(setIsLoading(false));
      });
    }
  }, [user, route, type]);

  return (
    <>
      {!isLoading && data ? (
        <>
          <ChannelNav name={data.title ? data.title : data.name} />
          <div className="show-details_header" />
          <div className="body_container_details">
            <DetailsThumbnail data={data} />
          </div>
          <AdditionalDetails data={data} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default DetailsPage;
