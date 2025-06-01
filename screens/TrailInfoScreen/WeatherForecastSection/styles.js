import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: "rgba(160, 207, 255, 0.12)",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    color: "#A0CFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  loadingText: {
    color: "#A0CFFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  forecastItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "rgba(160, 207, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(160, 207, 255, 0.12)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    gap: 14,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forecastText: {
    color: "#A0CFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "75%",
    backgroundColor: "rgb(30, 42, 56)",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    color: "#A0CFFF",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalScroll: {
    marginBottom: 15,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#A0CFFF",
    borderRadius: 8,
  },
  closeText: {
    color: "#101820",
    fontWeight: "bold",
  },
  chartContainer: {
    height: 240,
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  lineChartWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  lineChart: {
    flex: 1,
  },
  chartContentInset: {
    top: 30,
    bottom: 20,
  },
  chartLine: {
    stroke: "#A0CFFF",
    strokeWidth: 2.5,
  },
  gridLine: {
    stroke: "#2A3A4F",
  },
  xAxis: {
    marginTop: 12,
  },
  xAxisInset: {
    left: 12,
    right: 12,
  },
  axisText: {
    fontSize: 12,
    fill: "#A0CFFF",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    gap: 10,
  },

  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(55, 75, 95, 0.3)",
  },

  tabButtonActive: {
    backgroundColor: "#A0CFFF",
  },

  tabText: {
    color: "#A0CFFF",
    fontSize: 14,
    fontWeight: "500",
  },

  tabTextActive: {
    color: "#101820",
    fontWeight: "bold",
  },
});
