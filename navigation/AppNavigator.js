import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, StatusBar } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DrawerScreen from '../screens/DrawerScreen';

import Layout from '../constants/Layout';


// export default createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// });


const DrawerNavigator = createDrawerNavigator({
  Home:{
      screen: MainTabNavigator
  }
},{
  initialRouteName: 'Home',
  contentComponent: DrawerScreen,
  drawerWidth: Layout.drawerWidth
});

const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen){
      return <Image source={require('../assets/icons/spiro.png')}
                    style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}/>
  }else{
      return <Text style={{ width: 35, height: 30, marginLeft: 10, marginTop: 10, color: '#fff' }}>Back</Text>
  }
}

const StackNavigator = createStackNavigator({
  //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.
  // Main: MainTabNavigator,
  DrawerNavigator:DrawerNavigator
},{
  navigationOptions: ({ navigation }) => ({
      title: 'FoodTraveler',  // Title to appear in status bar
      headerLeft: 
      <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage navigation={navigation}/>
      </TouchableOpacity>,
      headerStyle: {
          backgroundColor: '#ada',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize:27
      },

  })
});

export default StackNavigator;
