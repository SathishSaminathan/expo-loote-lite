import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Share
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import Colors from "../../../constants/ThemeConstants";
import ShareComponent from "../../ShareComponent";
import BrandTag from "../BrandTag";
import PriceTag from "../PriceTag";
import { CustomText } from "../../../../components/StyledText";
import AppConstants from "../../../constants/AppConstants";

const { width, height } = Dimensions.get("window");
const PRODUCT_CARD_WIDTH = width / 2 - 18;
const PRODUCT_CARD_HEIGHT = 200;

class HomeProductsTemplate extends Component {
  pickedForYouProduct = productsData => {
    let productTemplate = [];
    productsData.map((data, i) => {
      productTemplate.push(
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.push(AppConstants.PRODUCT_DETAILS)
          }
          style={{
            width: PRODUCT_CARD_WIDTH,
            height: PRODUCT_CARD_HEIGHT,
            backgroundColor: Colors.white,
            marginTop: 10,
            borderRadius: 5,
            padding: 5
          }}
          key={i}
        >
          <View
            style={{
              width: "100%",
              height: "95%"
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "flex-start"
              }}
            >
              <BrandTag brand="Amazon" />
              <ShareComponent link={data.link} />
            </View>
            <Image
              source={{ uri: data.image }}
              style={{ flex: 1, width: null, height: null }}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{ color: Colors.grey, paddingBottom: 4 }}
                numberOfLines={2}
              >
                {data.name}
              </Text>
              <PriceTag price={data.price} />
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return productTemplate;
  };
  render() {
    const { productsData, title, linearGradientColors } = this.props;
    return (
      <React.Fragment>
        <View
          style={{
            padding: 10,
            alignItems: "center"
          }}
        >
          <CustomText
            style={{
              fontSize: 20,
              textDecorationLine: "underline"
            }}
          >
            {title}
          </CustomText>
        </View>
        <View
          style={{
            margin: 5
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={linearGradientColors}
            style={{
              borderRadius: 10,
              elevation: 10,
              paddingHorizontal: 10,
              paddingBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between"
              }}
            >
              {this.pickedForYouProduct(productsData)}
            </View>
          </LinearGradient>
        </View>
      </React.Fragment>
    );
  }
}

export default HomeProductsTemplate;
