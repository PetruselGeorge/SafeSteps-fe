import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 120,
    borderRadius: 20,
    backgroundColor: "rgba(55, 75, 95, 0.35)",
    borderColor: "rgba(160, 207, 255, 0.3)",
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
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

  selectFile: {
    marginTop: 12,
    fontSize: 14,
    color: "#ccc",
    fontStyle: "italic",
  },
});
