import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { formFields } from '../constants/formFields';
import { isFormValid, setFormAsInvalid } from '../utils/';
import { ErrorBox, InputContainer, SubmitButton, TextBox } from './common';

const ModalBody = styled(Modal.Body)`
  background-color: gray;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const { manualAddressFormFields } = formFields;

const ManualAddressModal = ({
  shouldShowModal,
  close,
  manualAddressSubmit,
}) => {
  const initialAddressData = manualAddressFormFields
    .map(field => field.name)
    .reduce((previous, current) => ({ ...previous, [current]: '' }), {});
  const [addressData, setAddressData] = useState(initialAddressData);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAddressData(initialAddressData);
  }, [shouldShowModal]);

  const handleChange = event => {
    const { value, name } = event.target;
    setAddressData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevData => ({ ...prevData, [name]: !!!value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isFormValid({ formFields: manualAddressFormFields, errors })) {
      setIsInvalid(false);
      manualAddressSubmit(addressData);
      close();
    } else {
      setFormAsInvalid({
        setIsInvalid,
        setErrors,
        formFields: manualAddressFormFields,
        formData: addressData,
        formName: 'manualAddressFormFields',
      });
    }
  };

  return (
    <Modal show={shouldShowModal} onHide={close}>
      <ModalBody>
        <FormContainer onSubmit={handleSubmit}>
          {manualAddressFormFields &&
            manualAddressFormFields.map((field, i) => {
              const { label, name } = field;
              return (
                <InputContainer label={label} key={i}>
                  <TextBox
                    name={name}
                    type="text"
                    onChange={handleChange}
                    value={addressData[name]}
                    isInvalid={errors[name]}
                  />
                </InputContainer>
              );
            })}
          {isInvalid && <ErrorBox>Some required fields are empty</ErrorBox>}
          <SubmitButton type="submit" value="Enter" width={300} />
        </FormContainer>
      </ModalBody>
    </Modal>
  );
};

export default ManualAddressModal;
