import React, { Component } from "react";
import { View, Dimensions, Text, Image } from "react-native";

import { CustomText } from "../../../components/StyledText";
import { Colors } from "react-native-paper";

const { width, height } = Dimensions.get("window");

class SelectByCategory extends Component {
  renderCategories = () => {
    let template = [];
    for (let i = 0; i < 4; i++) {
      template.push(
        <View
          style={{
            width: width / 2 - 10,
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
          key={i}
        >
          <View
            style={{
              width: "90%",
              height: "90%",
              //   borderWidth: 1,
              borderRadius: 5,
              backgroundColor: Colors.white,
              elevation: 5
            }}
          >
            <View style={{ flex: 3, padding: 10 }}>
              <Image
                style={{ flex: 1, width: null, height: null }}
                source={{
                  uri: "https://i.ytimg.com/vi/c34bhOtpOJI/hqdefault.jpg"
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <CustomText>Fun Gadgets</CustomText>
            </View>
          </View>
        </View>
      );
    }
    return template;
  };
  render() {
    return (
      <View style={{ paddingTop: 10 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <CustomText
            style={{
              fontSize: 20,
              textDecorationLine: "underline"
            }}
          >
            Select By Category
          </CustomText>
        </View>
        <View
          style={{
            marginHorizontal: 5,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 5
          }}
        >
          {this.renderCategories()}
        </View>
      </View>
    );
  }
}

export default SelectByCategory;
