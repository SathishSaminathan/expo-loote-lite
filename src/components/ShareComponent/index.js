import React, { Component } from "react";
import { View, Text, Share } from "react-native";

class ShareComponent {
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
}

export default ShareComponent;
