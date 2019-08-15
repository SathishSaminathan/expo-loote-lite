import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";
import Colors from "../../../src/constants/ThemeConstants";

const StatusBarHeight = Constants.statusBarHeight;

const StatusBar = () => {
  return (
    <View
      style={{
        height: StatusBarHeight,
        backgroundColor: Colors.primaryDarkThemeColor
      }}
    />
  );
};

export default StatusBar;
