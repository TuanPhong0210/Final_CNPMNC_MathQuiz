// slices
import accessControlReducer from './slices/accessControl';
import accountReducer from './slices/account';
import questionReducer from './slices/question';
import roomReducer from './slices/room';

const rootReducer = {
  accessControl: accessControlReducer,
  account: accountReducer,
  question: questionReducer,
  room: roomReducer,
};

export default rootReducer;
