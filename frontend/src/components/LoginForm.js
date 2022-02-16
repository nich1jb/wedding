import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import hash from 'object-hash';
import PasswordEye from './PasswordEye';
import { useAuth } from '../hooks';

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const Error = styled.div`
  border-left: 4px solid rgb(212, 26, 62);
  background-color: rgb(250, 250, 250);
  color: rgb(5, 10, 25);
  padding: 14px;
  width: 250px;
`;

const sharedInputStyled = `
  font-family: 'Belleza', sans-serif;
  height: 30px;
  border-radius: 100vw;
  outline: none;
  border: 0;
  font-size: 22px;
`;

const TextInput = styled.input`
  ${sharedInputStyled}
  background: #ffffffd9;
  padding: 10px 80px 10px 30px;
`;

const SubmitButton = styled.input`
  ${sharedInputStyled}
  cursor: pointer;
  background: #919eff;
  font-size: 22px;
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    const passwordHash = hash(value + process.env.REACT_APP_SALT);
    setPassword(passwordHash);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { REACT_APP_API_URL } = process.env;

    fetch(`${REACT_APP_API_URL}/password?attempt=${password}`)
      .then(res => res.json())
      .then(result => {
        // 7cfda772550ce36a50bc64db82a69f7cd0d80816
        if (result) handleLogin();
        result ? setError('') : setError('Invalid Password');
      })
      .catch(e => console.log(e));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <PasswordEye
          handleShowPassword={handleShowPassword}
          shouldShowPassword={shouldShowPassword}
        />
        <TextInput
          type={shouldShowPassword ? 'text' : 'password'}
          name="password"
          placeholder={'Enter password...'}
          onChange={handleChange}
          required
        />
      </InputContainer>
      {error && <Error>{error}</Error>}
      <InputContainer>
        <SubmitButton type="submit" />
      </InputContainer>
    </Form>
  );
};

export default LoginForm;
