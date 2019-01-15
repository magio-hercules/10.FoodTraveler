import React from 'react';
import { Platform, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import TileScreen from '../screens/TileScreen';
import CardScreen from '../screens/CardScreen';
import UserScreen from '../screens/UserScreen';




const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ListStack = createStackNavigator({
  List: ListScreen,
}, {
  headerMode: 'none'
});

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const TileStack = createStackNavigator({
  Tile: TileScreen,
}, {
  headerMode: 'none'
});

TileStack.navigationOptions = {
  tabBarLabel: 'Tile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const CardStack = createStackNavigator({
  Card: CardScreen,
}, {
  headerMode: 'none'
});

CardStack.navigationOptions = {
  tabBarLabel: 'Card',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const UserStack = createStackNavigator({
  Profile: UserScreen,
}, {
  headerMode: 'none'
});

UserStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ListStack,
  TileStack,
  CardStack,
  UserStack
});
