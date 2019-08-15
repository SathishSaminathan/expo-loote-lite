import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import StatusBar from "../../../../components/shared/StatusBar";
import BrandTag from "../BrandTag";
import Header from "../../Header/Header";
import AppConstants from "../../../constants/AppConstants";
import PriceTag from "../PriceTag";
import Colors from "../../../constants/ThemeConstants";
import ShareComponent from "../../ShareComponent";

const { width, height } = Dimensions.get("window");

const PRODUCT_CARD_WIDTH = width / 2 - 30;
const PRODUCT_CARD_HEIGHT = 200;

export default class GadgetsUnderTemplate extends Component {
  state = {
    refreshing: this.props.refreshing
  };

  _onRefresh = () => {
    this.props.refreshFunc();
  };

  renderProducts = (productsData, addToWishlistButtonColor) => {
    let productTemplate = [];
    productsData.map((data, i) => {
      productTemplate.push(
        <Animatable.View
          key={i}
          animation={i % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
          delay={500}
          duration={200}
        >
          <TouchableOpacity
            activeOpacity={1}
            //   onPress={() => this.props.navigation.push("ProductDetails")}
            style={{
              width: PRODUCT_CARD_WIDTH,
              height: PRODUCT_CARD_HEIGHT,
              backgroundColor: Colors.white,
              marginVertical: 10,
              borderRadius: 5,
              overflow: "hidden"
            }}
          >
            <View
              style={{
                width: "100%",
                // height: "95%",
                position: "relative",
                padding: 5
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "flex-start"
                }}
              >
                <BrandTag
                  brand={data.s}
                  backgroundColor={addToWishlistButtonColor}
                />
                <ShareComponent
                  link={data.l}
                  color={addToWishlistButtonColor}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    width: 100,
                    height: 100
                  }}
                >
                  <Image
                    source={{ uri: data.i }}
                    style={{ flex: 1, width: null, height: null }}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{ color: Colors.grey, fontSize: 10 }}
                  numberOfLines={2}
                >
                  {data.n}
                </Text>
                <PriceTag price={data.p} />
              </View>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                // borderTopWidth: 1,
                backgroundColor: addToWishlistButtonColor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Feather
                color={Colors.white}
                name="heart"
                style={{ fontSize: 13 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 13,
                  paddingLeft: 5
                }}
              >
                Add to wishlist
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      );
    });

    return productTemplate;
  };

  render() {
    const {
      linearGradientColors,
      productsData,
      addToWishlistButtonColor,
      refreshing,
      headerTitle
    } = this.props;
    // console.log("refreshing", this.props)
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar />
        <Header {...this.props} screen={headerTitle} />
        <View
          style={{ padding: 10, paddingBottom: Constants.statusBarHeight * 4 }}
        >
          <Animatable.View animation="slideInUp" duration={500}>
            <LinearGradient
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              colors={linearGradientColors}
              style={{
                borderRadius: 10,
                elevation: 10,
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this._onRefresh}
                    colors={[
                      Colors.primaryDarkThemeColor,
                      Colors.secondaryColor,
                      Colors.like
                    ]}
                  />
                }
              >
                {this.renderProducts(productsData, addToWishlistButtonColor)}
              </ScrollView>
            </LinearGradient>
          </Animatable.View>
        </View>
      </View>
    );
  }
}
