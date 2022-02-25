import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 18px;
  padding: 15px;
  width: 100%;
  max-width: 400px;
  padding-bottom: 30px;
  text-align: center;
`;

const Label = styled.div`
  padding-bottom: 12px;
`;

const InputContainer = ({ label, children }) => (
  <Wrapper>
    <Label>{label}</Label>
    {children}
  </Wrapper>
);

export default InputContainer;
