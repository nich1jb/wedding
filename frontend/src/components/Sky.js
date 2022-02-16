import { useEffect } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';

const SkyContainer = styled.svg`
  background: transparent;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const Sky = ({ getRandomX, getRandomY }) => {
  const randomRadius = () => {
    return Math.random() * 0.7 + 0.6;
  };

  const skyAnimation = () => {
    anime({
      targets: ['.star'],
      opacity: [
        {
          duration: 500,
          value: '0',
        },
        {
          duration: 500,
          value: '1',
        },
      ],
      easing: 'linear',
      loop: true,
      delay: (_, i) => 50 * i,
    });
  };

  useEffect(() => {
    skyAnimation();
  }, []);
  return (
    <SkyContainer>
      {[...Array(200)].map((_, y) => (
        <circle
          className="star"
          cx={getRandomX()}
          cy={getRandomY()}
          r={randomRadius()}
          stroke="none"
          strokeWidth="0"
          fill="white"
          key={y}
        />
      ))}
    </SkyContainer>
  );
};

export default Sky;
