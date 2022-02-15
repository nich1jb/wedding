import { useEffect } from 'react';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';

const ShootingStarsContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 150vh;
  height: 100vw;
  position: fixed;
  overflow: hidden;
  transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%))
    rotate(120deg);
`;

const Wish = styled.div`
  height: 2px;
  top: ${({ getRandomX }) => getRandomX}px;
  left: ${({ getRandomY }) => getRandomY}px;
  width: 100px;
  margin: 0;
  opacity: 0;
  padding: 0;
  background-color: white;
  position: absolute;
  background: linear-gradient(-45deg, white, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 6px white);
  overflow: hidden;
`;

const ShootingStars = ({ getRandomX, getRandomY }) => {
  const shootingStarsAnimation = () => {
    anime({
      targets: ['.wish'],
      easing: 'linear',
      loop: true,
      delay: (_, i) => 1000 * i,
      opacity: [
        {
          duration: 700,
          value: '1',
        },
      ],
      width: [
        {
          value: '150px',
        },
        {
          value: '0px',
        },
      ],
      translateX: 350,
    });
  };

  useEffect(() => {
    shootingStarsAnimation();
  }, []);

  return (
    <ShootingStarsContainer>
      {[...Array(60)].map((_, y) => (
        <Wish
          key={y}
          className="wish"
          getRandomX={getRandomX}
          getRandomY={getRandomY}
        />
      ))}
    </ShootingStarsContainer>
  );
};

export default ShootingStars;
