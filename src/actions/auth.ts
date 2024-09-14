import axios, { AxiosResponse } from 'axios';

import { api } from 'config/api';
import {
  LoginRequestData,
  AuthResponseData,
  RegisterRequestData,
  ForgotPasswordRequestData,
  ResetPasswordRequestData,
  AuthMessageResponseData,
  VerifyEmailRequestData,
  ResendEmailVerifyRequestData,
} from 'types';

export const getCsrfCookie = async (): Promise<void> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export const login = async (data: LoginRequestData): Promise<AxiosResponse<AuthResponseData, any>> => {
  return api.post('/login', data);
};

export const register = async (data: RegisterRequestData): Promise<AxiosResponse<AuthResponseData, any>> => {
  return api.post('/register', data);
};

export const logout = async (): Promise<void> => {
  return api.post('/logout');
};

export const forgotPassword = async (
  data: ForgotPasswordRequestData
): Promise<AxiosResponse<AuthMessageResponseData, any>> => {
  return api.post('/forgot-password', data);
};

export const resetPassword = async (
  data: ResetPasswordRequestData
): Promise<AxiosResponse<AuthMessageResponseData, any>> => {
  return api.post('/reset-password', data);
};

export const verifyEmail = async ({
  id,
  hash,
  expires,
  signature,
}: VerifyEmailRequestData): Promise<AxiosResponse<AuthResponseData, any>> => {
  return api.post(`/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`);
};

export const resendEmailVerifyMail = async (
  data: ResendEmailVerifyRequestData
): Promise<AxiosResponse<AuthMessageResponseData, any>> => {
  return api.post('/resend-email-verify', data);
};
