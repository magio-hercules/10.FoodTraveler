import React from 'react';
import { Platform, Easing, Animated } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import LikeScreen from '../screens/LikeScreen';
import PeopleScreen from '../screens/PeopleScreen';
import LocationScreen from '../screens/LocationScreen';
import UtilityScreen from '../screens/UtilityScreen';

// import HomeScreen from '../screens/HomeScreen';
// import ListScreen from '../screens/ListScreen';
// import TileScreen from '../screens/TileScreen';
// import CardScreen from '../screens/CardScreen';
// import UserScreen from '../screens/UserScreen';


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

const LikeStack = createStackNavigator({
  Like: LikeScreen,
}, {
  headerMode: 'none'
});

LikeStack.navigationOptions = {
  tabBarLabel: 'Like',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
}, {
  headerMode: 'none'
});

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const LocationStack = createStackNavigator({
  Location: LocationScreen,
}, {
  headerMode: 'none'
});

LocationStack.navigationOptions = {
  tabBarLabel: 'Location',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  ),
};

const UtilityStack = createStackNavigator({
  Utility: UtilityScreen,
}, {
  headerMode: 'none'
});

UtilityStack.navigationOptions = {
  tabBarLabel: 'Utility',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

//////////////////////////////////////////////////////////////////////////////////////////

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// }, {
//   headerMode: 'none'
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const ListStack = createStackNavigator({
//   List: ListScreen,
// }, {
//   headerMode: 'none'
// });

// ListStack.navigationOptions = {
//   tabBarLabel: 'List',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   ),
// };

// const TileStack = createStackNavigator({
//   Tile: TileScreen,
// }, {
//   headerMode: 'none'
// });

// TileStack.navigationOptions = {
//   tabBarLabel: 'Tile',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

// const CardStack = createStackNavigator({
//   Card: CardScreen,
// }, {
//   headerMode: 'none'
// });

// CardStack.navigationOptions = {
//   tabBarLabel: 'Card',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

// const UserStack = createStackNavigator({
//   Profile: UserScreen,
// }, {
//   headerMode: 'none'
// });

// UserStack.navigationOptions = {
//   tabBarLabel: 'Profile',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  FoodStack,
  LikeStack,
  PeopleStack,
  LocationStack, 
  UtilityStack,
  // HomeStack,
  // ListStack,
  // TileStack,
  // CardStack,
  // UserStack
});
