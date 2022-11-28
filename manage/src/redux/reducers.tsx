// slices
import accessControlReducer from './slices/accessControl';
import accountReducer from './slices/account';
import questionReducer from './slices/question';

const rootReducer = {
  accessControl: accessControlReducer,
  account: accountReducer,
  question: questionReducer,
};

export default rootReducer;
