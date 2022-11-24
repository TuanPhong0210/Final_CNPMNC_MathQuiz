import * as yup from 'yup';

// ----------------------Account----------------------
export const createAccountValidation = yup.object().shape({
  account_code: yup
    .string()
    .required('Account code is required!')
    .matches(/^[0-9]{10}$/, 'Invalid account code. Must be exactly 10 digits'),
  name: yup.string().required('Name is required!'),
  password: yup.string().required('Password is required!'),
  passwordConfirm: yup.string().required('Confirm is required!'),
});

export const updateAccountValidation = yup.object().shape({
  account_code: yup
    .string()
    .required('Account code is required!')
    .matches(/^[0-9]{10}$/, 'Invalid account code. Must be exactly 10 digits'),
  name: yup.string().required('Name is required!'),
});
