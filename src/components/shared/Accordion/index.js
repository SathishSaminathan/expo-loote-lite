import React, { Component } from "react";
import { List } from "react-native-paper";
import Colors from "../../../constants/ThemeConstants";

class Accordion extends Component {
  state = {
    expanded: false
  };
  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  _renderList = data => {
    let template = [];
    data.map((data, i) => {
      template.push(
        <List.Item
          title={data}
          left={props => (
            <List.Icon {...props} icon="star" color={Colors.secondaryColor} />
          )}
          key={i}
        />
      );
    });
    return template;
  };
  render() {
    const { title, data } = this.props;
    const { expanded } = this.state;
    return (
      <>
        <List.Accordion
          title={title}
          left={props => (
            <List.Icon {...props} icon={!expanded ? "add-circle" : "remove"} />
          )}
          expanded={expanded}
          onPress={this._handlePress}
        >
          {this._renderList(data)}
        </List.Accordion>
      </>
    );
  }
}

export default Accordion;
