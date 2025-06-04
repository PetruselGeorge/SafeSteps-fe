import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContent: {
    paddingBottom: 50,
    paddingHorizontal: 20,
  },

  background: {
    flex: 1,
    backgroundColor: "#101820",
  },

  header: {
    marginTop: 40,
    marginBottom: 10,
    alignItems: "center",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  backText: {
    color: "#A0CFFF",
    fontSize: 16,
    marginLeft: 8,
  },

  pageTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },

  galleryWrapper: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  infoContainer: {
    marginTop: 25,
    backgroundColor: "rgba(160, 207, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },

  addImageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#A0CFFF",
    borderRadius: 10,
  },

  addImageText: {
    color: "#A0CFFF",
    marginLeft: 8,
    fontSize: 16,
  },
  startTrail: {
    backgroundColor: "rgba(160, 207, 255, 0.05)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
