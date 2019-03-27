import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, View, Image, TouchableHighlight, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Language from '../constants/Language';

import AvatarIcon from '../components/AvatarIcon';





export default class DrawerScreen extends Component {
  constructor(props){
    super(props);
    console.log("DrawerScreen constructor");

  }
  

  // navigateToScreen = (route) => () => {
  //   console.log('navigateToScreen');
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  //   this.props.navigation.dispatch(DrawerActions.closeDrawer())
  // }

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
    console.log('call _onProfile');
    // console.log('call _onProfile : index(' + index + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Profile",
      params: {
        profile_id: "1",
      }
    });
    this.props.navigation.dispatch(navigateAction);
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
    console.log('call _onFood');
    // console.log('call _onProfile : index(' + index + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Filter",
      params: {
        profile_id: "1",
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.defaultFont}>
        <ScrollView>
          <View>
            {/* Profile section */}
            <View style={[styles.profileSectionHeader, {backgroundColor: Colors.drawerSectionHeader1}, {flex:1, flexDirection:'row'}]}>
              <View style={[{color: Colors.WHITE}, {flex:1, flexDirection:'column'}]}>
                <Text style={[styles.profileSectionHeaderText, {color: Colors.WHITE}, {fontSize: 18}]}>
                  {/* 김종민 */}
                  장영훈
                </Text>
                <Text style={[styles.profileSectionHeaderText, {color: Colors.WHITE}]}>
                  {/* kjmhercules@gmail.com */}
                  cool0huny@naver.com
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
                // title="Profile"
                title={Language.Profile[global.language]}
                icon={{name: 'user', type: 'font-awesome'}} // https://fontawesome.com/
                imageSrc={require('../assets/icons/test/profile.png')}
                onPress={this._onProfile}
              />
              <AvatarIcon
                // title="Language"
                title={Language.Language[global.language]}
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
                // title="Nation"
                title={Language.Nation[global.language]}
                icon={{name: 'globe', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/south-korea.png')}
                onPress={this._onNation}
              />
              <AvatarIcon
                // title="City"
                title={Language.City[global.language]}
                icon={{name: 'plane', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/seoul.png')}
                onPress={this._onCity}
              />
              {/* <AvatarIcon
                // title="Origin"
                icon={{name: 'asterisk', type: 'font-awesome'}}
                imageSrc={require('../assets/icons/test/jeju.png')}
                onPress={this._onOrigin}
              /> */}
            </View>

            {/* FoodType section */}
            <Text style={[styles.foodSectionHeader, {backgroundColor: Colors.drawerSectionHeader3}]}>
              Food
            </Text>
            <View style={{flexDirection:'column'}}>
              <View style={styles.foodSection}>
                <AvatarIcon
                  // title="Rice"
                  title={Language.Rice[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/rice.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  // title="Noodle"
                  title={Language.Noodle[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/noodles.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  // title="Seafood"
                  title={Language.Seafood[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/seafood.png')}
                  onPress={this._onFood}
                />
              </View>
              <View style={styles.foodSection}>
                <AvatarIcon
                  // title="Meat"
                  title={Language.Meat[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/meat.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  // title="Soup"
                  title={Language.Soup[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/soup.png')}
                  onPress={this._onFood}
                />
                <AvatarIcon
                  // title="Vegetable"
                  title={Language.Vegetable[global.language]}
                  icon={{name: 'spoon', type: 'font-awesome'}}
                  imageSrc={require('../assets/icons/test/vegetable.png')}
                  onPress={this._onFood}
                />
              </View>
              <View style={styles.foodSection}>
                <AvatarIcon
                    // title="Dessert"
                    title={Language.Dessert[global.language]}
                    icon={{name: 'spoon', type: 'font-awesome'}}
                    imageSrc={require('../assets/icons/test/dessert.png')}
                    onPress={this._onFood}
                  />
                  <AvatarIcon
                    // title="Drink"
                    title={Language.Drink[global.language]}
                    icon={{name: 'spoon', type: 'font-awesome'}}
                    imageSrc={require('../assets/icons/test/drink.png')}
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
  defaultFont: {
    fontFamily: 'netmarbleL'
  },
  profileSectionHeader: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    marginTop: StatusBar.currentHeight,
    fontFamily: 'netmarbleL',
    fontSize: 18
  }, 
  profileSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    // padding: 10,
    backgroundColor: 'white',
  }, 
  profileSectionHeaderText : {
    fontFamily: 'netmarbleL',
  },
  travelSectionHeader: {
    backgroundColor: '#A5D6A7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    fontFamily: 'netmarbleL',
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
    fontFamily: 'netmarbleL',
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