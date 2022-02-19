import styled, { keyframes } from 'styled-components';
import { useWindowDimensions } from '../hooks';
import ShootingStars from './ShootingStars';
import Sky from './Sky';

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #551b57 0%, #001761 100%);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Background = () => {
  const { height, width } = useWindowDimensions();

  const getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(width)).toString();
  };
  const getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(height)).toString();
  };

  return (
    <BackgroundContainer>
      <Sky getRandomX={getRandomX} getRandomY={getRandomY} />
      <ShootingStars getRandomX={getRandomX} getRandomY={getRandomY} />
    </BackgroundContainer>
  );
};

export default Background;
