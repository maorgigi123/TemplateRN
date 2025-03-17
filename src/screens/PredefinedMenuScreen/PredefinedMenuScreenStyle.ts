import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
    gap: 20,
  },
  content: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 20,
  },
  searchBox: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  jsonText: {
    textAlign: "right",
  },
  itemHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  itemTitle: {
    textAlign: "right",
    marginVertical: 5,
    width: "70%",
  },
  itemIndex: {
    textAlign: "left",
    marginVertical: 5,
  },
  container_btn: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "90%",
    alignSelf: "center",
  },
  item: { gap: 5, padding: 10, backgroundColor: "white", borderRadius: 8 },
  text_data: {
    position: "absolute",
    padding: 5,
    margin: 5,
    backgroundColor: "lightblue",
    color: "white",
  },
  container_collapse: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent:'space-between',
    flex: 1,
  },
  container_expanded: {
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
