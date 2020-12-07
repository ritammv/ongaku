import React, { useRef, useState, useEffect } from 'react';
import './ChannelTree.scss';
import { useIsInScroll } from '../../../../helpers/isInScroll';
import { headerAnimation, treeAnimation } from '../../../../helpers/animation';

const ChannelTree: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerIsInScroll = useIsInScroll(containerRef);
  const [
    infoContainerTimeline,
    setInfoContainerTimeline,
  ] = useState<GSAPTimeline | null>(null);

  const containerRefHeader = useRef<HTMLDivElement | null>(null);
  const containerHeaderIsInScroll = useIsInScroll(containerRefHeader);
  const [
    headerInfoTimeline,
    setHeaderInfoTimeline,
  ] = useState<GSAPTimeline | null>(null);

  useEffect(() => {
    if (!infoContainerTimeline) setInfoContainerTimeline(treeAnimation());
    if (containerIsInScroll && infoContainerTimeline) {
      infoContainerTimeline.play();
    } else if (infoContainerTimeline) {
      infoContainerTimeline.reverse();
    }
  }, [containerIsInScroll, infoContainerTimeline]);

  useEffect(() => {
    if (!headerInfoTimeline) {
      setHeaderInfoTimeline(headerAnimation());
    }
    if (containerHeaderIsInScroll && headerInfoTimeline) {
      headerInfoTimeline.play();
    } else if (headerInfoTimeline) {
      headerInfoTimeline.reverse();
    }
  }, [headerInfoTimeline, containerHeaderIsInScroll]);

  return (
    <div className="channels-info_tree" ref={containerRef}>
      <div className="tree_first" ref={containerRefHeader}>
        <button type="button" className="tree_leaf">
          Electronic
        </button>
      </div>
      <div className="tree_second branch">
        <button type="button" className="tree_leaf">
          Techno
        </button>
        <button type="button" className="tree_leaf">
          House
        </button>
      </div>
      <div className="tree_third branch">
        <div className="tree_third_one">
          <button type="button" className="tree_leaf">
            Minimal
          </button>
          <button type="button" className="tree_leaf">
            Detroit
          </button>
        </div>
        <div className="tree_third_two">
          <button type="button" className="tree_leaf">
            Breaks
          </button>
          <button type="button" className="tree_leaf">
            Acid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelTree;
