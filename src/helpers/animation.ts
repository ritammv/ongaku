import gsap from 'gsap';
import { TLSSocket } from 'tls';

export const heroAnimation = (): GSAPTimeline => {
  return gsap.timeline()
    .to('.container_hero', { opacity: 1, duration: 0.1 })
    .from('.logo img', { opacity: 0, duration: 1 })
    .from('.logo_title', { opacity: 0, y: 100, duration: 1 }, '-=0.5')
    .from('#music', { opacity: 0, x: 10, duration: 0.4 })
    .from('#sharing', { opacity: 0, x: 10, duration: 0.4 })
    .from('#community', { opacity: 0, x: 10, duration: 0.4 })
    .from('.buttons_join', { opacity: 0, x: -40, duration: 0.5 })
    .from('.buttons_channels', { opacity: 0, x: 40, duration: 0.5 }, '-=0.5');
};

export const infoContainerAnimation = (): GSAPTimeline => {
  return gsap.timeline({ paused: true })
    .to('.container_channels-info', { opacity: 1, duration: 0.01 })
    .to('.container_channels-info img', { opacity: 1, x: 0, duration: 1 });
};

export const fadeInAnimation = (className: string): GSAPTimeline => {
  return gsap.timeline({ paused: true })
    .to(`.${className}.fadein`, { opacity: 1, duration: 1 });
};

export const treeAnimation = (): GSAPTimeline => {
  return gsap.timeline({ paused: true })
    .to('.tree_first', { opacity: 1, duration: 0.6 })
    .to('.tree_second', { opacity: 1, duration: 0.6 })
    .to('.tree_third', { opacity: 1, duration: 0.6 });
};

export const makeFadeInAndSlide = (classes: string[], overlap?: string): GSAPTimeline => {
  const tl = gsap.timeline({ paused: true });
  for (let i = 0; i < classes.length; i++) {
    const className = classes[i];
    i === 0 ? 
      tl.to(className, { opacity: 1, x: 0, y: 0, duration: 1 }) :
      tl.to(className, { opacity: 1, x: 0, y: 0, duration: 1 }, overlap);
  }
  return tl;
};
