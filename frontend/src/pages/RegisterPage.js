import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import ManualAddressModal from '../components/ManualAddressModal';
import SearchLocationInput from '../components/SearchLocationInput';
import { Dropdown, Label, TextBox } from '../components/common';

const RegisterPageContainer = styled.div`
  height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 300px;
`;

const ManualAddressLink = styled.span`
  align-self: flex-start;
  font-size: 12px;
  cursor: pointer;
`;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: gray;
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

  console.log({ manualAddress });

  return (
    <RegisterPageContainer>
      <ManualAddressModal
        shouldShowModal={shouldShowModal}
        close={handleClose}
        manualAddressSubmit={manualAddressSubmit}
      />
      <RegisterForm>
        <Label htmlFor="email">Email address to send the tickets to</Label>
        <TextBox name="email" type="email" />

        <Label htmlFor="address">Physical address to send the tickets to</Label>
        <SearchLocationInput manualInput={manualAddress} />
        <ManualAddressLink onClick={handleShow}>
          Enter address manually
        </ManualAddressLink>

        <Label htmlFor="guests">
          How many guests will you be registering for the wedding? (Not
          including children)
        </Label>

        <Dropdown name="guests" id="guests" defaultValue={'default'}>
          <option value="default" disabled>
            Please select
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </Dropdown>

        <Label htmlFor="children">
          How many children will you be registering?
        </Label>

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
      </RegisterForm>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
