import { width } from "@/components/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: width * 0.05,
  },
  text1: {
    fontSize: 14,
    color: "#64748B",
    alignSelf: "center",
  },
  text2: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft:10
  },
   text3: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight:width*0.05
  },
});
