import React, { Component } from "react";
import GadgetsUnderTemplate from "../shared/GadgetsUnderTemplate";
import Colors from "../../constants/ThemeConstants";
import { ProductServices } from "../../services/ProductServices";
import APIConstants from "../../constants/APIConstants";

export default class GadgetsUnder100 extends Component {
  _productServices = new ProductServices();
  state = {
    productsData: [],
    refreshing: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      refreshing: true
    });
    const data = {
      p: 100
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
    console.log("refreshing", refreshing)
    return (
      <GadgetsUnderTemplate
        {...this.props}
        linearGradientColors={[
          "#f74e7f",
          "#f74e7f",
          "#f74e7f",
          "#f87b48",
          "#f87b48"
        ]}
        productsData={productsData}
        addToWishlistButtonColor={Colors.like}
        refreshing={refreshing}
      />
    );
  }
}
