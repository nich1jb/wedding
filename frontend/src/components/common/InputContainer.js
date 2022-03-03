import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 18px;
  padding: 0 15px 30px 15px;
  max-width: 400px;
  text-align: center;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

const Label = styled.div`
  padding-bottom: 12px;
`;

const InputContainer = ({ label, width, className, children }) => (
  <Wrapper width={width} className={className}>
    {label && <Label>{label}</Label>}
    {children}
  </Wrapper>
);

export default InputContainer;
