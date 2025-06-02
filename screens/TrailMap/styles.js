import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162233",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#162233",
  },
  overlay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(22,34,51,0.85)",
    padding: 12,
    borderRadius: 20,
  },
  backButton: {
    padding: 8,
  },
  timerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A0CFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  followButtonText: {
    color: "#162233",
    fontWeight: "bold",
    marginLeft: 6,
  },
});
