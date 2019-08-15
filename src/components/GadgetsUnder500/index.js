import React, { Component } from "react";
import Colors from "../../constants/ThemeConstants";
import GadgetsUnderTemplate from "../shared/GadgetsUnderTemplate";
import { ProductServices } from "../../services/ProductServices";
import APIConstants from "../../constants/APIConstants";
import AppConstants from "../../constants/AppConstants";

export default class GadgetsUnder500 extends Component {
  _productServices = new ProductServices();
  state = {
    productsData: [],
    refreshing: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      refreshing: true
    });
    const data = {
      p: 500
    };
    this._productServices
      .services(APIConstants.GET_PRODUCTS_UNDER_500, data)
      .then(res => {
        this.setState({
          productsData: res.data.sm,
          refreshing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          refreshing: false
        });
      });
  };

  render() {
    const { productsData, refreshing } = this.state;
    return (
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
    );
  }
}
