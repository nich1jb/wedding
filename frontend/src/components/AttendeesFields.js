import styled from 'styled-components';
import { InputContainer, TextBox } from './common';

const AttendeeHeader = styled.h3`
  font-family: 'Belleza', sans-serif;
  color: #b76e79;
`;

const AttendeeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AttendeesFields = ({ numOfAttendees, label, handleChange, errors }) => {
  const createAttendeesArray = () =>
    [...Array(numOfAttendees)].map((_, index) => (
      <AttendeeContainer key={index}>
        <AttendeeHeader>
          {label} {numOfAttendees > 1 && index + 1}
        </AttendeeHeader>
        <InputContainer
          label={`Name${index > 0 && label === 'Guest' ? ' (Optional)' : ''}`}
        >
          <TextBox
            name={`name${label}${index}`}
            type="text"
            onChange={handleChange}
            isInvalid={errors ? errors[`name${label}${index}`] : false}
          />
        </InputContainer>
        <InputContainer label={'Dietaries (Optional)'}>
          <TextBox
            name={`dietaries${label}${index}`}
            type="text"
            onChange={handleChange}
          />
        </InputContainer>
      </AttendeeContainer>
    ));

  return Number(numOfAttendees) > 0 && createAttendeesArray();
};

export default AttendeesFields;
