import { formValidators } from '../constants/formFields';

const setFormAsInvalid = ({
  setIsInvalid,
  setErrors,
  formFields,
  formData,
  formName,
}) => {
  setIsInvalid(true);

  const invalidFields = formFields
    .map(field => field.name)
    .reduce((previous, current) => {
      console.log({ current }, formData[current]);
      const validatorPattern = new RegExp(formValidators[formName][current]);
      return {
        ...previous,
        [current]: formData[current]
          ? !validatorPattern.test(formData[current])
          : true,
      };
    }, {});

  setErrors(prev => ({ ...prev, ...invalidFields }));
};

export default setFormAsInvalid;
