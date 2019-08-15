import React, { Component } from "react";
import GadgetsUnderTemplate from "../shared/GadgetsUnderTemplate";
import Colors from "../../constants/ThemeConstants";
import { ProductServices } from "../../services/ProductServices";
import APIConstants from "../../constants/APIConstants";
import AppConstants from "../../constants/AppConstants";
import { Snackbar } from "react-native-paper";

export default class GadgetsUnder100 extends Component {
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
      p: 100
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
            "#f74e7f",
            "#f74e7f",
            "#f74e7f",
            "#f87b48",
            "#f87b48"
          ]}
          productsData={productsData}
          addToWishlistButtonColor={Colors.like}
          refreshing={refreshing}
          refreshFunc={this.fetchData}
          headerTitle={AppConstants.GADGETS_UNDER_100}
        />
        <Snackbar
          style={{ backgroundColor: Colors.like }}
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
      </React.Fragment>
    );
  }
}
