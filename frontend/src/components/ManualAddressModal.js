import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { ErrorBox, Label, SubmitButton, TextBox } from './common';

const ModalBody = styled(Modal.Body)`
  background-color: gray;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const formData = [
  {
    name: 'address',
    label: 'Address',
  },
  {
    name: 'city',
    label: 'City',
  },
  {
    name: 'postCode',
    label: 'Post Code',
  },
  {
    name: 'country',
    label: 'Country',
  },
];

const ManualAddressModal = ({
  shouldShowModal,
  close,
  manualAddressSubmit,
}) => {
  const [addressData, setAddressData] = useState(() => {
    return formData
      .map(field => field.name)
      .reduce((previous, current) => ({ ...previous, [current]: '' }), {});
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    for (let i = 0; i < formData.length; i++) {
      const fieldError = errors[formData[i].name];
      if (fieldError || fieldError === undefined) {
        return false;
      }
    }

    return true;
  };

  const setFormAsInvalid = () => {
    setIsInvalid(true);

    const invalidFields = formData
      .map(field => field.name)
      .reduce(
        (previous, current) => ({
          ...previous,
          [current]: addressData[current] === '',
        }),
        {}
      );

    setErrors(prev => ({ ...prev, ...invalidFields }));
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setAddressData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevData => ({ ...prevData, [name]: !!!value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (isFormValid()) {
      setIsInvalid(false);
      manualAddressSubmit(addressData);
      close();
    } else {
      setFormAsInvalid();
    }
  };

  console.log({ isInvalid });

  return (
    <Modal show={shouldShowModal} onHide={close}>
      <ModalBody>
        <FormContainer onSubmit={handleSubmit}>
          {formData &&
            formData.map((field, i) => {
              return (
                <InputContainer key={i}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <TextBox
                    name={field.name}
                    type="text"
                    onChange={handleChange}
                    value={addressData[field.name]}
                    isInvalid={errors[field.name]}
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
