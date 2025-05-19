import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 60,
    backgroundColor: "rgb(20,31,41)",
  },
  card: {
    backgroundColor: "rgba(55, 75, 95, 0.29)",
    borderRadius: 15,
    borderColor: "rgba(219, 226, 233, 0.29)",
    borderWidth: 1,
    shadowColor: "rgba(219, 226, 233, 0.29)",
    shadowRadius: 30,
    padding: 15,
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 32,
    color: "rgb(255,255,255)",
    textAlign: "center",
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
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    color: "white",
  },
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
  errorText: {
    color: "#FF4C4C",
    marginBottom: 16,
    textAlign: "center",
  },
});
