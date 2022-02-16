import styled from 'styled-components';
import Sky from './Sky';
import ShootingStars from './ShootingStars';
import { useWindowDimensions } from '../hooks';

const BackgroundContainer = styled.div`
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
