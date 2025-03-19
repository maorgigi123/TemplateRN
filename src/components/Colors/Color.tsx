import { Theme, theme } from "../../../store/user/user.types";


export interface IColor {
  BACKGROUND: string;
  TEXT: string;
  WHITE: string;
  BLACK: string;
  LINE_BREAK: string;
  PRIMARY_BUTTON: string;
  GrayBackground: string;
  PRIMARY_BUTTON_HOVER: string;
  PRIMARY_COLOR: string;
  SECONDARY_BACKGROUND: string;
  SECONDARY_TEXT: string;
  ACCENT_COLOR: string;
}

export const Color ={
  WHITE_BACKGROUND:'#F0F0F0',
  BLACK_BACKGROUND: '#1F1F1F',
  LINE_BREAK:'#9a9999',
  WHITE:'#fff',
  BLACK:'#000',
  GrayBackground:'#323436',
  BLUE:'#0000ff',
  // 'rgb(0,149,246)' , #1d85fc
  PRIMARY_BUTTON: '#7C01F6',
  PRIMARY_BUTTON_HOVER:'#AC5BFD',
  PrimaryColor: '#830EF7',
}
// colors.js
export const LIGHT_THEME = {
    BACKGROUND: '#F0F0F0',
    TEXT: '#000',
    WHITE:'#fff',
    BLACK:'#000',
    LINE_BREAK: '#9a9999',
    PRIMARY_BUTTON: '#7C01F6',
    GrayBackground:'#323436',
    PRIMARY_BUTTON_HOVER: '#AC5BFD',
    PRIMARY_COLOR: '#830EF7',
    SECONDARY_BACKGROUND: '#fff',
    SECONDARY_TEXT: '#323436',
    ACCENT_COLOR: '#0000ff',
  };
  
  export const DARK_THEME = {
    BACKGROUND: '#000',
    TEXT: '#fff',
    WHITE:'#fff',
    BLACK:'#000',
    LINE_BREAK: '#9a9999',
    PRIMARY_BUTTON: '#7C01F6',
    GrayBackground:'#323436',
    PRIMARY_BUTTON_HOVER: '#AC5BFD',
    PRIMARY_COLOR: '#830EF7',
    SECONDARY_BACKGROUND: '#323436',
    SECONDARY_TEXT: '#F0F0F0',
    ACCENT_COLOR: '#1d85fc',
  };



  export const getTheme = (isDarkMode: Theme) => {
    if (isDarkMode === theme.dark) {
      return DARK_THEME; // Return dark theme colors if isDarkMode is true
    } else {
      return LIGHT_THEME; // Return light theme colors otherwise
    }
  };