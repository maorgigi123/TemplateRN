import { StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme"; // Assuming you have a custom hook for themes

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", // Background color for the screen
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000", // Main text color
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#777", // Subtitle color
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
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
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  loginLink: {
    fontSize: 16,
    color: "#007bff", // Link color
    textDecorationLine: "underline",
  },
  forgotPassword: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginTop: 15,
  },
  signUpLink: {
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
  },
  errorText : {
    color:'red',
    marginBottom:5
  }
});
