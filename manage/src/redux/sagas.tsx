import { all } from 'redux-saga/effects';

// slices
import { accessControlSaga } from './slices/accessControl';

export default function* rootSaga() {
  yield all([accessControlSaga()]);
}
