import React, { Component } from "react";
import Colors from "../../constants/ThemeConstants";
import GadgetsUnderTemplate from "../shared/GadgetsUnderTemplate";
import { ProductServices } from "../../services/ProductServices";
import APIConstants from "../../constants/APIConstants";
import AppConstants from "../../constants/AppConstants";
import { Snackbar } from "react-native-paper";

export default class GadgetsUnder500 extends Component {
  _productServices = new ProductServices();
  state = {
    productsData: [],
    refreshing: true,
    dataLoaded: false,
    message: "",
    initialLoad: true
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
      p: 500
    };
    this._productServices
      .services(APIConstants.GET_PRODUCTS_UNDER_500, data)
      .then(res => {
        this.setState({
          productsData: res.data.sm,
          refreshing: false,
          dataLoaded: true,
          message: this.state.initialLoad
            ? "Loaded Successfully"
            : "You are viewing latest products",
          initialLoad: false
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

  render() {
    const { productsData, refreshing, message, dataLoaded } = this.state;
    return (
      <React.Fragment>
        <GadgetsUnderTemplate
          {...this.props}
          linearGradientColors={[
            Colors.primaryThemeColor,
            Colors.primaryThemeColor,
            Colors.primaryThemeColor,
            Colors.secondaryColor,
            Colors.secondaryColor
          ]}
          productsData={productsData}
          addToWishlistButtonColor={Colors.primaryDarkThemeColor}
          refreshing={refreshing}
          refreshFunc={this.fetchData}
          headerTitle={AppConstants.GADGETS_UNDER_500}
        />
        <Snackbar
          style={{ backgroundColor: Colors.primaryDarkThemeColor }}
          visible={dataLoaded}
          onDismiss={() => this.setState({ dataLoaded: false })}
          duration={2000}
          // action={{
          //   label: "Undo",
          //   onPress: () => {
          //     // Do something
          //   }
          // }}
        >
          {message}
        </Snackbar>
      </React.Fragment>
    );
  }
}
