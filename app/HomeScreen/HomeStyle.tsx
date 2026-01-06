import { height, width } from "@/components/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  editView: {
    backgroundColor: "#EDF4FF",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  backView: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 2,
  },
  Icon1: {
    height: 30,
    width: 30,
  },
  yourJobs: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 16,
    color: "#3B82F6",
    textDecorationLine: "underline",
  },
  jobMainView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
    marginBottom: height * 0.02,
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
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
  },
  Client: {
    fontSize: 14,
    color: "#64748B",
  },
  Icon2: {
    height: 15,
    width: 15,
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
  budgetText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  dateView: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: height * 0.015,
  },
  time: {
    fontSize: 12,
    marginLeft: width * 0.015,
    color: "#64748B",
  },
  editText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
},

modalContainer: {
  width: "80%",
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 20,
},

modalTitle: {
  fontSize: 18,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: 20,
},

modalBtn: {
  paddingVertical: 12,
  borderRadius: 8,
  backgroundColor: "#2563EB",
  marginBottom: 12,
},

modalBtnText: {
  textAlign: "center",
  color: "#fff",
  fontSize: 16,
  fontWeight: "500",
},

});
