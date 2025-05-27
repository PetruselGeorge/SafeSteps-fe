import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sectionWrapper: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: "#162233",
    flex: 1,
  },
  sectionTitle: {
    color: "#A0CFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  card: {
    width: 300,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#1e1e1e",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 12,
    height: "100%",
    justifyContent: "center",
  },
  trailName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  trailInfo: {
    color: "#d0d0d0",
    fontSize: 14,
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
});
