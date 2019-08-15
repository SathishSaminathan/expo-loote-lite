import React from "react";
import {
  createDrawerNavigator,
  DrawerItems,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
  Image,
  Text
} from "react-native";
import { connect } from "react-redux";
import { Constants } from "expo";
import { Feather, FontAwesome } from "@expo/vector-icons";

import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Colors from "../constants/ThemeConstants";
import StatusBar from "../components/StatusBar/StatusBar";
import ProductDetails from "../screens/ProductDetails";
import WebViewPage from "../screens/WebViewPage";
import Login from "../screens/auth/Login";
import LoadingScreen from "../screens/LoadingScreen";

import CameraScreen from "../screens/CameraScreen";
import Images from "../assets/images/images";
import Wishlist from "../screens/Wishlist";
import GadgetsUnder100 from "../components/GadgetsUnder100";
import GadgetsUnder500 from "../components/GadgetsUnder500";
import { CustomText } from "../../components/StyledText";

const { width, height } = Dimensions.get("window");

const CustomDrawerItems = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <StatusBar />
      <View
        style={{
          height: 150,
          justifyContent: "center",
          backgroundColor: Colors.primaryThemeColor
        }}
      >
        <View
          style={{
            padding: 10,
            paddingHorizontal: 15
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              overflow: "hidden"
            }}
          >
            <Image
              source={Images.logo}
              resizeMode="cover"
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <CustomText style={{ color: Colors.white, fontSize: 15 }}>
              Loot Everything
            </CustomText>
          </View>
          <View>
            <CustomText style={{ color: Colors.white, fontSize: 12 }}>
              Sathishcse1975@gmail.com
            </CustomText>
          </View>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const productStackNavigations = createStackNavigator(
  {
    Home: Home,
    ProductDetails: ProductDetails,
    WebViewPage: WebViewPage,
    CameraScreen: CameraScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const WishListStack = createStackNavigator(
  {
    WishList: Wishlist,
    ProductDetails: ProductDetails
  },
  {
    initialRouteName: "WishList",
    headerMode: "none"
  }
);
const AppDrawerNavigations = createDrawerNavigator(
  {
    Home: {
      screen: productStackNavigations,
      navigationOptions: {
        // title: "Search Videos",
        drawerIcon: ({ tintColor }) => (
          <Feather color={tintColor} name="home" style={{ fontSize: 20 }} />
        )
      }
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        // title: "Search Videos",
        drawerIcon: ({ tintColor }) => (
          <Feather color={tintColor} name="bell" style={{ fontSize: 20 }} />
        )
      }
    },
    ProductDetails: {
      screen: ProductDetails
    },
    Wishlist: {
      screen: WishListStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Feather color={tintColor} name="heart" style={{ fontSize: 20 }} />
        )
      }
    },
    "Gadgets Under 100": {
      screen: GadgetsUnder100,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesome
            color={tintColor}
            name="rupee"
            style={{ fontSize: 20 }}
          />
        )
      }
    },
    "Gadgets Under 500": {
      screen: GadgetsUnder500,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesome
            color={tintColor}
            name="rupee"
            style={{ fontSize: 20 }}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Gadgets Under 100",
    contentComponent: CustomDrawerItems,
    // unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: Colors.primaryThemeColor,
      activeBackgroundColor: Colors.white,
      inactiveBackgroundColor: Colors.white
      // activeLabelStyle:{fontSize:20,color:Colors.themeBlue},
    }
  }
);

const stackNavigations = createStackNavigator(
  {
    LoadingScreen: LoadingScreen,
    Login: Login,
    Home: AppDrawerNavigations
  },
  {
    initialRouteName: "LoadingScreen",
    headerMode: "none"
  }
);

const mapStateToProps = ({ user }) => {
  return {
    user: user.current_user
  };
};

const AppDrawerContainer = createAppContainer(AppDrawerNavigations);

export default connect(
  mapStateToProps,
  null
)(AppDrawerContainer);
