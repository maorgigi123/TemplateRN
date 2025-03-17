import { StyleSheet } from "react-native";
import {
  BUTTON_BLACK,
  DISABLED_GREY,
  DISABLED_GREY_TEXT,
} from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  btn: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: BUTTON_BLACK,
    borderWidth: 1,
    width: 202,
  },

  disabled: {
    backgroundColor: DISABLED_GREY,
    borderWidth: 0,
  },
  disabledText: {
    color: DISABLED_GREY_TEXT,
  },
  text: {
    fontFamily: fonts.type.demibold,
    fontSize: 20,
  },
});
