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
export const HOME =  "HOME"
export type RootParamList = {
  [BOTTOM_TABS]: undefined;
  [HOME]: { screen: keyof ProfileStackParamList } | undefined;
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
  [SEARCH] : undefined;
};