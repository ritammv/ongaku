import gsap from 'gsap';

export const heroAnimation = (): GSAPTimeline => {
  return gsap.timeline()
    .to('.container_hero', { opacity: 1, duration: 0.1 })
    .from('.logo_img_container', { opacity: 0, duration: 1 })
    .from('.logo_title', { opacity: 0, y: 100, duration: 1 }, '-=0.5')
    .from('#music', { opacity: 0, x: 10, duration: 0.4 })
    .from('#sharing', { opacity: 0, x: 10, duration: 0.4 })
    .from('#community', { opacity: 0, x: 10, duration: 0.4 })
    .from('.hero_subtext', { opacity: 0, duration: 0.5 })
    .from('.buttons_join', { opacity: 0, x: -40, duration: 0.5 }, '-=0.5')
    .from('.buttons_channels', { opacity: 0, x: 40, duration: 0.5 }, '-=0.5')
    .from('.container_scrolldown', { opacity: 0, duration: 0.5 });
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

export const makeFadeInAndSlide = 
  (classes: string[], overlap?: string): GSAPTimeline => {
    const tl = gsap.timeline({ paused: true });
    for (let i = 0; i < classes.length; i++) {
      const className = classes[i];
      i === 0 ? 
        tl.to(className, { opacity: 1, x: 0, y: 0, duration: 1 }) :
        tl.to(className, { opacity: 1, x: 0, y: 0, duration: 1 }, overlap);
    }
    return tl;
  };

const randomCoords 
  = (upperX: number, upperY: number, negative?: boolean): number[] => {
    let randomX = Math.floor(Math.random() * upperX);
    let randomY = Math.floor(Math.random() * upperY);
    if (negative) {
      const random1: number = Math.random();
      if (random1 < 0.5) randomX = -randomX;
      const random2: number = Math.random();
      if (random2 < 0.5) randomY = -randomY;
    }
    return [randomX, randomY];
  };

export const randomCircles = (className: string) =>  {
  const { innerWidth, innerHeight } = window;
  const toAppend: HTMLDivElement | null = document.querySelector(className);
  const [randomX, randomY] = randomCoords(innerWidth - 200, innerHeight - 200);
  const newCircle = document.createElement('div');
  newCircle.className += 'animated_circle';
  newCircle.style.top = `${randomY}px`;
  newCircle.style.left = `${randomX}px`;
  const innerCircle = document.createElement('div');
  innerCircle.className += 'inner_circle';
  newCircle.append(innerCircle);
  if (toAppend) toAppend.append(newCircle);
  const [randomXStep, randomYStep] = randomCoords(100, 100, true);
  newCircle.addEventListener('click', () => newCircle.remove());
  gsap.timeline()
    .to(newCircle, { width: 200, 
      height: 200, 
      duration: 4.5,
      y: randomYStep,
      x: randomXStep,
      transform: 'scale(1)',
      opacity: 0,
      onComplete: () => newCircle.remove()
    });
};

export const headerAnimation = ():GSAPTimeline => {
  return gsap.timeline({ paused: true })
    .to('.home_nav', { opacity: 1, transform: 'translate(0)', duration: 1 });
};

export const slideInAndUp = 
  (className1: string, className2: string, cb?: () => void):GSAPTimeline => {
    return gsap.timeline()
      .to(`.${className1}`, { transform: 'scale(1.4)', duration: 3 })
      .to(`.${className2}`, { opacity: 0, y: 120, duration: 1, onComplete: cb });
  };
