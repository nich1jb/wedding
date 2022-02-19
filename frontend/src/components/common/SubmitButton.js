import styled from 'styled-components';

const SubmitButton = styled.input`
  ${({ width }) => (width ? `width: ${width}px;` : '')}
  border-radius: 100vw;
  outline: none;
  border: 0;
  font-size: 22px;
  cursor: pointer;
  background: #919eff;
  font-size: 22px;
`;

export default SubmitButton;
