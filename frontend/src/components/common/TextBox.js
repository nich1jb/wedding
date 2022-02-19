import styled from 'styled-components';

const TextBox = styled.input`
  border: 2px solid;
  border-color: transparent;
  width: 300px;
  ${({ isInvalid }) => (isInvalid ? 'border-color: red' : '')};
`;

export default TextBox;
