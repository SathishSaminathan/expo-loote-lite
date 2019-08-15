import React, { Component } from "react";
import { TouchableOpacity, Share } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/ThemeConstants";

class ShareComponent extends Component {
  shareFuntion(link) {
    try {
      const result = Share.share({
        message: link
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  render() {
    const { link, color } = this.props;
    return (
      <TouchableOpacity onPress={() => this.shareFuntion(link)}>
        <Feather
          style={{
            color: color,
            fontSize: 20
          }}
          name="share-2"
        />
      </TouchableOpacity>
    );
  }
}

export default ShareComponent;

ShareComponent.defaultProps = {
  color: Colors.primaryThemeColor
};
