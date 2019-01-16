import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Image, TouchableHighlight } from 'react-native';
import { DrawerActions } from 'react-navigation';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    console.log('navigateToScreen');
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  _onPressHome = () => {
    console.log('_onPressHome');
  }

  _onPressShutdown = () => {
    console.log('_onPressShutdown');
    // this.setState({
    //   count: this.state.count+1
    // })
  }

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            {/* Profile section */}
            <View style={[Styles.sectionHeadingStyle, {backgroundColor: Colors.drawerSectionHeader1}, {flex:1, flexDirection:'row'}]}>
              <View style={[{color: Colors.WHITE}, {flex:1, flexDirection:'column'}]}>
                <Text style={[{color: Colors.WHITE}, {fontSize: 18}]}>
                  김종민
                </Text>
                <Text style={[{color: Colors.WHITE}]}>
                  kjmhercules@gmail.com
                </Text>
              </View>
              <TouchableHighlight style={{ width: 40, height: 40, marginLeft: 0, marginTop: 0, alignSelf:'center', padding: 10 }}
                                  onPress={this._onPressShutdown}
                                  underlayColor='#ada'>
                <Image source={require('../assets/icons/shutdown.png')}
                      style={[{ width: 30, height: 30, marginLeft: -4, marginTop: -4 }]}
                      />
              </TouchableHighlight>
            </View>
            
            <View >
              <Text style={Styles.navItemStyle} onPress={this._onPressHome}>
                1번 함수
              </Text>
            </View>
            
            {/* TravelPlace section */}
            <Text style={[Styles.sectionHeadingStyle, {backgroundColor: Colors.drawerSectionHeader2}]}>
              Travel Place
            </Text>
            <View >
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Food')}>
                Food
              </Text>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
            </View>

            {/* FoodType section */}
            <Text style={[Styles.sectionHeadingStyle, {backgroundColor: Colors.drawerSectionHeader3}]}>
              Food Type
            </Text>
            <View >
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('List')}>
              List
              </Text>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Tile')}>
              Tile
              </Text>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Card')}>
              Card
              </Text>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Profile')}>
              Profile
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;
