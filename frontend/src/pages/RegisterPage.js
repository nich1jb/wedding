import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AttendeesFields from '../components/AttendeesFields';
import ManualAddressModal from '../components/ManualAddressModal';
import SearchLocationInput from '../components/SearchLocationInput';
import {
  Dropdown,
  ErrorBox,
  InputContainer,
  SubmitButton,
  TextBox,
} from '../components/common';
import { formFields, formValidators } from '../constants/formFields';
import { isFormValid, setFormAsInvalid, submitRegisterForm } from '../utils';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fffbee;
  width: 650px;
  height: 85%;
  max-height: 100vh;
  border-radius: 20px;
  color: #16043a;
  margin: 80px 15px;
  padding: 40px 30px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ManualAddressLink = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({});
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => setShouldShowModal(false);
  const handleShow = () => setShouldShowModal(true);

  useEffect(() => {
    setRegisterData(prevData => ({ ...prevData, address: manualAddress }));
  }, [manualAddress]);

  const manualAddressSubmit = manualAddressData => {
    const { address, city, postCode, country } = manualAddressData;
    const addressString = `${address}, ${city} ${postCode} ${country}`;
    setManualAddress(addressString);

    setErrors(prevData => ({
      ...prevData,
      address: false,
    }));
  };

  const searchLocationChange = value => {
    if (!value) {
      setErrors(prevData => ({
        ...prevData,
        address: true,
      }));
    }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setRegisterData(prevData => ({ ...prevData, [name]: value }));
    if (formValidators.registerFormFields[name]) {
      const validatorPattern = new RegExp(
        formValidators.registerFormFields[name]
      );
      setErrors(prevData => ({
        ...prevData,
        [name]: !validatorPattern.test(value),
      }));
    }
  };

  const searchLocationSubmit = addressObject => {
    const { formatted_address } = addressObject;
    setRegisterData(prevData => ({ ...prevData, address: formatted_address }));

    setErrors(prevData => ({
      ...prevData,
      address: false,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isFormValid({ formFields: registerFormFields, errors })) {
      setIsInvalid(false);
      submitRegisterForm(registerData);
    } else {
      setFormAsInvalid({
        setIsInvalid,
        setErrors,
        formFields: registerFormFields,
        formData: registerData,
        formName: 'registerFormFields',
      });
    }
  };

  const { guests, children } = registerData;

  const { registerFormFields } = formFields;
  const [emailField, addressField, guestsField, childrenField] =
    registerFormFields;

  return (
    <RegisterPageContainer>
      <ManualAddressModal
        shouldShowModal={shouldShowModal}
        close={handleClose}
        manualAddressSubmit={manualAddressSubmit}
      />
      <RegisterForm onSubmit={handleSubmit}>
        <InputContainer label={emailField.label}>
          <TextBox
            name={emailField.name}
            type="email"
            onChange={handleChange}
            isInvalid={errors[emailField.name]}
          />
        </InputContainer>

        <InputContainer label={addressField.label}>
          <SearchLocationInput
            manualInput={manualAddress}
            searchLocationSubmit={searchLocationSubmit}
            name={addressField.name}
            searchLocationChange={searchLocationChange}
            isInvalid={errors[addressField.name]}
          />
          <ManualAddressLink onClick={handleShow}>
            Enter address manually
          </ManualAddressLink>
        </InputContainer>

        <InputContainer label={guestsField.label}>
          <Dropdown
            name={guestsField.name}
            defaultValue={'default'}
            onChange={handleChange}
            isInvalid={errors[guestsField.name]}
          >
            <option value="default" disabled>
              Please select
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Dropdown>
        </InputContainer>

        <InputContainer label={childrenField.label}>
          <Dropdown
            name={childrenField.name}
            defaultValue={'default'}
            onChange={handleChange}
            isInvalid={errors[childrenField.name]}
          >
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
        <AttendeesFields
          numOfAttendees={Number(guests ? guests : 0)}
          label={'Guest'}
          handleChange={handleChange}
          errors={errors}
        />
        <AttendeesFields
          numOfAttendees={Number(children ? children : 0)}
          label={'Child'}
          handleChange={handleChange}
        />
        {isInvalid && <ErrorBox>Some required fields are empty</ErrorBox>}
        <SubmitButton type="submit" value="Submit" width={300} />
      </RegisterForm>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
