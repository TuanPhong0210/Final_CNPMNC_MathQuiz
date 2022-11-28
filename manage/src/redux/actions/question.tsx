import type {
  CreateQuestionBody,
  UpdateQuestionBody,
  UpdateQuestionParams,
} from '../../apis/questionApi';

export const GET_QUESTIONS = 'GET_QUESTIONS';

export const CREATE_QUESTION = 'CREATE_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';

export interface GetQuestionsPayload {}
export const getQuestionsAction = (payload: GetQuestionsPayload) => {
  return {
    type: GET_QUESTIONS,
    payload,
  };
};

export interface CreateQuestionPayload extends CreateQuestionBody {}
export const createQuestionAction = (payload: CreateQuestionPayload) => {
  return {
    type: CREATE_QUESTION,
    payload,
  };
};

export type UpdateQuestionPayload = UpdateQuestionParams & UpdateQuestionBody;
export const updateQuestionAction = (payload: UpdateQuestionPayload) => {
  return {
    type: UPDATE_QUESTION,
    payload,
  };
};
