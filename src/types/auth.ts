import { User } from "./users";

export type LoginRequestData = {
  email: string;
  password: string;
  remember: boolean;
};

export type AuthResponseData = {
  message: string;
  user: User;
};

export type RegisterRequestData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type ForgotPasswordRequestData = {
  email: string;
};

export type ResetPasswordRequestData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthMessageResponseData = {
  message: string;
};

export type VerifyEmailRequestData = {
  id: string;
  hash: string;
  expires: string;
  signature: string;
};

export type ResendEmailVerifyRequestData = {
  user_id: string;
};
