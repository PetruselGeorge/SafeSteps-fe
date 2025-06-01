import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = 200;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: "center",
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 50,
    alignItems: "center",
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: "#444",
  },
  controls: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 22,
    color: "#A0CFFF",
  },
  indexText: {
    color: "#fff",
    marginHorizontal: 10,
  },
  loader: {
    marginTop: 30,
    alignItems: "center",
  },
  noImagesText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  backImage: {
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.4,
  },
  loader: {
    marginTop: 30,
    alignItems: "center",
  },
  noImagesText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
imageWrapper: {
  position: "relative",
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
},

deleteOverlayButton: {
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  padding: 6,
  borderRadius: 20,
  zIndex: 10,
},

deleteOverlayText: {
  fontSize: 18,
  color: "#FF6B6B",
  fontWeight: "bold",
},

});

export default styles;
