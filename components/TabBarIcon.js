import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={props.focused ? 40 : 20}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
