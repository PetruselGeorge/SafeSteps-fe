import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  backText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 16,
  },

  titleContainer: {
    marginTop: 130,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#A0CFFF",
    textAlign: "center",
  },

  infoContainer: {
    marginTop: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },

  info: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 12,
  },
});
