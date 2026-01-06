import { Image } from "expo-image";
import { Pressable, Text, TextInput, View } from "react-native";
import { CommonStyles } from "./CommonStyle";
import { height as screenHeight } from "@/components/config";

export const InputField = ({
  image,
  placeholder,
  value,
  onChangeText,
  showPassword = false,
  handleShowPassword = () => {},
  backgroundColor = "#fff",
}: {
  image: any;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  showPassword?: boolean;
  handleShowPassword?: () => void;
  backgroundColor?: string;
}) => {
  return (
    <View
      style={[
        CommonStyles.InputMainView,
        { backgroundColor: backgroundColor, borderRadius: 20 },
      ]}
    >
      <Image
        source={image}
        style={CommonStyles.imageIcon}
        contentFit="contain"
      />
      <TextInput
        style={CommonStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#0F172A8050"
      />
      {showPassword && (
        <Pressable onPress={handleShowPassword}>
          <Image
            source={require("../assets/images/Header/forgetshow.png")}
            style={CommonStyles.imageIcon}
            contentFit="contain"
          />
        </Pressable>
      )}
    </View>
  );
};

export const InputField1 = ({
  image="",
  title,
  placeholder,
  value,
  onChangeText,
  backgroundColor = "#F1F5F9",
  inputHeight = screenHeight * 0.07,
  numberOfLines = 1,
  multiline = false,
}: {
  image?: any;
  title?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  backgroundColor?: string;
  inputHeight?: number;
  numberOfLines?: number;
  multiline?: boolean;
}) => {
  return (
    <View style={{ marginBottom: screenHeight * 0.01 }}>
      {title && <Text style={CommonStyles.JobTitle}>{title}</Text>}

      <View
        style={[
          CommonStyles.InputMainView1,
          {
            backgroundColor,
            borderRadius: 20,
            height: inputHeight, // ✅ FIXED
          },
        ]}
      >
        {image && (
          <Image
            source={image}
            style={CommonStyles.imageIcon}
            contentFit="contain"
          />
        )}

        <TextInput
          style={[CommonStyles.input, { height: inputHeight }]}
          placeholder={placeholder}
          value={value}
          numberOfLines={numberOfLines}
          onChangeText={onChangeText}
          placeholderTextColor="#0F172A8050"
          multiline={multiline}
        />
      </View>
    </View>
  );
};
