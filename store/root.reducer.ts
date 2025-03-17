import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer"; // Adjust path if needed

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type
