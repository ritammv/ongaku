/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './D3.scss';
import d3 from 'd3';
import { useSelector } from 'react-redux';
import { getFromDiscogs } from '../../helpers/apiClientServer';
import { Graph } from './Graph';

const D3: React.FC = () => {
  const [graph, setGraph] = useState<Graph>(new Graph());
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    // getFromDiscogs('/artists/52835', user.token, user.tokenSecret)
    //   .then((dataResp) => {
    //     console.log(dataResp);
    //   });
    graph.addToGraph('masters', '324737', user.token, user.tokenSecret, true)
      .then((updatedGraph) => {
        // console.log(updatedGraph);
        console.log(updatedGraph);
        // setGraph(updatedGraph);
        // "https://api.discogs.com/masters/324737"
        // updatedGraph.addToGraph('masters', '324737', user.token, user.tokenSecret)
        //   .then((secondUpdatedGraph) => {
        //     console.log(secondUpdatedGraph);
        //   });
      });
  }, []);

  return (
    <>
    </>
  );
};

export default D3;