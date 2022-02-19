import hash from 'object-hash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks';
import PasswordEye from './PasswordEye';
import { ErrorBox, SubmitButton } from './common/';

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

const TextInput = styled.input`
  border-radius: 100vw;
  outline: none;
  border: 0;
  font-size: 22px;
  background: #ffffffd9;
  padding: 10px 80px 10px 30px;
`;

const { REACT_APP_API_URL, REACT_APP_SALT } = process.env;

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
    const passwordHash = hash(value + REACT_APP_SALT);
    setPassword(passwordHash);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`${REACT_APP_API_URL}/password?attempt=${password}`)
      .then(res => res.json())
      .then(result => {
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
      {error && <ErrorBox>{error}</ErrorBox>}
      <InputContainer>
        <SubmitButton type="submit" value="Enter" />
      </InputContainer>
    </Form>
  );
};

export default LoginForm;
