import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 110,
    paddingHorizontal: 10,
    marginBottom:20
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#fff",
  },
  filterButton: {
    marginLeft: 10,
  },
  filterContainer: {
  backgroundColor: "#233040",
  padding: 14,
  borderRadius: 14,
  marginTop: 12,
  marginHorizontal: 20,
  borderWidth: 1,
  borderColor: "#3b4b5c",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
filterLabel: {
  color: "#A0CFFF",
  fontWeight: "600",
  fontSize: 13,
  marginBottom: 8,
  marginTop: 14,
  letterSpacing: 0.5,
},
filterOption: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  backgroundColor: "#2e3b4d",
  marginBottom: 8,
  borderRadius: 8,
},
activeFilterOption: {
  backgroundColor: "#4b9e78",
},
filterOptionText: {
  color: "#fff",
  fontSize: 14,
},
resetButton: {
  marginTop: 14,
  paddingVertical: 10,
  backgroundColor: "#d9534f",
  borderRadius: 8,
  alignItems: "center",
},
resetButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize:14
}
});
