const isFormValid = ({ formFields, errors }) => {
  for (let i = 0; i < formFields.length; i++) {
    const fieldError = errors[formFields[i].name];
    if (fieldError || fieldError === undefined) {
      return false;
    }
  }

  return true;
};

export default isFormValid;
