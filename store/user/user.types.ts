import { ILocation } from "./user.reducer";

export interface UserState {
  isDarkMode: Theme;
  isLoggedIn : Boolean
  location: ILocation
}

export const theme = {
  dark: 'dark',
  light: 'light',
} as const;

export type Theme = typeof theme[keyof typeof theme]; // 'dark' | 'light'

export const USER_ACTION_TYPES = {
  SETTHEME: 'user/SETTHEME',
  SET_LOGIN: 'user/SETLOGIN',
  SET_LOCATION :'user/SETLOCATION'

};