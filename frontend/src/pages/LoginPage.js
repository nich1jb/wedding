import hash from 'object-hash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ErrorBox,
  InputContainer,
  SubmitButton,
  TextBox,
} from '../components/common';
import PasswordEye from '../components/icons/PasswordEye';
import { useAuth, useWindowDimensions } from '../hooks';

const { REACT_APP_SALT, REACT_APP_API_URL } = process.env;

const Form = styled.form`
  height: ${({ viewportHeight }) => `${viewportHeight}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PasswordContainer = styled(InputContainer)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 15px;
`;

const PasswordInput = styled(TextBox)`
  padding-right: 45px;
  background: #ffffffd9;
  border: 0;
  border-radius: 100vw;
`;

const LoginPage = () => {
  const { height } = useWindowDimensions();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFieldValue, setPasswordFieldValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/register');
    }
  }, []);

  const handleLogin = () => {
    login().then(() => {
      navigate('/register');
    });
  };

  const handleShowPassword = () => {
    setShouldShowPassword(prevValue => !prevValue);
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    console.log('called');
    setPasswordFieldValue(value);
    const passwordHash = hash(value + REACT_APP_SALT);
    setPassword(passwordHash);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`${REACT_APP_API_URL}/password?attempt=${password}`)
      .then(res => res.json())
      .then(result => {
        if (result) {
          setError('');
          handleLogin();
        } else {
          setError('Invalid Password');
          setPassword('');
          setPasswordFieldValue('');
        }
      })
      .catch(e => {
        console.error(e);
        setError(
          'Error connecting to server. Please try again later (and tell Nick and Zoe because this should not have happened)'
        );
      });
  };

  return (
    <Form onSubmit={handleSubmit} viewportHeight={height}>
      <PasswordContainer width={300} className={'password-container'}>
        <PasswordEye
          handleShowPassword={handleShowPassword}
          shouldShowPassword={shouldShowPassword}
        />
        <PasswordInput
          type={shouldShowPassword ? 'text' : 'password'}
          name="password"
          placeholder={'Enter password...'}
          onChange={handleChange}
          width={270}
          value={passwordFieldValue}
          shouldHaveShadow={false}
          required
        />
      </PasswordContainer>
      {error && <ErrorBox>{error}</ErrorBox>}
      <SubmitButton type="submit" value="Enter" width={270} />
    </Form>
  );
};

export default LoginPage;
