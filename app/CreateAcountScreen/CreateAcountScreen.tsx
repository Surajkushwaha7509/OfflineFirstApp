import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles } from "@/components/CommonStyle";
import HeaderScreen from "@/components/Header/HeaderScreen";
import { router } from "expo-router";
import { Image } from "expo-image";
import { InputField } from "@/components/CommonComponent";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./CreateAcountStyle";
import { height } from "@/components/config";

type Props = {};

const CreateAcountScreen = (props: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {};

  const CreateAccount = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch(
        "https://sandbox-job-app.bosselt.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullName,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        alert("Account created successfully 🎉");
        router.replace("/SignInScreen/SignInScreen");
      } else {
        alert(data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      alert("Something went wrong. Please try again");
    }
  };

  const SignIn = () => {
    router.navigate("/SignInScreen/SignInScreen");
  };
  return (
    <SafeAreaView style={CommonStyles.mainContainer}>
      <View style={CommonStyles.container}>
        <HeaderScreen
          HeaderText="Create Account"
          BodyText="Join CJM today"
          backgroundColor="#EDF4FF"
          textColor="#0F172A"
          bodyColor="#64748B"
          showIcon={true}
          handleBtn={() => router.back()}
        />
        <View style={{ marginTop: height * 0.05 }}>
          <InputField
            image={require("../../assets/images/Header/fullName.png")}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
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
          <Text style={styles.text}>
            Password must be at least 8 characters
          </Text>

          <Pressable
            onPress={CreateAccount}
            style={{ marginTop: height * 0.1 }}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB"]}
              style={CommonStyles.CreateView}
            >
              <Text style={CommonStyles.CreateText}>Create Account</Text>
            </LinearGradient>
          </Pressable>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={styles.text1}>Already have an account?</Text>
            <Pressable onPress={SignIn}>
              <Text style={styles.text2}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAcountScreen;
