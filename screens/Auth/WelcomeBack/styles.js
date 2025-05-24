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
  fullScreenStars: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "40%",
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

  welcomeText: {
 fontFamily: 'PoppinsBold',
  fontSize: 28,
  color: '#FFB300',
  textAlign: 'center',
  textShadowColor: 'rgba(0,0,0,0.8)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
  letterSpacing: 1.2,
  },

  subText: {
  fontFamily: 'PoppinsLight',
  fontSize: 16,
  color: '#B0CDE8',
  textAlign: 'center',
  marginTop: 10,
  textShadowColor: 'rgba(0,0,0,0.6)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
  lineHeight: 22,
  },
});
