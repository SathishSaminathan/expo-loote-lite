import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { Feather, FontAwesome } from "@expo/vector-icons";

import Colors from "../../constants/ThemeConstants";
import ShareComponent from "../../components/ShareComponent";
import { CustomText } from "../../../components/StyledText";
import PriceTag from "../../components/shared/PriceTag";
import Accordion from "../../components/shared/Accordion";

const { width, height } = Dimensions.get("window");

const HEADER_HEIGHT = 60;

const productData = {
  b: "Looterrrrrrrrr",
  f: ["Feature1", "Feature2", "Feature3"],
  i: "https://images-na.ssl-images-amazon.com/images/I/71yomw7uPmL._SX679_.jpg",
  l: "https://amzn.to/2INiHU2",
  n:
    "Tamatina Pub G Laptop Skins for 15.6 inch Laptop - HD Quality - Dell-Lenovo-HP-Acer - LP1",
  p: "249.00",
  s: "Amazon"
};

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      menuOpened: false,
      isLiked: true,
      // productData: this.props.navigation.getParam("productsData")
      productData: productData
    };
  }

  handleLike = () => {
    this.setState(prevState => ({ isLiked: !prevState.isLiked }));
    console.log(this.state.isLiked);
  };

  static navigationOptions = {
    drawerLabel: () => null
  };

  toggleMenu = () => {
    const { menuOpened } = this.state;
    if (menuOpened) {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500
      }).start();
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500
      }).start();
    }
  };

  render() {
    const { menuOpened, productData } = this.state;
    console.log("productData", productData);

    const translateY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 100]
    });

    const backgroundOpacity = this.animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 0.5]
    });

    const menuOpacity = this.animatedValue.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0, 1]
    });

    const backgroundZIndex = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-1, 1]
    });

    return (
      <View style={styles.productDetailsContainer}>
        <View
          style={{
            top: 0,
            height: Constants.statusBarHeight,
            backgroundColor: Colors.primaryDarkThemeColor
          }}
        />
        <View
          style={{
            height: HEADER_HEIGHT,
            width: width,
            backgroundColor: Colors.primaryThemeColor,
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            top: Constants.statusBarHeight,
            zIndex: 3
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Feather style={styles.iconStyle} name="arrow-left" />
          </TouchableOpacity>
          <CustomText
            style={{
              color: Colors.secondaryColor,
              fontSize: 20,
              maxWidth: Math.floor(width / 2)
            }}
            numberOfLines={1}
          >
            {productData.n}
          </CustomText>
          <TouchableOpacity
            onPress={() =>
              this.setState({ menuOpened: !this.state.menuOpened }, () =>
                this.toggleMenu()
              )
            }
          >
            <Feather style={styles.iconStyle} name="more-vertical" />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            {
              zIndex: 2,
              position: "absolute",
              height: 80,
              width: width,
              top: -20,
              left: 0,
              flex: 1,
              flexDirection: "row",
              translateY,
              opacity: menuOpacity
            }
          ]}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ShareComponent link={"https://amzn.to/2INiHU2"} />
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.menuButtons}>
            <TouchableOpacity
              style={styles.itemStyles}
              onPress={this.handleLike}
            >
              <FontAwesome
                name="heart"
                style={[
                  { fontSize: 25 },
                  this.state.isLiked
                    ? { color: Colors.like }
                    : { color: Colors.grey }
                ]}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: "black",
              position: "absolute",
              bottom: 0,
              height: height - 80,
              width: width,
              opacity: backgroundOpacity,
              zIndex: backgroundZIndex
            }
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              menuOpened &&
                this.setState({ menuOpened: !this.state.menuOpened }, () =>
                  this.toggleMenu()
                );
            }}
          />
        </Animated.View>
        <View style={{ marginTop: HEADER_HEIGHT }}>
          <ScrollView contentContainerStyle={{ paddingBottom: HEADER_HEIGHT }}>
            <Text style={styles.productName}>{productData.n}</Text>
            <View style={{ width: "100%", height: 300 }}>
              <Image
                source={{
                  uri: productData.i
                }}
                style={{
                  width: null,
                  height: null,
                  flex: 1,
                  paddingHorizontal: 10
                }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: 40
                }}
              >
                <PriceTag price={productData.p} />
              </Text>
            </View>
            <Accordion title="Features" data={productData.f} />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.primaryThemeColor,
                borderRadius: 20,
                marginHorizontal: 10
              }}
              // onPress={() => this.props.navigation.push("WebViewPage")}
              onPress={() =>
                WebBrowser.openBrowserAsync("https://amzn.to/2INiHU2")
              }
            >
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  textAlign: "center"
                }}
              >
                See More and Buy With Amazon
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProductDetails;

const styles = StyleSheet.create({
  productDetailsContainer: {
    flex: 1
  },
  menuButtons: {
    backgroundColor: "white",
    flex: 1
  },
  itemStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  iconStyle: {
    color: Colors.white,
    fontSize: 25
  },
  productName: {
    fontSize: 22,
    color: Colors.black,
    paddingHorizontal: 10
  }
});
