import styled from 'styled-components';

const SubmitPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ffea7e;
`;

const DisplayText = styled.p`
  width: 90%;
  text-align: center;
`;

const SubmitPage = () => (
  <SubmitPageContainer>
    <DisplayText>
      Thank you for submitting your details. Please check your email for your
      invitation.
    </DisplayText>
  </SubmitPageContainer>
);

export default SubmitPage;
