import { InputField } from "@/components/CommonComponent";
import { CommonStyles } from "@/components/CommonStyle";
import { height } from "@/components/config";
import HeaderScreen from "@/components/Header/HeaderScreen";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../CreateAcountScreen/CreateAcountStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {};
  const CreateAccount = () => {
    router.navigate("/CreateAcountScreen/CreateAcountScreen");
  };
  const SignIn = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "https://sandbox-job-app.bosselt.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Login successful ✅");

        console.log("Login Response:", data);
        await AsyncStorage.setItem("token", data.data.token);

        router.replace("/HomeScreen/HomeScreen");
      } else {
        alert(data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again");
    }
  };

  return (
    <SafeAreaView style={CommonStyles.mainContainer}>
      <View style={CommonStyles.container}>
        <HeaderScreen
          HeaderText="Welcome Back"
          BodyText="Sign in to continue"
          backgroundColor="#EDF4FF"
          textColor="#0F172A"
          bodyColor="#64748B"
          showIcon={true}
          handleBtn={() => router.back()}
        />
        <View style={{ marginTop: height * 0.05 }}>
          <InputField
            image={require("../../assets/images/Header/email.png")}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            image={require("../../assets/images/Header/password.png")}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            showPassword={true}
            handleShowPassword={handleShowPassword}
          />
          <Text style={styles.text3}>Forget Password ?</Text>

          <Pressable onPress={SignIn} style={{ marginTop: height * 0.1 }}>
            <LinearGradient
              colors={["#3B82F6", "#2563EB"]}
              style={CommonStyles.CreateView}
            >
              <Text style={CommonStyles.CreateText}>Sign In</Text>
            </LinearGradient>
          </Pressable>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={styles.text1}>Don't have an account?</Text>
            <Pressable onPress={CreateAccount}>
              <Text style={styles.text2}>Create Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
