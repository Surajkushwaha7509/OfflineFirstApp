import { CommonStyles } from "@/components/CommonStyle";
import HeaderScreen from "@/components/Header/HeaderScreen";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./CreateJobStyle";
import { InputField1 } from "@/components/CommonComponent";
import { height } from "@/components/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const CreateJobScreen = (props: Props) => {
  const { screenName, id } = useLocalSearchParams<{
    screenName: string;
    id: any;
  }>();
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const EditScreen = screenName === "EditDetails";

  const getJobDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `https://sandbox-job-app.bosselt.com/api/v1/job-details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        Alert.alert("Failed to load job details");
        return;
      }

      const job = result.data || result;

      setJobTitle(job.title || "");
      setDescription(job.description || "");
      setCity(job.location || "");
      setBudget(String(job.budget || ""));
    } catch (error) {
      console.error("Get Job Error:", error);
    }
  };

  useEffect(() => {
    if (EditScreen && id) {
      getJobDetails();
    }
  }, [EditScreen, id]);

  const CreateJob = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Please login again");
        return;
      }

      const url = EditScreen
        ? `https://sandbox-job-app.bosselt.com/api/v1/jobs/${id}`
        : "https://sandbox-job-app.bosselt.com/api/v1/jobs";

      const method = EditScreen ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          clientJobId: `${token}-${Date.now()}`,
          title: jobTitle,
          location: city,
          description,
          budget: Number(budget),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          EditScreen
            ? "Job updated successfully ✅"
            : "Job created successfully ✅"
        );
        router.navigate("/HomeScreen/HomeScreen");
      } else {
        Alert.alert(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submit Job Error:", error);
      Alert.alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView style={CommonStyles.mainContainer}>
      <View style={CommonStyles.container}>
        <HeaderScreen
          HeaderText={EditScreen ? "Edit Job" : "Create New Job"}
          BodyText="Fill in the details below"
          backgroundColor="#EDF4FF"
          textColor="#0F172A"
          bodyColor="#64748B"
          showIcon={true}
          handleBtn={() => router.back()}
        />
        <View style={{ alignItems: "center" }}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: height * 0.12,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.jobMainView}>
              <View style={styles.jobHeaderView}>
                <Image
                  source={require("../../assets/images/splashIcon.png")}
                  style={styles.Icon1}
                  contentFit="contain"
                  tintColor={"#3B82F6"}
                />
                <Text style={styles.JobDetails}>Job Details</Text>
              </View>
              <InputField1
                title="Job Title *"
                placeholder={"e.g., Kitchen Renovation"}
                value={jobTitle}
                onChangeText={setJobTitle}
                backgroundColor="#F1F5F9"
              />
              <InputField1
                title="Description"
                placeholder={"Add job description..."}
                value={description}
                onChangeText={setDescription}
                backgroundColor="#F1F5F9"
                inputHeight={height * 0.12}
                numberOfLines={3}
                multiline={true}
              />
            </View>
            <View style={styles.jobMainView}>
              <View style={styles.jobHeaderView}>
                <Image
                  source={require("../../assets/images/Header/fullName.png")}
                  style={styles.Icon1}
                  contentFit="contain"
                  tintColor={"#22C55E"}
                />
                <Text style={styles.JobDetails}>Client Info</Text>
              </View>
              <InputField1
                title="Client Name *"
                placeholder={"e.g., John Smith"}
                value={clientName}
                onChangeText={setClientName}
                backgroundColor="#F1F5F9"
              />
              <InputField1
                title="City *"
                placeholder={"e.g., San Francisco"}
                value={city}
                onChangeText={setCity}
                backgroundColor="#F1F5F9"
                image={require("../../assets/images/Header/location.png")}
              />
            </View>
            <View style={styles.jobMainView}>
              <View style={styles.jobHeaderView}>
                <Image
                  source={require("../../assets/images/Header/dollerIcon.png")}
                  style={styles.Icon1}
                  contentFit="contain"
                  tintColor={"#FBBF24"}
                />
                <Text style={styles.JobDetails}>Budget & Timeline</Text>
              </View>
              <InputField1
                title="Budget (USD) *"
                placeholder={"0"}
                value={budget}
                onChangeText={setBudget}
                backgroundColor="#F1F5F9"
                image={require("../../assets/images/Header//dollerIcon.png")}
              />
              <InputField1
                title="Start Date"
                placeholder={""}
                value={date}
                onChangeText={setDate}
                backgroundColor="#F1F5F9"
                image={require("../../assets/images/Header/calenderIcon.png")}
              />
              <InputField1
                title="Status"
                placeholder={""}
                value={status}
                onChangeText={setStatus}
                backgroundColor="#F1F5F9"
              />
            </View>
            <Pressable onPress={CreateJob}>
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                style={CommonStyles.CreateView}
              >
                <Text style={CommonStyles.CreateText}>
                  {EditScreen ? "Update Job" : "Create Job"}
                </Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateJobScreen;
