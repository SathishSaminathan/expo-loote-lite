import React, { Component } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";

import BrandTag from "../BrandTag";
import PriceTag from "../PriceTag";
import ShareComponent from "../../ShareComponent";
import StatusBar from "../../StatusBar/StatusBar";
import Header from "../../Header/Header";
import Colors from "../../../constants/ThemeConstants";
import PullToRefresh from "../PullToRefresh";
import { ProductServices } from "../../../services/ProductServices";
import APIConstants from "../../../constants/APIConstants";
import { CustomText } from "../../../../components/StyledText";
import { Snackbar } from "react-native-paper";
import AppConstants from "../../../constants/AppConstants";

const { width, height } = Dimensions.get("window");

const PRODUCT_CARD_WIDTH = width / 2 - 30;
const PRODUCT_CARD_HEIGHT = 200;
const colorArray = [Colors.like, Colors.primaryThemeColor];

class ViewTemplate extends Component {
  _productServices = new ProductServices();
  state = {
    productsData: [],
    refreshing: true,
    dataLoaded: false,
    message: "",
    initialLoad: true,
    addToWishlistButtonColor:
      colorArray[Math.floor(Math.random() * (1 - 0 + 1) + 0)]
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      refreshing: true,
      dataLoaded: false
    });
    const data = {
      p: 100
    };
    this._productServices
      .services(APIConstants.GET_PRODUCTS_UNDER_500, data)
      .then(res => {
        console.log("res", res.data);
        this.setState({
          // productsData: res.data.sm,
          productsData: res.data,
          refreshing: false,
          dataLoaded: true,
          message: this.state.initialLoad
            ? "Loaded Successfully"
            : "You are viewing latest products",
          initialLoad: false,
          addToWishlistButtonColor:
            colorArray[Math.floor(Math.random() * (1 - 0 + 1) + 0)]
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          refreshing: false,
          dataLoaded: true,
          message: "Something went wrong"
        });
      });
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
            onPress={() =>
              this.props.navigation.push(AppConstants.PRODUCT_DETAILS, {
                productsData: data
              })
            }
            style={{
              width: PRODUCT_CARD_WIDTH,
              height: PRODUCT_CARD_HEIGHT,
              backgroundColor: Colors.white,
              marginVertical: 10,
              borderRadius: 5,
              overflow: "hidden",
              elevation: 5
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
                <CustomText
                  style={{ color: Colors.grey, fontSize: 10 }}
                  numberOfLines={2}
                >
                  {data.n}
                </CustomText>
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
              <CustomText
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 13,
                  paddingLeft: 5
                }}
              >
                Add to wishlist
              </CustomText>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      );
    });

    return productTemplate;
  };

  render() {
    const {
      productsData,
      refreshing,
      dataLoaded,
      message,
      addToWishlistButtonColor
    } = this.state;
    const linearGradientColors = [
      "#f74e7f",
      "#f74e7f",
      "#f74e7f",
      "#f87b48",
      "#f87b48"
    ];

    return (
      <View>
        <StatusBar />
        <Header
          {...this.props}
          screen={this.props.navigation.getParam("screen")}
          back
        />
        <PullToRefresh color={addToWishlistButtonColor} />
        <View
          style={{ padding: 10, paddingBottom: Constants.statusBarHeight * 4 }}
        >
          <Animatable.View animation="slideInUp" duration={500}>
            <View
              //   start={{ x: 0, y: 0.75 }}
              //   end={{ x: 1, y: 0.25 }}
              //   colors={linearGradientColors}
              style={{
                borderRadius: 10,
                // elevation: 10,
                paddingHorizontal: 10,
                paddingBottom: Constants.statusBarHeight * 6
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  minHeight: 200,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.fetchData}
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
            </View>
          </Animatable.View>
        </View>
        <Snackbar
          style={{ backgroundColor: addToWishlistButtonColor }}
          visible={dataLoaded}
          onDismiss={() => this.setState({ dataLoaded: false })}
          duration={1000}
          // action={{
          //   label: "Undo",
          //   onPress: () => {
          //     // Do something
          //   }
          // }}
        >
          {message}
        </Snackbar>
      </View>
    );
  }
}

export default ViewTemplate;
