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
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "rgb(255,255,255)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    textTransform: "capitalize",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(255,255,255)",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "rgb(28, 125, 186)",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "rgba(160, 207, 255, 0.44)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  validationBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
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
  inputFieldName: {
    flex: 1,
    color: "white",
    textTransform: "capitalize",
  },

  strengthWrapper: {
    width: "100%",
    marginTop: 12,
    marginBottom: 20,
  },

  strengthText: {
    color: "#A0CFFF", // același accent deschis din buton-disabled
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },

  strengthTrack: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 50,
    overflow: "hidden",
  },

  strengthBar: (strength) => ({
    height: "100%",
    borderRadius: 50,
    width:
      {
        "Too Weak": 0,
        Weak: 0.25,
        Moderate: 0.5,
        Strong: 0.75,
        "Very Strong": 1,
      }[strength] *
        100 +
      "%",
    backgroundColor: {
      "Too Weak": "#FF4C4C",
      Weak: "#FF854C",
      Moderate: "#F9CE42",
      Strong: "#46D369",
      "Very Strong": "#2DFF9E",
    }[strength],
  }),

  errorBorder: {
    borderColor: "#FF4C4C",
  },
});
