import React from "react";
import { Text } from "react-native";

// export function MonoText(props) {
//   return (
//     <Text {...props} style={[props.style, { fontFamily: 'Lato-BoldItalic' }]} />
//   );
// }
export const CustomText = props => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Lato-BoldItalic" }]} />
  );
};
