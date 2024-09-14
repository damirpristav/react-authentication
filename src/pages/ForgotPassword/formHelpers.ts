import * as yup from 'yup';

import { ForgotPasswordRequestData } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof ForgotPasswordRequestData]: yup.Schema<any> }>({
  email: yup.string().trim().required('Email is required').email('Email is invalid'),
});
