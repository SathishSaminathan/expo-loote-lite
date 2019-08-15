import React, { Component } from "react";
import { View } from "react-native";
import Constants from "expo-constants";
import Colors from "../../constants/ThemeConstants";


export default class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: Colors.primaryDarkThemeColor,
        }}
      />
    );
  }
}
