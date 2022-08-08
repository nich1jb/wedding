import styled from 'styled-components';

const TextBox = styled.input`
  border: 2px solid;
  outline: none;
  font-size: 15px;
  padding: 10px 30px 10px 30px;
  border-color: ${({ isInvalid }) => (isInvalid ? 'red' : 'transparent')};
  border-radius: 15px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  max-width: 400px;
  background: white;
  box-shadow: ${({ shouldHaveShadow = true }) =>
    shouldHaveShadow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
`;

export default TextBox;
