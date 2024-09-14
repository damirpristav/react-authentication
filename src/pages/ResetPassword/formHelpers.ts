import * as yup from 'yup';

import { ResetPasswordRequestData } from "types";

export type Values = Omit<ResetPasswordRequestData, 'token' | 'email'>;

export const validationSchema = yup.object().shape<{ [key in keyof Values]: yup.Schema<any> }>({
  password: yup
    .string()
    .trim()
    .strict()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters'),
  password_confirmation: yup
    .string()
    .trim()
    .strict()
    .required('Password is required')
    .test(
      'equal-passwords',
      'Passwords must be equal',
      (value, context) => {
        if (context.parent.password && value && context.parent.password !== value) {
          return false;
        }
        return true;
      },
    ),
});
