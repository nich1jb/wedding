import styled from 'styled-components';
import LoginForm from './pages/LoginForm';
import Background from './components/Background';

const AppContainer = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <LoginForm />
      <Background />
    </AppContainer>
  );
};

export default App;
