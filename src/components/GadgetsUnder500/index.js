import React, { Component } from "react";
import Colors from "../../constants/ThemeConstants";
import GadgetsUnderTemplate from "../shared/GadgetsUnderTemplate";
import { ProductServices } from "../../services/ProductServices";
import APIConstants from "../../constants/APIConstants";

export default class GadgetsUnder500 extends Component {
  _productServices = new ProductServices();
  state = {
    productsData: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const data = {
      p: 500
    };
    this._productServices
      .services(APIConstants.GET_PRODUCTS_UNDER_500, data)
      .then(res => {
        this.setState({
          productsData: res.data.sm
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  render() {
    const { productsData } = this.state;
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
      />
    );
  }
}
