import { ILocation } from "./user.reducer";
import { USER_ACTION_TYPES } from "./user.types";

// Define the createAction function
const createAction = <T>(type: string, payload: T) => ({
  type,
  payload,
});

export const SetTheme = (Theme: string) =>
  createAction<string>(USER_ACTION_TYPES.SETTHEME, Theme);

export const SetLogin = (Login: boolean) =>
  createAction<boolean>(USER_ACTION_TYPES.SET_LOGIN, Login);

export const SetLocation = (location: ILocation) =>
  createAction<ILocation>(USER_ACTION_TYPES.SET_LOCATION, location);