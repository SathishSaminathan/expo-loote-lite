import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import Colors from "../../constants/ThemeConstants";
import Images from "../../assets/images/images";
import AppConstants from "../../constants/AppConstants";
import { CustomText } from "../../../components/StyledText";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeaderOptions = (screen, title) => {
    const headerText = (
      <CustomText
        style={{
          color: Colors.secondaryColor,
          fontSize: 20
        }}
      >
        {screen}
      </CustomText>
    );
    if (this.props.back) {
      return (
        <>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather style={styles.iconStyle} name="arrow-left" />
          </TouchableOpacity>
          {headerText}
          <View style={{ width: 25, height: 25 }} />
        </>
      );
    }
    switch (screen) {
      case AppConstants.HOME:
        return (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather style={styles.iconStyle} name="menu" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("CameraScreen")}
            >
              <Image source={Images.logo} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Notification")}
            >
              <Feather style={styles.iconStyle} name="bell" />
            </TouchableOpacity>
          </>
        );
      case AppConstants.WISHLIST:
        return (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather style={styles.iconStyle} name="menu" />
            </TouchableOpacity>
            {headerText}
            <View style={{ width: 25, height: 25 }} />
          </>
        );
      case AppConstants.GADGETS_UNDER_100:
        return (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather style={styles.iconStyle} name="menu" />
            </TouchableOpacity>
            {headerText}
            <View style={{ width: 25, height: 25 }} />
          </>
        );
      case AppConstants.NOTIFICATION:
        return (
          <>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Feather style={styles.iconStyle} name="arrow-left" />
            </TouchableOpacity>
            {headerText}
            <View style={{ width: 25, height: 25 }} />
          </>
        );
      case AppConstants.PRODUCT_DETAILS:
        return (
          <>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Feather style={styles.iconStyle} name="arrow-left" />
            </TouchableOpacity>
            {headerText}
            <TouchableOpacity onPress={() => this.props.toggleMenu()}>
              <Feather style={styles.iconStyle} name="more-vertical" />
            </TouchableOpacity>
          </>
        );
      case AppConstants.PROFILE:
        return (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather style={styles.iconStyle} name="menu" />
            </TouchableOpacity>
            {headerText}
            <View style={{ width: 25, height: 25 }} />
          </>
        );
      default:
        return (
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Feather style={styles.iconStyle} name="menu" />
            </TouchableOpacity>
            {headerText}
            <View style={{ width: 25, height: 25 }} />
          </>
        );
    }
  };

  render() {
    const { screen, title } = this.props;
    const HeaderOptions = this.getHeaderOptions(screen, title);

    return <View style={styles.headerStyle}>{HeaderOptions}</View>;
  }
}

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    height: 60,
    backgroundColor: Colors.primaryThemeColor,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 10
  },
  iconStyle: {
    color: Colors.white,
    fontSize: 25
  }
});
