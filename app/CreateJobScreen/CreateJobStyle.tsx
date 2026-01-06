import { height, width } from "@/components/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  jobMainView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    // height: height * 0.4,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
    marginBottom: height * 0.02,
    elevation:2
  },
  jobHeaderView: {
    flexDirection: "row",
    alignItems: "center",
     marginBottom: height * 0.01,
  },
  Icon1: {
    height: 22,
    width: 22,
    marginRight: width * 0.02,
  },
  JobDetails: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
});
