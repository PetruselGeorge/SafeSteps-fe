import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sectionWrapper: {
    paddingBottom: 0,
    flexGrow: 1,
  },
  container: {
    paddingVertical: 0,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    flex: 1,
  },
  sectionTitle: {
    color: "#A0CFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 28,
    marginTop: 80,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    textAlign: "center",
    opacity: 0.95,
  },
  card: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 26,
    backgroundColor: "#1e1e1e",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: "100%",
    justifyContent: "center",
  },
  trailName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  trailInfo: {
    color: "#cccccc",
    fontSize: 14,
    lineHeight: 20,
  },
  editIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
  },
  flatListContent: {
    paddingBottom: 40,
  },
  loadingIndicator: {
    marginVertical: 16,
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
    zIndex: 10,
  },
  addedAt: {
    color: "#A0CFFF",
    fontSize: 13,
    marginTop: 2,
  },
});
