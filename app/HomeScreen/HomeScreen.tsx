import { InputField } from "@/components/CommonComponent";
import { CommonStyles } from "@/components/CommonStyle";
import { height, width } from "@/components/config";
import HeaderScreen from "@/components/Header/HeaderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeStyle";

type Props = {};
type Job = {
  _id: string;
  title: string;
  location: string;
  description: string;
  budget: number;
};

const HomeScreen = (props: Props) => {
  const [jobKeyword, setJobKeyword] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const handleCreateJob = () => {
    router.navigate("/CreateJobScreen/CreateJobScreen");
  };

  const getJobs = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Session expired", "Please login again");
        router.replace("/SignInScreen/SignInScreen");
        return;
      }

      const response = await fetch(
        "https://sandbox-job-app.bosselt.com/api/v1/jobs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const text = await response.text();

      if (!response.ok) {
        Alert.alert("Error", text);
        return;
      }

      const data = JSON.parse(text);
      setJobs(data.data || []);
    } catch (error) {
      console.error("Get Jobs Error =>", error);
      Alert.alert("Error", "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getJobs();
    }, [])
  );

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(jobKeyword.toLowerCase())
  );

  const getMyProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Session expired", "Please login again");
        router.replace("/SignInScreen/SignInScreen");
        return;
      }

      const response = await fetch(
        "https://sandbox-job-app.bosselt.com/api/v1/auth/myProfile",
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
        Alert.alert("Error", result?.message || "Failed to load profile");
        return;
      }

      console.log("USER PROFILE =>", result.data);
      setUser(result.data); // store profile
    } catch (error) {
      console.log("Profile Error =>", error);
      Alert.alert("Something went wrong");
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const renderJob = ({ item, index }: any) => {
    return (
      <Pressable
        onPress={() => {
          router.navigate({
            pathname: "/JobDetailsScreen/JobDetailsScreen",
            params: {
              clientJobId: String(item._id),
            },
          });
        }}
        style={styles.jobMainView}
      >
        <View style={CommonStyles.rowContainer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.Client}>Client Name</Text>
          </View>
          <View
            style={[
              styles.row,
              {
                backgroundColor: "#22C55E1A",
                height: height * 0.04,
                width: width * 0.23,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              },
            ]}
          >
            <Image
              source={require("../../assets/images/Header/statusCheckIcon.png")}
              style={styles.statusCheckIcon}
              contentFit="contain"
              tintColor={"#22C55E"}
            />
            <Text style={[styles.ActiveText, { color: "#22C55E" }]}>
              Active
            </Text>
          </View>
        </View>
        <View
          style={[
            CommonStyles.rowContainer,
            { marginVertical: height * 0.015 },
          ]}
        >
          <View style={styles.row}>
            <View style={styles.dollerIconView}>
              <Image
                source={require("../../assets/images/Header/dollerIcon.png")}
                style={[styles.Icon2]}
                contentFit="contain"
                tintColor={"#3B82F6"}
              />
            </View>
            <Text style={styles.budgetText}>${item.budget}</Text>
          </View>
          <View style={styles.row}>
            <View
              style={[styles.dollerIconView, { backgroundColor: "#22C55E1A" }]}
            >
              <Image
                source={require("../../assets/images/Header/location.png")}
                style={[styles.Icon2]}
                contentFit="contain"
                tintColor={"#22C55E"}
              />
            </View>
            <Text style={styles.budgetText}>{item.location}</Text>
          </View>
        </View>
        <View style={[styles.dateView, styles.row]}>
          <Image
            source={require("../../assets/images/Header/TimerIcon.png")}
            style={[styles.Icon2]}
            contentFit="contain"
          />
          <Text style={styles.time}>
            Started {formatDateTime(item.createdAt)}
          </Text>
        </View>
      </Pressable>
    );
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await fetch("https://sandbox-job-app.bosselt.com/api/v1/auth/logout", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `${token}`,
        },
      });

      await AsyncStorage.clear()
      setProfileModalVisible(false);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Logout failed");
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? This will permanently delete your account.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await fetch(
                "https://sandbox-job-app.bosselt.com/api/v1/auth/delAccount",
                {
                  method: "DELETE",
                  headers: {
                    accept: "*/*",
                    Authorization: `${token}`,
                  },
                }
              );

              await AsyncStorage.clear();
              setProfileModalVisible(false);
              router.replace("/");
            } catch (error) {
              Alert.alert("Error", "Account delete failed");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={CommonStyles.mainContainer}>
      <View style={{ backgroundColor: "#fff" }}>
        <HeaderScreen
          HeaderText="Welcome back"
          BodyText={user?.name}
          backgroundColor="#fff"
          textColor="#64748B"
          bodyColor="#0F172A"
          showIcon={false}
          handleBtn={() => null}
          HeaderfontSize={14}
          bodyfontSize={22}
          image={
            <TouchableOpacity
              style={styles.editView}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={styles.editText}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </Text>
            </TouchableOpacity>
          }
        />
        <InputField
          image={require("../../assets/images/Header/searchIcon.png")}
          placeholder="Search jobs..."
          value={jobKeyword}
          onChangeText={setJobKeyword}
          backgroundColor="#F1F5F9"
        />
      </View>
      <View
        style={[
          CommonStyles.rowContainer,
          {
            paddingHorizontal: width * 0.05,
            marginVertical: height * 0.02,
          },
        ]}
      >
        <Text style={styles.yourJobs}>Your Jobs ({filteredJobs.length})</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item._id}
          renderItem={renderJob}
          contentContainerStyle={{
            paddingBottom: height * 0.15,
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading ? (
              <Text style={{ textAlign: "center", marginTop: 40 }}>
                No jobs found
              </Text>
            ) : null
          }
        />
      </View>
      <Pressable
        onPress={handleCreateJob}
        style={{
          position: "absolute",
          bottom: height * 0.05,
          right: width * 0.08,
        }}
      >
        <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.backView}>
          <Image
            source={require("../../assets/images/Header/addJobIcon.png")}
            style={styles.Icon1}
            contentFit="contain"
          />
        </LinearGradient>
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setProfileModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{user?.name}</Text>

            <TouchableOpacity style={styles.modalBtn} onPress={handleLogout}>
              <Text style={styles.modalBtnText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: "#EF4444" }]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.modalBtnText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: "#CBD5E1" }]}
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={[styles.modalBtnText, { color: "#0F172A" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");

  return `${day} ${month}, ${year}, ${hh}:${minutes}:${seconds} ${ampm}`;
};
