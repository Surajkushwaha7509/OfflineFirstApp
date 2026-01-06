import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./HeaderStyle";
import { Image } from "expo-image";

type Props = {
  HeaderText: string;
  BodyText: string;
  bodyColor?: string;
  backgroundColor: string;
  textColor?: string;
  showIcon?: boolean;
  handleBtn: () => void;
  image?: React.ReactNode;
  HeaderfontSize?: number;
  bodyfontSize?: number;
};

const HeaderScreen: React.FC<Props> = ({
  HeaderText,
  BodyText,
  bodyColor = "#64748B",
  backgroundColor,
  textColor = "#0F172A",
  showIcon = false,
  image,
  handleBtn,
  HeaderfontSize = 22,
  bodyfontSize = 14,
}) => {
  return (
    <View style={[styles.HomeView, { backgroundColor }]}>
      <View style={styles.BackTextView}>
        {showIcon && (
          <Pressable onPress={handleBtn} style={styles.backView}>
            <Image
              source={require("../../assets/images/Header/backIcon.png")}
              style={styles.Icon1}
              contentFit="contain"
            />
          </Pressable>
        )}

        <View>
          <Text
            style={[
              styles.headerText,
              { color: textColor, fontSize: HeaderfontSize },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {HeaderText}
          </Text>

          <Text
            style={{ color: bodyColor, fontSize: bodyfontSize }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {BodyText}
          </Text>
        </View>
      </View>

      <View>{image}</View>
    </View>
  );
};

export default HeaderScreen;
