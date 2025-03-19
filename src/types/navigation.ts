import { IListing } from "./response";

//Boot
export const SPLASH = 'Splash';
export const BOOT = 'Boot';
export const PREDEFINED = "PREDEFINED"
export const ERROR = "ERROR"

export type BootParamList = {
    [SPLASH] : undefined
    [BOOT] : undefined
    [PREDEFINED] : undefined
    [ERROR] : undefined
  };
  

//Auth
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export type AuthParamList = {
    [LOGIN] : undefined,
    [REGISTER] : undefined
    [ERROR]: undefined;
};

//Root
export const BOTTOM_TABS = "BottomTabs";

export type RootParamList = {
  [BOTTOM_TABS]: ProfileStackParamList;
  [ERROR]: undefined;
};

export const MESSAGES = "Messages";
export const RENTAL = "RENTAL";
export const PROFILE = "Profile";
export const SEARCH = "SEARCH"

export type ProfileStackParamList = {
  [ERROR]: undefined;
  [PROFILE]: undefined;
  [MESSAGES]: undefined;
  [RENTAL]: undefined;
  [SEARCH] : { screen: keyof SearchStackParamList } | undefined;
};

export const SEARCH_SCREEN= "SEARCH_SCREEN"
export const SEARCH_DETAILES = "SEARCH_DETAILES"
export type SearchStackParamList = {
  [SEARCH_SCREEN]: undefined;
  [SEARCH_DETAILES]: {item:IListing, index:number};
};

