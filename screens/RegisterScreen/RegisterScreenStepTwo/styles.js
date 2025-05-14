// screens/Registration/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 60,
    backgroundColor: "rgb(20,31,41)",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: "rgb(255,255,255)",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 32,
    color: "rgb(255,255,255)",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgb(255,255,255)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    height: 48,
  },
  icon: { marginRight: 10 },
  inputField: { flex: 1, color: "white" },

  button: {
    backgroundColor: "rgb(28, 125, 186)",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  skipText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 16,
  },

});
