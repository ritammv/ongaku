import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.scss';
import { useIsInScroll } from '../../../helpers/isInScroll';
import { makeFadeInAndSlide } from '../../../helpers/animation';
import { OnClickRoute } from '../../../helpers/onClickRoute';

const AboutUs: React.FC = () => {
  const handleClick = OnClickRoute();
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const isInScrollTitle = useIsInScroll(aboutTitleRef);
  const [titleTimeline, setTitleTimeline]
    = useState<GSAPTimeline | null>(null);

  const aboutContentRef = useRef<HTMLDivElement>(null);
  const isInScrollContent = useIsInScroll(aboutContentRef);
  const [contentTimeline, setContentTimeline]
    = useState<GSAPTimeline | null>(null);

  const aboutEndRef = useRef<HTMLDivElement>(null);
  const isInScrollEnd = useIsInScroll(aboutEndRef);
  const [endTimeline, setEndTimeline]
    = useState<GSAPTimeline | null>(null);
    

  useEffect(() => {
    if (!titleTimeline) {
      setTitleTimeline(makeFadeInAndSlide(['.about_title', '.about_subtitle'], '-=0.6'));
    }
    if (isInScrollTitle && titleTimeline) {
      titleTimeline.play();
    } else if (titleTimeline) {
      titleTimeline.reverse();
    }
  }, [isInScrollTitle, titleTimeline]);

  useEffect(() => {
    if (!contentTimeline) {
      setContentTimeline(makeFadeInAndSlide(['.about_content_one', '.about_content_two']));
    }
    if (isInScrollContent && contentTimeline) {
      contentTimeline.play();
    } else if (contentTimeline) {
      contentTimeline.reverse();
    }
  }, [isInScrollContent, contentTimeline]);

  useEffect(() => {
    if (!endTimeline) {
      setEndTimeline(makeFadeInAndSlide(['.about_content_three', '.buttons_join_bottom'], '-=0.5'));
    }
    if (isInScrollEnd && endTimeline) {
      endTimeline.play();
    } else if (endTimeline) {
      endTimeline.reverse();
    }
  }, [isInScrollEnd, endTimeline]);


  return (
    <div className="container_about">
      <div className="space_creator" />
      <div className="about_title logo-text" ref={aboutTitleRef}>音楽 - ongaku</div>
      <div className="about_subtitle">
        noun - on-gaku
      </div>
      <div className="about_content" ref={aboutContentRef}>
        <div className="about_content_one about_content_item">
          Ongaku is the Japanese Word for Music. It literally translates 
          as the Joy of Sound. Here at Ongaku we try to embody this feeling in 
          everything we do.
        </div>
        <div className="about_content_two about_content_item">
          We aim to provide a safe space for everyone to talk about music, 
          judgement free. We encourage you to become part of our community, 
          and treat everyone the same way you would wish to be treated. 
        </div>
        <div className="about_content_three about_content_item" ref={aboutEndRef}>
          <span>ありがとう</span>
          <span>Arigatō </span>
          Rizumu, Carles, Laundry, Mandji, Ji
        </div>
        <button type="button" className="buttons_join_bottom" onClick={() => handleClick('login')}>
          Log In With Discogs
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
