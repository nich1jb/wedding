import styled from 'styled-components';

const EyeContainer = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Eye = styled.svg`
  fill: #000000;

  & path {
    fill: none;
    stroke-width: 1.5;
    stroke-miterlimit: 5;
    stroke: #000000;
  }

  & line {
    fill: none;
    stroke: #000000;
    stroke-width: 1.5;
    stroke-miterlimit: 5;
  }
`;

const PasswordEye = ({ shouldShowPassword, handleShowPassword }) => (
  <EyeContainer>
    <Eye
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      onClick={handleShowPassword}
    >
      {shouldShowPassword ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </>
      )}
    </Eye>
  </EyeContainer>
);

export default PasswordEye;
