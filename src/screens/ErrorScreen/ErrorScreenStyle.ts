import { StyleSheet } from "react-native";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    paddingTop: 110,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.type.demibold,
  },
  subTitle: {
    fontSize: 19,
    fontFamily: fonts.type.regular,
  },
  button: {
    marginTop: 20,
  },
  logo: {},
});
