import axiosInstance from './axiosInstance';

const roomAPI = {
  // [GET] /rooms/closest
  findClosest: () => {
    const url = `/rooms/closest`;
    return axiosInstance.get(url);
  },
};

export default roomAPI;
