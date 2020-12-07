/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './DetailsPage.scss';
import { Details } from './getDetails';
import Header from './Header/Header';
import DetailsThumbnail from './DetailsThumbnail/DetailsThumbnail';
import AdditionalDetails from './AdditionalDetails/AdditionalDetails';

interface Props {
  type: string;
  route: string; 
}

const DetailsPage: React.FC<Props> = ({ type, route }) => {
  const [data, setData] = useState<Details | null>(null);
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    if (user.username !== '') {
      Details.parse(`${type}/${route}`, user, type)
        .then((parseData) => { 
          parseData.type = type;
          setData(parseData);
        });
    }
  }, [user, route, type]);

  return (
    <>
      { data ?
        <>
          <div className="show-details_header">
            <Header data={data} />
          </div>
          <div className="body_container_details">
            <DetailsThumbnail data={data} />
          </div>
          <AdditionalDetails data={data} />
        </> :
        <h1>Loading...</h1>}
    </>
  );
};

export default DetailsPage;