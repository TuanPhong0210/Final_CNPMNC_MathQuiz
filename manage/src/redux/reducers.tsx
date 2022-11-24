// slices
import accessControlReducer from './slices/accessControl';
import accountReducer from './slices/account';

const rootReducer = {
  accessControl: accessControlReducer,
  account: accountReducer,
};

export default rootReducer;
