import { all } from 'redux-saga/effects';

// slices
import { accessControlSaga } from './slices/accessControl';
import { accountSaga } from './slices/account';
import { questionSaga } from './slices/question';
import { roomSaga } from './slices/room';

export default function* rootSaga() {
  yield all([accessControlSaga(), accountSaga(), questionSaga(), roomSaga()]);
}
