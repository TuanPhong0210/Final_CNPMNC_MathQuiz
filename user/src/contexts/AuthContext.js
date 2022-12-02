import { node } from 'prop-types';
import { useEffect, useReducer, createContext } from 'react';

// apis
import accountApi from '../apis/accountApi';
// utils
import { getToken, setToken, isValidToken } from '../utils/jwt';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  profile: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      isInitialized: true,
      ...payload,
    };
  },
  LOGIN: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      isAuthenticated: true,
      ...payload,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      profile: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {},
});

const propTypes = {
  children: node,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProfile = () => {
    return 'Tuệ (Student)';
  };
  useEffect(() => {
    const initialize = async () => {
      try {
        const tokens = getToken();
        setToken(tokens);
        const isAuthenticated = await isValidToken(tokens);
        if (isAuthenticated) {
          const profile = getProfile();
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated,
              profile,
            },
          });
          return;
        }
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (params) => {
    const response = await accountApi.login(params);
    const { name, tokens } = response;
    setToken(tokens);
    const profile = getProfile();
    dispatch({
      type: 'LOGIN',
      payload: {
        profile,
      },
    });
    return name;
  };
  const logout = () => {
    setToken(null);
    dispatch({
      type: 'LOGOUT',
    });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
