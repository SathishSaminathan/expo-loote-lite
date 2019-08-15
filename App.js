/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import LoadingScreen from "./src/screens/LoadingScreen";
import store from "./src/store";
import Dummy from "./src/screens/DummyScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: null,
      isFontLoaded: false,
      user: null
    };
  }

  componentWillMount() {
    this.loadFonts();
  }
  componentDidMount() {
    this.loadFonts();
  }

  loadFonts = async () => {
    await Font.loadAsync({
      "Lato-Regular": require("./src/assets/fonts/Lato/Lato-Bold.ttf"),
      "Lato-Bold": require("./src/assets/fonts/Lato/Lato-Bold.ttf"),
      "Lato-Italic": require("./src/assets/fonts/Lato/Lato-Italic.ttf"),
      "Lato-BoldItalic": require("./src/assets/fonts/Lato/Lato-BoldItalic.ttf")
    });
    this.setState({
      isFontLoaded: true
    });
  };

  render() {
    const { isFontLoaded } = this.state;

    if (!isFontLoaded) {
      return <LoadingScreen/>;
    }

    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Dummy />
        </Provider>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
