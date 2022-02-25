import { useState } from 'react';
import styled from 'styled-components';
import ManualAddressModal from '../components/ManualAddressModal';
import SearchLocationInput from '../components/SearchLocationInput';
import { Dropdown, InputContainer, TextBox } from '../components/common';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fffbee;
  width: 650px;
  height: 85%;
  border-radius: 20px;
  color: #16043a;
  margin: 80px 15px;
  padding: 40px 30px;
`;

const ManualAddressLink = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const RegisterPage = () => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  const handleClose = () => setShouldShowModal(false);
  const handleShow = () => setShouldShowModal(true);

  const manualAddressSubmit = manualAddressData => {
    const { address, city, postCode, country } = manualAddressData;
    setManualAddress(`${address}, ${city} ${postCode} ${country}`);
  };

  return (
    <RegisterPageContainer>
      <ManualAddressModal
        shouldShowModal={shouldShowModal}
        close={handleClose}
        manualAddressSubmit={manualAddressSubmit}
      />
      <RegisterForm>
        <InputContainer label={'What is your email address?'}>
          <TextBox name="email" type="email" />
        </InputContainer>

        <InputContainer label={'What is your physical address?'}>
          <SearchLocationInput manualInput={manualAddress} />
          <ManualAddressLink onClick={handleShow}>
            Enter address manually
          </ManualAddressLink>
        </InputContainer>

        <InputContainer
          label={
            'How many guests will you be registering for the wedding? (Not including children)'
          }
        >
          <Dropdown name="guests" id="guests" defaultValue={'default'}>
            <option value="default" disabled>
              Please select
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Dropdown>
        </InputContainer>

        <InputContainer label={'How many children will you be registering?'}>
          <Dropdown name="children" id="children" defaultValue={'default'}>
            <option value="default" disabled>
              Please select
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Dropdown>
        </InputContainer>
      </RegisterForm>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
