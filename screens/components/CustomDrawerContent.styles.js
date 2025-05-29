import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162233",
    paddingTop: 30,
  },
  userSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  email: {
    color: "#A0CFFF",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  itemsWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#e74c3c",
    marginLeft: 10,
  },
});
