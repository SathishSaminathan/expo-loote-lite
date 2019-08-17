import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { CustomText } from "../../../../components/StyledText";
import Colors from "../../../constants/ThemeConstants";

const PullToRefresh = ({ color }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        overflow: "hidden"
      }}
    >
      <Animatable.View animation="slideInDown" iterationCount={2} delay={1000}>
        <Feather name="arrow-down" style={{ fontSize: 20, color: color }} />
      </Animatable.View>
      <CustomText style={{ color: color }}>Pull Down to Refresh</CustomText>
    </View>
  );
};

export default PullToRefresh;

PullToRefresh.defaultProps = {
  color: Colors.red
};
