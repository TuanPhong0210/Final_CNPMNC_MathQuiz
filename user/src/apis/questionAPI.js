const questionAPI = {
  // [GET] /questions
  findAll: () => {
    const url = `/questions`;
    return axiosInstance.get(url);
  },
};
