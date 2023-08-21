import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues = {}, defaultFormValidity = false) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultValues);
  const [inputVilidities, setInputVilidities] = useState({});
  const [isValid, setIsValid] = useState(defaultFormValidity);

  const handleChange = ({target}) => {
    const { name, value, validationMessage, validity, form } = target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage});
    setInputVilidities({...inputVilidities, [name]: validity.valid});
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newIsValid = false, newValues = {}, newErrors = {}, newInputVilidities = {}) => {
      setValues(newValues);
      setErrors(newErrors);
      setInputVilidities(newInputVilidities);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, setInputVilidities]
  );

  return { values, handleChange, errors, isValid, resetForm, inputVilidities };
};
