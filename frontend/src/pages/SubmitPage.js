import styled from 'styled-components';
import { useWindowDimensions } from '../hooks';

const SubmitPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: ${({ viewportHeight }) => `${viewportHeight}px`};
  color: #ffea7e;
`;

const DisplayText = styled.p`
  width: 90%;
  text-align: center;
`;

const SubmitPage = () => {
  const { height } = useWindowDimensions();
  return (
    <SubmitPageContainer viewportHeight={height}>
      <DisplayText>
        Thank you for submitting your details. Please check your email for your
        invitation.
      </DisplayText>
    </SubmitPageContainer>
  );
};

export default SubmitPage;
