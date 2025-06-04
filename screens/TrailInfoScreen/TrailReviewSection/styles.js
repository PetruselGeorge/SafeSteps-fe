import { StyleSheet } from "react-native";

export default StyleSheet.create({
  reviewSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "rgba(55, 75, 95, 0.3)",
    borderRadius: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A0CFFF",
    marginBottom: 15,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  averageRatingWrapper: {
    alignItems: "center",
    marginBottom: 15,
  },
  averageText: {
    color: "#A0CFFF",
    fontSize: 14,
    marginTop: 5,
  },
  reviewScroll: {
    height: 220, 
    paddingHorizontal: 10,
  },
  reviewCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    marginRight: 12, 
    width: 280, 
    flexShrink: 0,
  },
  reviewAuthor: {
    fontWeight: "600",
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
  },
  reviewDate: {
    color: "#A0CFFF",
    fontSize: 12,
    marginBottom: 8,
  },
  reviewText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    gap: 12,
    marginTop: 10,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 12,
    color: "#FFFFFF",
    padding: 12,
    fontSize: 14,
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#50A8FF",
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  ratingInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingLabel: {
    color: "#FFD700",
    fontSize: 14,
  },
  reviewActions: {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 8,
  gap: 12,
},

reviewActionButton: {
  backgroundColor: "rgba(55, 75, 95, 0.35)",
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
},

editButton: {
  borderColor: "#A0CFFF",
},

deleteButton: {
  borderColor: "#FF6B6B",
},
});
