import axiosInstance from './axiosInstance';

// models
import type { ListResponse, StatusResponse, Question } from '../models';

export interface FindAllResponse extends ListResponse<Question> {}

export interface CreateQuestionBody extends Omit<Question, '_id'> {}
export interface CreateQuestionResponse extends StatusResponse {
  question: Question;
}

export interface UpdateQuestionParams extends Pick<Question, '_id'> {}
export interface UpdateQuestionBody extends CreateQuestionBody {}
export interface UpdateQuestionResponse extends CreateQuestionResponse {}

const questionApi = {
  // [GET] /questions
  findAll: (): Promise<FindAllResponse> => {
    const url = `/questions`;
    return axiosInstance.get(url);
  },

  // [POST] /questions
  create: (body: CreateQuestionBody): Promise<CreateQuestionResponse> => {
    const url = `/questions`;
    return axiosInstance.post(url, body);
  },

  // [PUT] /questions/:_id
  update: (
    params: UpdateQuestionParams,
    body: UpdateQuestionBody
  ): Promise<UpdateQuestionResponse> => {
    const { _id } = params;
    const url = `/questions/${_id}`;
    return axiosInstance.put(url, body);
  },
};

export default questionApi;
