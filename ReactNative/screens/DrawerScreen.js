import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, View, Image, TouchableHighlight, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

import AvatarIcon from '../components/AvatarIcon';

export default class DrawerScreen extends Component {
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

  _onProfile = () => {
    console.log('_onProfile');
  }

  _onLanguage = () => {
    console.log('_onLanguage');
  }

  _onNation = () => {
    console.log('_onNation');
  }

  _onCity = () => {
    console.log('_onCity');
  }

  _onOrigin = () => {
    console.log('_onOrigin');
  }
  
  _onFood = () => {
    console.log('_onFood');
  }

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            {/* Profile section */}
            <View style={[styles.profileSectionHeader, {backgroundColor: Colors.drawerSectionHeader1}, {flex:1, flexDirection:'row'}]}>
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
            
            <View style={styles.profileSection}>
              {/* <Text style={Styles.navItemStyle} onPress={this._onPressHome}>
                1번 함수
              </Text> */}
              <AvatarIcon
                title="Profile"
                icon={{name: 'user', type: 'font-awesome'}} // https://fontawesome.com/
                imageSrc={require('../assets/icons/test/profile.png')}
                onPress={this._onProfile}
              />
              <AvatarIcon
                title="Language"
                icon={{name: 'language', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/language.png')}
                onPress={this._onLanguage}
              />
            </View>
            
            {/* Travel section */}
            <Text style={[styles.travelSectionHeader, {backgroundColor: Colors.drawerSectionHeader2}]}>
              Travel
            </Text>
            <View style={styles.travelSection}>
              <AvatarIcon
                title="Nation"
                icon={{name: 'globe', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/south-korea.png')}
                onPress={this._onNation}
              />
              <AvatarIcon
                title="City"
                icon={{name: 'plane', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/seoul.png')}
                onPress={this._onCity}
              />
              <AvatarIcon
                title="Origin"
                icon={{name: 'asterisk', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/jeju.png')}
                onPress={this._onOrigin}
              />
            </View>

            {/* FoodType section */}
            <Text style={[styles.foodSectionHeader, {backgroundColor: Colors.drawerSectionHeader3}]}>
              Food
            </Text>
            <View style={{flexDirection:'column'}}>
              <View style={styles.foodSection}>
                <AvatarIcon
                  title="Rice"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/rice.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  title="Noodle"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/noodles.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  title="Seafood"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/seafood.png')}
                  onPress={this._onFood}
                />
              </View>
              <View style={styles.foodSection}>
                <AvatarIcon
                  title="Meat"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/meat.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  title="Soup"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/soup.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  title="Vegetable"
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/vegetable.png')}
                  onPress={this._onFood}
                />
              </View>
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


const styles = StyleSheet.create({
  profileSectionHeader: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    marginTop: StatusBar.currentHeight,
    fontSize: 18
  }, 
  profileSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    // padding: 10,
    backgroundColor: 'white',
  }, 
  travelSectionHeader: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    fontSize: 18
  }, 
  travelSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  }, 
  foodSectionHeader: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    fontSize: 18
  }, 
  foodSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    // padding: 10,
    backgroundColor: 'white',
  }, 
});