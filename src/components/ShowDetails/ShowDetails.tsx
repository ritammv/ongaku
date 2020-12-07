import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ShowDetails.scss';
import { getFromDiscogs } from '../../helpers/apiClientServer';
// import ReleaseDetails from './ReleaseDetails/ReleaseDetails';

// release, artist, label, track(?)

const ShowDetails: React.FC = () => {
  const [data, setData] = useState<ReleaseDetails | null>(null);
  const user = useSelector((state: State) => state.user);

  const result: Result = {
    'country': 'UK',
    'year': '1963',
    'format': [
      'Vinyl',
      'LP',
      'Album',
      'Mono'
    ],
    'label': [
      'Parlophone',
      'Ernest J. Day & Co. Ltd.',
      'Northern Songs',
      'Jaep Music',
      'Frank Music',
      'Chappell',
      'Dominion Music',
      'Jewel Music',
      'Leeds Music',
      'Jobete Music',
      'E.M.I. Records Limited',
      'The Parlophone Co. Ltd.'
    ],
    'type': 'master',
    'genre': [
      'Rock'
    ],
    'style': [
      'Rock & Roll',
      'Pop Rock'
    ],
    'id': 45729,
    'barcode': [
      'XEX.447',
      'XEX.448',
      'XEX 447-1N',
      'XEX 448-1N',
      '1 P / 4 G T',
      'Mecolico',
      'BIEM',
      'NCB',
      'MKT'
    ],
    'user_data': {
      'in_wantlist': false,
      'in_collection': false
    },
    'master_id': 45729,
    'master_url': 'https://api.discogs.com/masters/45729',
    'uri': '/The-Beatles-With-The-Beatles/master/45729',
    'catno': 'PMC 1206',
    'title': 'The Beatles - With The Beatles',
    'thumb': 'https://img.discogs.com/nMq7oGtPld1JM6DwVDZQmJBSTIw=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-768729-1300115438.jpeg.jpg',
    'cover_image': 'https://img.discogs.com/A5d0DW0UJrSkkqraPIxUm5B8zNU=/fit-in/598x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-768729-1300115438.jpeg.jpg',
    'resource_url': 'https://api.discogs.com/masters/45729',
    'community': {
      'want': 89669,
      'have': 49161
    }
  };

  useEffect(() => {
    console.log(user);
    if (user.username !== '') {
      getFromDiscogs(result.master_url.split('.com')[1], user.token, user.tokenSecret)
        .then((resp: ReleaseDetails) => { 
          console.log(resp);
          setData(resp);
        });
    }
  }, [user]);

  return (
    <>
      Release detail page
      {/* { data &&
      <ReleaseDetails post={result} release={data} />} */}
    </>
  );
};

export default ShowDetails;