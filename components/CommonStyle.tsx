import { StyleSheet } from "react-native";
import { height, width } from "./config";

export const CommonStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EDF4FF",
  },
  container: {
    //  paddingHorizontal: width * 0.0,
    flex: 1,
    backgroundColor: "#EDF4FF",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageIcon: {
    height: 20,
    width: 20,
    marginRight: width * 0.01,
  },
  InputMainView: {
    height: height * 0.08,
    width: width * 0.9,

    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.015,
  },
  InputMainView1: {
    width: width * 0.82,

    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: width * 0.03,
  },
  input: {
    height: height * 0.08,
    width: width * 0.7,
    alignSelf: "flex-start",
   
  },
  CreateText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  CreateView: {
    width: width * 0.9,
    height: height * 0.08,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
    alignSelf: "center",
  },
  JobTitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: height * 0.01,
  },
});
