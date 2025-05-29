import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  menuButton: {
    position: "absolute",
    top: 80,
    left: 20,
    zIndex: 10,
  },
  contentContainerStyle: {
    paddingTop: 150,
    paddingBottom: 30,
  },
});
