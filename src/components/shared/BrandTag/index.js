import React from "react";
import { Text, View } from "react-native";

import Colors from "../../../constants/ThemeConstants";

const BrandTag = ({ brand, backgroundColor, color }) => {
  return (
    <View
      style={{
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: backgroundColor,
        alignSelf: "flex-start"
      }}
    >
      <Text
        style={{
          color: color,
          fontSize: 7
        }}
      >
        {brand}
      </Text>
    </View>
  );
};

export default BrandTag;

BrandTag.defaultProps = {
  backgroundColor: Colors.primaryThemeColor,
  color: Colors.white
};
