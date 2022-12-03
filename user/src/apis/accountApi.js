import axiosInstance from './axiosInstance';

// config
import { apiConfig } from '../config';

const accountApi = {
  // [GET] /accounts/profile
  getProfile: () => {
    const url = `/accounts/profile`;
    return axiosInstance.get(url);
  },

  // [POST] /accounts/login
  login: (body) => {
    const url = `/accounts/login`;
    return axiosInstance.post(url, {
      ...body,
    });
  },

  // [POST] /accounts/refreshToken
  refreshToken: (body) => {
    const url = `/accounts/refreshToken`;
    return axiosInstance.post(url, {
      ...body,
    });
  },

  // [GET] /accounts/verify/:type
  verifyToken: () => {
    const url = `/accounts/verify/${apiConfig.service}`;
    return axiosInstance.get(url);
  },

  // google apis
  getGoogleProfile: (tokenResponse) => {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    return axiosInstance.get(url, {
      headers: { Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}` },
    });
  },
};

export default accountApi;
