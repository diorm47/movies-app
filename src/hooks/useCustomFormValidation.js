import { useCallback, useState } from "react";

export function useCustomFormValidation(
  defaultValues = {},
  defaultFormValidity = false
) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(defaultValues);
  const [inputStatuses, setInputStatuses] = useState({});
  const [isFormValid, setFormValidity] = useState(defaultFormValidity);

  const handleInputChange = ({ target }) => {
    const { name, value, validationMessage, validity, form } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setInputStatuses({ ...inputStatuses, [name]: validity.valid });
    setFormValidity(form.checkValidity());
  };

  const resetForm = useCallback(
    (
      newIsFormValid = false,
      newValues = {},
      newErrors = {},
      newInputStatuses = {}
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setInputStatuses(newInputStatuses);
      setFormValidity(newIsFormValid);
    },
    [setValues, setErrors, setFormValidity, setInputStatuses]
  );

  return {
    values,
    handleInputChange,
    errors,
    isFormValid,
    resetForm,
    inputStatuses,
  };
}
