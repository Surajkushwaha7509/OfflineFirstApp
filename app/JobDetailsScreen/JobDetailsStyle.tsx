import { height, width } from "@/components/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  editView: {
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.05,
    width: width * 0.15,
    borderRadius: 20,
  },
  editText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 30,
    padding: 6,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.01,
  },

  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: height * 0.015,
    borderRadius: 24,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },

  tabText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },

  activeTabText: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },
  overViewHeader: {
    height: height * 0.2,
    width: width * 0.9,
    borderRadius: 16,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    justifyContent: "space-evenly",
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusCheckIcon: {
    height: 15,
    width: 15,
    marginRight: width * 0.01,
  },
  ActiveText: {
    fontSize: 16,
  },
  Icon2: {
    height: 30,
    width: 30,
  },
  Icon1: {
    height: 15,
    width: 15,
  },
  text: {
    fontSize: 16,
    color: "#ffffff70",
  },
  budget: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  Sideview: {
    height: height * 0.2,
    backgroundColor: "#fff",
    width: width * 0.43,
    borderRadius: 16,
    marginVertical: height * 0.015,
    padding: 16,
    justifyContent: "space-around",
  },
  dollerIconView: {
    height: 30,
    width: 30,
    backgroundColor: "#3B82F61A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginRight: width * 0.02,
  },
  JobDetails: {
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
  },
  overViewHeader1: {
    width: width * 0.9,
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    justifyContent: "space-evenly",
    marginBottom: height * 0.015,
    elevation: 2,
  },
  CreateView: {
    width: width * 0.8,
    height: height * 0.06,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
    alignSelf: "center",
  },
  noteCard: {
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 12,
    marginBottom: height * 0.015,
    borderLeftWidth: 5,
    borderLeftColor: "#3B82F6",
    elevation: 1,
  },
  noteText: {
    fontSize: 16,
    color: "#0F172A",
  },
  noteDate: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "right",
    marginLeft: width * 0.01,
  },
  uploadIconView: {
    backgroundColor: "#3B82F61A",
    height: height * 0.08,
    width: width * 0.17,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
});


