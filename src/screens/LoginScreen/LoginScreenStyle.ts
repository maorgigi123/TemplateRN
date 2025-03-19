import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
      },
      input: {
        height: 45,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
      },
      button: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      forgotPassword: {
        color: "#007BFF",
        textAlign: "center",
        marginBottom: 20,
      },
      signUpLink: {
        color: "#007BFF",
        textAlign: "center",
      },
});

