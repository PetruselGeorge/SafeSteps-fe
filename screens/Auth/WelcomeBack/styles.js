import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  fullScreenFireworks: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,
    backgroundColor: "transparent",
  },
    contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "Pacifico",
    fontSize: 48,
    color: "white",
    textAlign: "center",
  },
  div: {
    fontFamily: "Pacifico",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
});
