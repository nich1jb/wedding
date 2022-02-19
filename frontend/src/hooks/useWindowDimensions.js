import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

function detectMob() {
  const { userAgent } = navigator;
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some(toMatchItem => {
    return userAgent.match(toMatchItem);
  });
}

const useWindowDimensions = () => {
  const isMobile = detectMob();
  let resizeTimeout;
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    const setResizeTimeout = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize();
      }, 100);
    };

    if (isMobile) {
      window.addEventListener('orientationchange', setResizeTimeout);
    } else {
      window.addEventListener('resize', setResizeTimeout);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
