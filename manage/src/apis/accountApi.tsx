import axiosInstance from './axiosInstance';

// config
import { apiConfig } from '../config';
// models
import type { ListResponse, StatusResponse, GeneralAccount } from '../models';
// utils
import { TokenProps } from '../utils/jwt';

export interface FindAllAccountByTypeParams extends Pick<GeneralAccount, 'type'> {}
export interface FindAllAccountByTypeResponse extends ListResponse<GeneralAccount> {}

export interface CreateAccountBody extends Omit<GeneralAccount, '_id' | 'type'> {
  password: string;
  passwordConfirm: string;
  account_type: GeneralAccount['type'];
}
export interface CreateAccountResponse extends StatusResponse {
  account: GeneralAccount;
}

export interface UpdateAccountParams extends Pick<GeneralAccount, '_id'> {}
export interface UpdateAccountBody extends Omit<GeneralAccount, '_id' | 'type'> {}
export interface UpdateAccountResponse extends CreateAccountResponse {}

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
  // [GET] /accounts/:type
  findAllByType: (params: FindAllAccountByTypeParams): Promise<FindAllAccountByTypeResponse> => {
    const { type } = params;
    const url = `/accounts/${type}`;
    return axiosInstance.get(url);
  },

  // [GET] /accounts/profile
  getProfile: (): Promise<GetProfileResponse> => {
    const url = `/accounts/profile`;
    return axiosInstance.get(url);
  },

  // [POST] /accounts
  create: (body: CreateAccountBody): Promise<CreateAccountResponse> => {
    const url = `/accounts`;
    return axiosInstance.post(url, body);
  },

  // [PUT] /accounts/:_id
  update: (
    params: UpdateAccountParams,
    body: UpdateAccountBody
  ): Promise<UpdateAccountResponse> => {
    const { _id } = params;
    const url = `/accounts/${_id}`;
    return axiosInstance.put(url, body);
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
