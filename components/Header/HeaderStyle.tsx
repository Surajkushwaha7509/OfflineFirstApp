import { StyleSheet } from "react-native";
import { height, width } from "../config";

export const styles = StyleSheet.create({
  HomeView: {
    paddingHorizontal: width * 0.04,
    height: height * 0.07,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:height*0.01
  },
  backView: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03,
    backgroundColor: "#fff",
    borderRadius: 100,
    elevation: 2,
  },
  headerText: {
    // fontSize: 22,
    fontWeight: "500",
  },
  bodyText: {
    fontSize: 14,
  },
  BackTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  Icon1: {
    height: 30,
    width: 30,
  },
  Icon2: {
    marginLeft: width * 0.05,
  },
});
