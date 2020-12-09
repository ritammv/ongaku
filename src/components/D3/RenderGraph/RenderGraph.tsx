/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import './RenderGraph.scss';
import d3 from 'd3';
import { useSelector } from 'react-redux';
import { Graph, D3Node, D3Link } from '../Graph';

interface Props {
  data: Graph;
  addToGraph: (type: string, id: string) => void;
}

interface SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
}

const RenderGraph: React.FC<Props> = ({ data, addToGraph }) => {
  const user = useSelector((state: State) => state.user);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colorScale = d3.scaleOrdinal()
    .domain(['artists', 'release', 'masters', 'track', 'label'])
    .range(['red', 'blue', 'blue', 'orange', 'green']);
  const simulation: any = d3.forceSimulation()
    .force('link', d3.forceLink().id((d: D3Node) => d.name));

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="graph_container" ref={containerRef}>
        graph
      </div>
    </>
  );
};

export default RenderGraph;