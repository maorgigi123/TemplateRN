import { theme, Theme, USER_ACTION_TYPES, UserState } from './user.types';

// Define the initial state and type it as `UserState`
const INITIAL_STATE: UserState = {
  isDarkMode: theme.light as Theme,
  isLoggedIn: false,
};

// Define the reducer with explicit types for state and action
export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: any & { payload: Theme }
): UserState => {
  switch (action.type) {
    case USER_ACTION_TYPES.SETTHEME:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case USER_ACTION_TYPES.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};