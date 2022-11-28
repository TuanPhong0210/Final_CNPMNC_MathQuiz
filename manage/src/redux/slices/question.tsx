import { message } from 'antd';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// apis
import type {
  CreateQuestionResponse,
  FindAllResponse,
  UpdateQuestionResponse,
} from '../../apis/questionApi';
import questionApi from '../../apis/questionApi';
// models
import type { Question } from '../../models';
// redux
import { RootState } from '../store';
import type { CreateQuestionPayload, UpdateQuestionPayload } from '../actions/question';
import { GET_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION } from '../actions/question';

export interface AccountState {
  isLoading: boolean;
  error: string | undefined;
  lastAction: 'create' | 'update' | undefined;
  questions: Question[];
}

const initialState: AccountState = {
  isLoading: false,
  error: undefined,
  lastAction: undefined,
  questions: [],
};

const slice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = undefined;
      state.lastAction = undefined;
    },
    actionSuccess: (state, action: PayloadAction<AccountState['lastAction']>) => {
      state.isLoading = false;
      state.error = undefined;
      state.lastAction = action.payload;
    },
    hasError: (state, action: PayloadAction<AccountState['error']>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearAction: (state) => {
      state.lastAction = undefined;
      state.isLoading = false;
      state.error = undefined;
    },
    getQuestionsSuccess: (state, action: PayloadAction<FindAllResponse>) => {
      const { data } = action.payload;
      state.questions = data;
    },
    createQuestionSuccess: (state, action: PayloadAction<Question>) => {
      const question = action.payload;
      state.questions = [...state.questions, question];
    },
    updateQuestionSuccess: (state, action: PayloadAction<Question>) => {
      const { _id, ...rest } = action.payload;
      state.questions = state.questions.map((question) =>
        question._id === _id ? { ...question, ...rest } : question
      );
    },
  },
});

const { reducer, actions } = slice;
export const { clearAction } = actions;
export const selectQuestion = (state: RootState) => state.question;
export const accountActions = actions;
export default reducer;

// ------------------------ saga ------------------------

function* getQuestions() {
  try {
    yield put(actions.startLoading());
    const response: FindAllResponse = yield call(questionApi.findAll);
    const { data } = response;
    yield put(actions.getQuestionsSuccess({ data }));
    yield put(actions.actionSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error(error.response?.statusText);
    }
  }
}

function* createQuestion(action: PayloadAction<CreateQuestionPayload>) {
  try {
    yield put(actions.startLoading());
    const response: CreateQuestionResponse = yield call(questionApi.create, action.payload);
    const { question, msg } = response;
    yield put(actions.createQuestionSuccess(question));
    yield put(actions.actionSuccess('create'));
    message.success({ content: msg, key: 'create' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error({ content: error.response?.statusText, key: 'create' });
    }
  }
}

function* updateQuestion(action: PayloadAction<UpdateQuestionPayload>) {
  try {
    yield put(actions.startLoading());
    const { _id, ...values } = action.payload;
    const response: UpdateQuestionResponse = yield call(questionApi.update, { _id }, values);
    const { question, msg } = response;
    yield put(actions.updateQuestionSuccess(question));
    yield put(actions.actionSuccess('update'));
    message.success({ content: msg, key: 'update' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(actions.hasError(error.response?.statusText));
      message.error({ content: error.response?.statusText, key: 'update' });
    }
  }
}

export function* questionSaga() {
  yield takeEvery(GET_QUESTIONS, getQuestions);

  yield takeLatest(CREATE_QUESTION, createQuestion);
  yield takeLatest(UPDATE_QUESTION, updateQuestion);
}
