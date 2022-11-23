import axiosInstance from './axiosInstance';

// config
import { apiConfig } from '../config';
// models
import type { GeneralAccount } from '../models';
// utils
import { TokenProps } from '../utils/jwt';

export interface GetProfileResponse {
  profile: GeneralAccount;
}

export interface LoginParams {
  account_code: string;
  password: string;
  service: string;
}
export interface LoginResponse {
  name: string;
  tokens: TokenProps;
}

export interface RefreshTokenParams {
  refreshToken: TokenProps['refreshToken'];
}

const accountApi = {
  // [GET] /accounts/profile
  getProfile: (): Promise<GetProfileResponse> => {
    const url = `/accounts/profile`;
    return axiosInstance.get(url);
  },

  // [POST] /accounts/login
  login: (body: LoginParams): Promise<LoginResponse> => {
    const url = `/accounts/login`;
    return axiosInstance.post(url, {
      ...body,
    });
  },

  // [POST] /accounts/refreshToken
  refreshToken: (body: RefreshTokenParams): Promise<TokenProps> => {
    const url = `/accounts/refreshToken`;
    return axiosInstance.post(url, {
      ...body,
    });
  },

  // [GET] /accounts/verify/:service
  verifyToken: (): Promise<boolean> => {
    const url = `/accounts/verify/${apiConfig.service}`;
    return axiosInstance.get(url);
  },
};

export default accountApi;
