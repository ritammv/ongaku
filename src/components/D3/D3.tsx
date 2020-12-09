/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './D3.scss';
import { useSelector } from 'react-redux';
import { Graph } from './Graph';
import RenderGraph from './RenderGraph/RenderGraph';

const D3: React.FC = () => {
  const [graph, setGraph] = useState<Graph>(new Graph());
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    graph.addToGraph('labels', '1866', user.token, user.tokenSecret, true)
      .then((updatedGraph) => {
        console.log(updatedGraph);
        setGraph(updatedGraph);
      });
  }, []);

  const addToGraph = (type: string, id: string) => {
    graph.addToGraph(type, id, user.token, user.tokenSecret)
      .then((newGraph) => {
        console.log(newGraph);
      });
  };

  return (
    <>
      <RenderGraph data={graph} addToGraph={addToGraph} />
    </>
  );
};

export default D3;