import { StyleSheet } from "react-native";
import {} from "../../styles/universalColors";

export const styles = StyleSheet.create({
  root: {
    flex: 0.3,
    marginHorizontal: 10,
    marginVertical: 20,
    gap: 20,
  },

  list: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  loggerContainer: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    backgroundColor: "orange",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },

  loggerTitle: {
    textAlign: "left",
    marginBottom: 10,
  },

  logger: {
    gap: 10,
  },

  logItem: {
    backgroundColor: "lightblue",
    padding: 10,
  },

  btn: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 6,
  },
  topText: {
    textAlign: "left",
  },
});
