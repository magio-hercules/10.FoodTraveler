import React from 'react';
import { Platform, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import TileScreen from '../screens/TileScreen';
import CardScreen from '../screens/CardScreen';
import UserScreen from '../screens/UserScreen';


// name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
// name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
// name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
// name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
// name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}


const FoodStack = createStackNavigator({
  Food: FoodScreen,
}, {
  headerMode: 'none'
});

FoodStack.navigationOptions = {
  tabBarLabel: 'Food',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

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
  FoodStack,
  HomeStack,
  ListStack,
  TileStack,
  CardStack,
  UserStack
});
