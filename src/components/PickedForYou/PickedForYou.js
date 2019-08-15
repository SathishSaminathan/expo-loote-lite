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

import Colors from "../../constants/ThemeConstants";
import PriceTag from "../shared/PriceTag";
import BrandTag from "../shared/BrandTag";
import ShareComponent from "../ShareComponent";

const { width, height } = Dimensions.get("window");
const PRODUCT_CARD_WIDTH = width / 2 - 18;
const PRODUCT_CARD_HEIGHT = 200;

const PickedForYouData = [
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71yomw7uPmL._SX679_.jpg",
    name:
      "Tamatina Pub G Laptop Skins for 15.6 inch Laptop - HD Quality - Dell-Lenovo-HP-Acer - LP1",
    link: "https://amzn.to/2INiHU2",
    price: "₹ 249.00"
  },
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71yomw7uPmL._SX679_.jpg",
    name:
      "Tamatina Pub G Laptop Skins for 15.6 inch Laptop - HD Quality - Dell-Lenovo-HP-Acer - LP1",
    link: "https://amzn.to/2INiHU2",
    price: "₹ 249.00"
  },
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71yomw7uPmL._SX679_.jpg",
    name:
      "Tamatina Pub G Laptop Skins for 15.6 inch Laptop - HD Quality - Dell-Lenovo-HP-Acer - LP1",
    link: "https://amzn.to/2INiHU2",
    price: "₹ 249.00"
  },
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71yomw7uPmL._SX679_.jpg",
    name:
      "Tamatina Pub G Laptop Skins for 15.6 inch Laptop - HD Quality - Dell-Lenovo-HP-Acer - LP1",
    link: "https://amzn.to/2INiHU2",
    price: "₹ 249.00"
  }
];

class PickedForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pickedForYouProduct = () => {
    let productTemplate = [];

    PickedForYouData.map((data, i) => {
      productTemplate.push(
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => WebBrowser.openBrowserAsync(data.link)}
          onPress={() => this.props.navigation.push("ProductDetails")}
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
    const { fontLoaded } = this.props;

    return (
      <>
        <View
          style={{
            padding: 10,
            alignItems: "center"
          }}
        >
          {fontLoaded && (
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Lato-BoldItalic",
                textDecorationLine: "underline"
              }}
            >
              Picked For You
            </Text>
          )}
        </View>
        <View
          style={{
            margin: 5
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={[
              Colors.primaryThemeColor,
              Colors.primaryThemeColor,
              Colors.primaryThemeColor,
              Colors.secondaryColor,
              Colors.secondaryColor
            ]}
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
              {fontLoaded && this.pickedForYouProduct()}
            </View>
          </LinearGradient>
        </View>
      </>
    );
  }
}

export default PickedForYou;
