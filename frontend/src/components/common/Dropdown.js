import styled from 'styled-components';

const Dropdown = styled.select`
  border: 2px solid;
  outline: none;
  font-size: 15px;
  padding: 10px 80px 10px 30px;
  border-color: ${({ isInvalid }) => (isInvalid ? 'red' : 'transparent')};
  border-radius: 15px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  max-width: 400px;
  background: white;
  box-shadow: ${({ shouldHaveShadow = true }) =>
    shouldHaveShadow ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='30' viewBox='0 0 24 24' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat right white;
  -webkit-appearance: none;
  background-position-x: 95%;
`;

export default Dropdown;
