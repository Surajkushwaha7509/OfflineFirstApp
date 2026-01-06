import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { height, width } from "@/components/config";
import { router } from "expo-router";
import { CommonStyles } from "@/components/CommonStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        router.replace("/HomeScreen/HomeScreen");
      } 
    };

    checkAuth();
  }, []);

  const CreateAccount = () => {
    router.navigate("/CreateAcountScreen/CreateAcountScreen");
  };
  const SignIn = () => {
    router.navigate("/SignInScreen/SignInScreen");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#0F172A", "#1E293B", "#0F172A"]}
        style={styles.background}
      >
        <LinearGradient
          colors={["#3B82F6", "#22C55E"]}
          style={styles.splashImage}
        >
          <Image
            source={require("../assets/images/splashIcon.png")}
            style={styles.splashImage1}
            contentFit="contain"
          />
        </LinearGradient>
        <Image
          source={require("../assets/images/splashheader.png")}
          style={styles.splashImage2}
          contentFit="contain"
        />
        <Text style={styles.text}>CJM</Text>
        <Text style={styles.text1}>Contractor Job Management</Text>
        <Pressable onPress={CreateAccount}>
          <LinearGradient
            colors={["#3B82F6", "#2563EB"]}
            style={CommonStyles.CreateView}
          >
            <Text style={CommonStyles.CreateText}>Create Account</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.SignView} onPress={SignIn}>
          <Text style={CommonStyles.CreateText}>Sign In</Text>
        </Pressable>
        <Text style={styles.text2}>
          By continuing, you agree to CJM's Terms of Service and Privacy Policy
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  SignView: {
    width: width * 0.9,
    height: height * 0.08,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffffff10",
    borderRadius: 10,
    borderWidth: 2,
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage1: {
    width: 50,
    height: 50,
  },
  splashImage2: {
    width: 80,
    height: 80,
    position: "absolute",
    top: height * 0.16,
    right: width * 0.23,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: height * 0.01,
  },
  text1: {
    color: "#94A3B8",
    fontSize: 18,
  },
  text2: {
    color: "#94A3B8",
    fontSize: 14,
    width: width * 0.85,
    textAlign: "center",
    top: height * 0.1,
  },
});
