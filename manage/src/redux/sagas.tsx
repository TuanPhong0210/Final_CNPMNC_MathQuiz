import { all } from 'redux-saga/effects';

// slices
import { accessControlSaga } from './slices/accessControl';
import { accountSaga } from './slices/account';

export default function* rootSaga() {
  yield all([accessControlSaga(), accountSaga()]);
}
