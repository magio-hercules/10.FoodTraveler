import React from 'react';
import { View, Text } from 'react-native';

export default class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  // componentDidMount() {
  //   console.log("util componentDidMount");
  //   const { language } = this.props;

  //   this.translateTabBarLabels(language);
  // }

  // componentWillUpdate(nextProps) {
  //   console.log("util componentWillUpdate");
  //   const {
  //     language: prevLang
  //   } = this.props;

  //   const {
  //     language: nextLang
  //   } = nextProps;

  //   if (prevLang !== nextLang) {
  //     this.translateTabBarLabels(nextLang);
  //   }
  // }

  // translateTabBarLabels = (language = 'en') => {
  //   console.log("util translateTabBarLabels");
  //   const { navigation: { setParams }} = this.props;

  //   // update dynamically tabBarLabel
  //   setParams({
  //     // tabBarLabel: translate('MANDATORY_FIELDS', language)
  //     tabBarLabel: "test"
  //   });
  // }

  render() {
    return (
      <View>
        <Text> 추후 제공 예정 </Text>
      </View>
    );
  }
}
