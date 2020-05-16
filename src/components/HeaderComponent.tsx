import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

/**Constants */
import { COLORS } from "../constants/Colors";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");

/**Icons */
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({
  title,
  iconName,
  iconColor,
  titleColor,
  iconSize,
  titleSize,
}: any) {
  return (
    <View style={Styles.header}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
      <Text
        style={{
          color: titleColor,
          fontWeight: "bold",
          fontSize: titleSize,
          paddingStart: 5,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.header,
    width: width,
    height: height / 16,
    marginTop: Constants.statusBarHeight,
  },
});
