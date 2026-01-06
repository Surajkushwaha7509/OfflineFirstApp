import { CommonStyles } from "@/components/CommonStyle";
import HeaderScreen from "@/components/Header/HeaderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./JobDetailsStyle";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { height, width } from "@/components/config";
import { Image } from "expo-image";
import { formatDateTime } from "../HomeScreen/HomeScreen";
import { InputField1 } from "@/components/CommonComponent";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";

const JobDetailsScreen = () => {
  const { clientJobId } = useLocalSearchParams<{ clientJobId: string }>();
  const [job, setJob] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState<any[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<any[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const TABS = [
    { key: "overview", label: "Overview", icon: "document-text-outline" },
    { key: "notes", label: "Notes", icon: "clipboard-outline" },
    { key: "video", label: "Video", icon: "videocam-outline" },
  ];

  const getJobDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Session expired", "Please login again");
        router.replace("/SignInScreen/SignInScreen");
        return;
      }

      const response = await fetch(
        `https://sandbox-job-app.bosselt.com/api/v1/job-details/${clientJobId}`,
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
        Alert.alert("Error", result?.message || "Failed");
        return;
      }

      setJob(result.data || result);
      setNotesList(result.data?.notes || []);
    } catch (error) {
      console.error("Job Details Error =>", error);
      Alert.alert("Failed to load job details");
    }
  };

  useEffect(() => {
    if (clientJobId) getJobDetails();
  }, [clientJobId]);

  const AddNotes = async () => {
    if (!notes.trim()) {
      Alert.alert("Please enter a note");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `https://sandbox-job-app.bosselt.com/api/v1/jobs/${job?._id}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            clientNoteId: Date.now().toString(),
            text: notes,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Error", result?.message || "Failed to add note");
        return;
      }

      setNotesList((prev) => [result.data, ...prev]);
      setNotes("");
    } catch (error) {
      console.log("Add Note Error =>", error);
      Alert.alert("Failed to add note");
    }
  };

  const updateNote = async (noteId: string) => {
    if (!editingNoteText.trim()) {
      Alert.alert("Enter note text");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `https://sandbox-job-app.bosselt.com/api/v1/jobs/${job?._id}/notes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            text: editingNoteText,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Error", result?.message);
        return;
      }

      setNotesList((prev) =>
        prev.map((note) => (note._id === noteId ? result.data : note))
      );

      setEditingNoteId(null);
      setEditingNoteText("");
      Alert.alert("Note updated");
    } catch (error) {
      console.log("Update Note Error", error);
    }
  };

  const pickVideo = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow media access to upload video"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const video = result.assets[0];

        // Add video to the list
        setSelectedVideos((prev) => [...prev, video]);

        // Optionally upload immediately
        uploadVideo(video);
      }
    } catch (error) {
      console.log("Video Picker Error =>", error);
    }
  };

  const uploadVideo = async (video: any) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Session expired", "Please login again");
        router.replace("/SignInScreen/SignInScreen");
        return;
      }

      const formData = new FormData();
      formData.append("image", {
        uri: video.uri,
        name: video.uri.split("/").pop(),
        type: "video/mp4",
      } as any);
      formData.append("clientVideoId", Date.now().toString());

      const response = await fetch(
        `https://sandbox-job-app.bosselt.com/api/v1/jobs/${job?._id}/site-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Error", result?.message || "Failed to upload video");
        return;
      }

      Alert.alert("Success", "Video uploaded successfully");
      console.log("Upload Result =>", result);
    } catch (error) {
      console.log("Upload Video Error =>", error);
      Alert.alert("Failed to upload video");
    }
  };

  return (
    <SafeAreaView style={CommonStyles.mainContainer}>
      <View style={{ backgroundColor: "#fff" }}>
        <HeaderScreen
          HeaderText={job?.title}
          BodyText={"Client Name"}
          backgroundColor="#fff"
          textColor="#0F172A"
          bodyColor="#64748B"
          showIcon
          handleBtn={() => router.back()}
          image={
            <TouchableOpacity
              style={styles.editView}
              onPress={() => {
                router.navigate({
                  pathname: "/CreateJobScreen/CreateJobScreen",
                  params: {
                    screenName: "EditDetails",
                    id: job?._id,
                  },
                });
              }}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          }
        />

        <View style={styles.tabContainer}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabItem, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={isActive ? "#2563EB" : "#64748B"}
                />

                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          paddingVertical: height * 0.01,
          height: height * 0.85,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: height * 0.12,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "overview" ? (
            <View>
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                style={styles.overViewHeader}
              >
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
                <View style={styles.row}>
                  <Image
                    source={require("../../assets/images/Header/dollerIcon.png")}
                    style={[styles.Icon2]}
                    contentFit="contain"
                    tintColor={"#FFF"}
                  />
                  <View>
                    <Text style={styles.text}>Total Budget</Text>
                    <Text style={styles.budget}>$ {job?.budget}</Text>
                  </View>
                </View>
              </LinearGradient>
              <View style={CommonStyles.rowContainer}>
                <View style={styles.Sideview}>
                  <View
                    style={[
                      styles.dollerIconView,
                      { backgroundColor: "#22C55E1A" },
                    ]}
                  >
                    <Image
                      source={require("../../assets/images/Header/location.png")}
                      style={[styles.Icon1]}
                      contentFit="contain"
                      tintColor={"#22C55E"}
                    />
                  </View>
                  <Text style={{ fontSize: 16, color: "#64748B" }}>
                    {job?.location}
                  </Text>
                  <Text
                    style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}
                  >
                    Client Name
                  </Text>
                </View>
                <View style={styles.Sideview}>
                  <View
                    style={[
                      styles.dollerIconView,
                      { backgroundColor: "#22C55E1A" },
                    ]}
                  >
                    <Image
                      source={require("../../assets/images/Header/location.png")}
                      style={[styles.Icon1]}
                      contentFit="contain"
                      tintColor={"#22C55E"}
                    />
                  </View>
                  <Text style={{ fontSize: 16, color: "#64748B" }}>
                    started
                  </Text>
                  <Text
                    style={{ fontSize: 18, color: "#000", fontWeight: "bold" }}
                  >
                    {formatDateTime(job?.createdAt)}
                  </Text>
                </View>
              </View>
              <View style={styles.overViewHeader1}>
                <View style={styles.row}>
                  <Image
                    source={require("../../assets/images/Header/fullName.png")}
                    style={{ height: 20, width: 20, marginRight: width * 0.02 }}
                    contentFit="contain"
                    tintColor={"#3B82F6"}
                  />
                  <Text style={styles.JobDetails}>Client Info</Text>
                </View>
                <Text
                  style={{
                    color: "#64748B",
                    fontSize: 16,
                    marginTop: height * 0.015,
                  }}
                >
                  Client Name
                </Text>
              </View>
              <View style={styles.overViewHeader1}>
                <Text style={styles.JobDetails}>Description</Text>
                <Text
                  style={{
                    color: "#64748B",
                    fontSize: 16,
                    marginTop: height * 0.015,
                  }}
                >
                  {job?.description}
                </Text>
              </View>
            </View>
          ) : activeTab === "notes" ? (
            <View>
              <View style={styles.overViewHeader1}>
                <InputField1
                  title=""
                  placeholder={"Add job description..."}
                  value={notes}
                  onChangeText={setNotes}
                  backgroundColor="#F1F5F9"
                  inputHeight={height * 0.12}
                  numberOfLines={3}
                  multiline={true}
                />
                <Pressable onPress={AddNotes}>
                  <LinearGradient
                    colors={["#3B82F6", "#2563EB"]}
                    style={styles.CreateView}
                  >
                    <Text style={CommonStyles.CreateText}>+ Add Note</Text>
                  </LinearGradient>
                </Pressable>
              </View>
              {notesList.length > 0 && (
                <View style={{ marginTop: height * 0.02 }}>
                  {notesList.map((item, index) => (
                    <View key={index} style={styles.noteCard}>
                      {editingNoteId === item._id ? (
                        <>
                          <InputField1
                            value={editingNoteText}
                            onChangeText={setEditingNoteText}
                            backgroundColor="#F1F5F9"
                            inputHeight={height * 0.1}
                            multiline
                          />
                          <Pressable onPress={() => updateNote(item._id)}>
                            <LinearGradient
                              colors={["#22C55E", "#16A34A"]}
                              style={styles.CreateView}
                            >
                              <Text style={CommonStyles.CreateText}>Save</Text>
                            </LinearGradient>
                          </Pressable>

                          <Pressable onPress={() => setEditingNoteId(null)}>
                            <Text style={{ color: "red", marginTop: 5 }}>
                              Cancel
                            </Text>
                          </Pressable>
                        </>
                      ) : (
                        <>
                          <Text style={styles.noteText}>{item.text}</Text>

                          <View
                            style={[
                              styles.row,
                              { justifyContent: "space-between" },
                            ]}
                          >
                            <Text style={styles.noteDate}>
                              {formatDateTime(item.createdAt)}
                            </Text>

                            <TouchableOpacity
                              onPress={() => {
                                setEditingNoteId(item._id);
                                setEditingNoteText(item.text);
                              }}
                            >
                              <Text style={{ color: "#2563EB" }}>Edit</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Pressable
                onPress={pickVideo}
                style={[
                  styles.overViewHeader1,
                  { alignItems: "center", paddingVertical: height * 0.08 },
                ]}
              >
                <View style={styles.uploadIconView}>
                  <Image
                    source={require("../../assets/images/Header/uploadIcon.png")}
                    style={[styles.Icon2]}
                    contentFit="contain"
                  />
                </View>
                <Text
                  style={[
                    styles.JobDetails,
                    { marginVertical: height * 0.015 },
                  ]}
                >
                  Upload Site Video
                </Text>
                <Text
                  style={{
                    color: "#64748B",
                    fontSize: 16,
                  }}
                >
                  Drag and drop or click to browse
                </Text>
              </Pressable>
              {selectedVideos.length > 0 ? (
                <View style={{ marginTop: height * 0.02 }}>
                  {selectedVideos.map((video, index) => (
                    <View key={index} style={styles.overViewHeader1}>
                      <VideoPlayer uri={video.uri} />/
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#0F172A",
                          marginBottom: 5,
                        }}
                      >
                        {video.uri.split("/").pop()}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View
                  style={[
                    styles.overViewHeader1,
                    { alignItems: "center", paddingVertical: height * 0.05 },
                  ]}
                >
                  <Ionicons
                    name={"videocam-outline"}
                    size={30}
                    color={"#64748B"}
                  />
                  <Text
                    style={{
                      color: "#64748B",
                      fontSize: 16,
                    }}
                  >
                    Drag and drop or click to browse
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

const VideoPlayer = ({ uri }: { uri: string }) => {
  return (
    <Video
      source={{ uri }}
      style={{ width: "100%", height: 200, borderRadius: 10 }}
      useNativeControls
      // resizeMode="contain"
    />
  );
};
