import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import Background from '../components/Background';

const LoginPageContainer = styled.div`
  height: 100vh;
`;

const LoginPage = () => (
  <LoginPageContainer>
    <LoginForm />
    <Background />
  </LoginPageContainer>
);

export default LoginPage;
