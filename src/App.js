import Sky from './components/Sky';
import ShootingStars from './components/ShootingStars';
import { useWindowDimensions } from './hooks';

const App = () => {
  const { height, width } = useWindowDimensions();

  const getRandomX = () => {
    return Math.floor(Math.random() * Math.floor(width)).toString();
  };
  const getRandomY = () => {
    return Math.floor(Math.random() * Math.floor(height)).toString();
  };

  return (
    <div id="App">
      <Sky getRandomX={getRandomX} getRandomY={getRandomY} />
      <ShootingStars getRandomX={getRandomX} getRandomY={getRandomY} />
    </div>
  );
};

export default App;
