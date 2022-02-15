import React, { useState } from 'react';
import styled from 'styled-components';
import PasswordEye from '../components/PasswordEye';

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
`;

const sharedInputStyled = `
  font-family: 'Belleza', sans-serif;
  height: 30px;
  background: white;
  border-radius: 100vw;
  outline: none;
  border: 0;
  font-size: 22px;
`;

const TextInput = styled.input`
  ${sharedInputStyled}
  padding: 10px 80px 10px 30px;
`;

const SubmitButton = styled.input`
  ${sharedInputStyled}
  cursor: pointer;
  background: #919eff;
  font-size: 22px;
`;

const LoginForm = () => {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleShowPassword = () => {
    setShouldShowPassword(prevValue => !prevValue);
  };

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setPassword(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`http://localhost:4000/api/password?attempt=${password}`)
      .then(res => res.json())
      .then(result => console.log(result));
  };

  return (
    <LoginFormContainer>
      <form>
        <InputContainer>
          <PasswordEye
            handleShowPassword={handleShowPassword}
            shouldShowPassword={shouldShowPassword}
          />
          <TextInput
            type={shouldShowPassword ? 'text' : 'password'}
            name="password"
            value={password}
            placeholder={'Enter password...'}
            onChange={handleChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <SubmitButton onClick={handleSubmit} type="submit" />
        </InputContainer>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
