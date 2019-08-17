import axios from "axios";
import APIConstants from "../../constants/APIConstants";

export class ProductServices {
  services(type, data) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    switch (type) {
      case APIConstants.GET_PRODUCTS_UNDER_500:
        // return axios.post(`${APIConstants.API_URL}/product/getGadgets`, data, config);
        return axios.get("https://api.myjson.com/bins/cokwz")
      default:
        return;
    }
  }
}
