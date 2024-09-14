import { AxiosResponse } from 'axios';

import { api } from 'config/api';
import { User } from 'types';

export const getUser = (): Promise<AxiosResponse<User, any>> => {
  return api.get('/user');
};
