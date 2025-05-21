// screens/Registration/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 60,
    backgroundColor: "rgb(22, 34, 51)",
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

  validationBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  dropContainer: {
    marginBottom: 16,
    borderRadius: 10,
    borderColor: "rgb(255, 255, 255)",
    backgroundColor: "rgba(39, 46, 80, 0)",
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  dropText: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  dropPlaceholder: {
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  dropSelectedItem: {
    backgroundColor: "rgb(22, 34, 51)",
    borderRadius: 5,
  },
  dropdownItem: {
    backgroundColor: "rgb(22, 34, 51)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(22, 34, 51)",
  },
  searchContainer: {
    backgroundColor: "rgb(22, 34, 51)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(22, 34, 51)",
  },
  searchTextInput: {
    color: "white",
    paddingHorizontal: 10,
  },
  flInputContainer: {
    marginBottom: 16,
    backgroundColor: "rgb(22, 34, 51)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(22, 34, 51)",
  },
  flInputField: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgb(22, 34, 51)",
  },
  flListContainer: {
    maxHeight: 300,
    backgroundColor: "rgb(22, 34, 51)",
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "rgb(22, 34, 51)",
  },
  flListItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(22, 34, 51)",
  },
  flListItemText: {
    color: "white",
    fontSize: 16,
  },
});
