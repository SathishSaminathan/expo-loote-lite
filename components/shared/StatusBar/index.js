import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

const StatusBar = () => {
  return <View style={{ height: StatusBarHeight, backgroundColor: "red" }} />;
};

export default StatusBar;
