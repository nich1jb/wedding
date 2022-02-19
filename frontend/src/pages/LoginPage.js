import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks';

const LoginPageContainer = styled.div`
  height: 100vh;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/register');
    }
  }, []);

  return (
    <LoginPageContainer>
      <LoginForm />
      <Background />
    </LoginPageContainer>
  );
};

export default LoginPage;
