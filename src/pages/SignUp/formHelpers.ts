import * as yup from 'yup';

import { RegisterRequestData } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof RegisterRequestData]: yup.Schema<any> }>({
  first_name: yup.string().trim().required('First name is required'),
  last_name: yup.string().trim().required('Last name is required'),
  email: yup.string().trim().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .trim()
    .strict()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters'),
});
