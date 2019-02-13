import React from 'react';
import { Platform, Easing, Animated, TouchableOpacity, Image, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, DrawerActions } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import LikeScreen from '../screens/LikeScreen';
import PeopleScreen from '../screens/PeopleScreen';
import LocationScreen from '../screens/LocationScreen';
import UtilityScreen from '../screens/UtilityScreen';

import IngredientScreen from '../screens/information/IngredientScreen';
import CookScreen from '../screens/information/CookScreen';
import EatScreen from '../screens/information/EatScreen';
import HistoryScreen from '../screens/information/HistoryScreen';
import CautionScreen from '../screens/information/CautionScreen';

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




const MenuImage = ({navigation}) => {
  if (!navigation.state.isDrawerOpen){
      return <Image source={require('../assets/icons/spiro.png')}
                    style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}/>
  } else {
      return <Text style={{ width: 35, height: 30, marginLeft: 10, marginTop: 10, color: '#fff' }}>Back</Text>
  }
}

const _navigationOptions = (navigation, bHeaderLeft = true) => {
  const title = navigation.state.routeName;
  const headerLeft = bHeaderLeft ? 
    <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
        <MenuImage navigation={navigation}/>
    </TouchableOpacity> : undefined;

  return {
    title,
    headerLeft,
    headerStyle: {
        backgroundColor: '#ada',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:27
    },
  };
};

const FoodStack = createStackNavigator({
  // Food: FoodScreen,
  Food: {
    screen: FoodScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Food`,
      headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <MenuImage navigation={navigation}/>
        </TouchableOpacity>,
    }),
  },
  Ingredient: IngredientScreen,
  Cook: CookScreen,
  Eat: EatScreen,
  History: HistoryScreen,
  Caution: CautionScreen
}, {
  // headerMode: 'none',
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation, false)
  ),
//   navigationOptions: ({ navigation }) => ({
//     // initialRouteName: Home,
//     title: 'FoodTraveler',  // Title to appear in status bar
//     // headerLeft: 
//     // <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
//     //     <MenuImage navigation={navigation}/>
//     // </TouchableOpacity>,
//     headerStyle: {
//         backgroundColor: '#ada',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//       fontSize:27
//     },
// }),
  transitionConfig: () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      // const height = layout.initHeight;
      // const translateY = position.interpolate({
      //   inputRange: [index - 1, index, index + 1],
      //   outputRange: [height, 0, 0],
      // });
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [width, 0],
      });

      // const opacity = position.interpolate({
      //   inputRange: [index - 1, index - 0.99, index],
      //   outputRange: [0, 1, 1],
      // });

      // return { /*opacity,*/ transform: [{ translateY }] };
      return { /*opacity,*/ transform: [{ translateX }] };
    },
  }),
});

// FoodStack.navigationOptions = {
//   tabBarLabel: 'Food',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
//     />
//   ),
// };
FoodStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index > 0 ? false : true;

  return {
    tabBarVisible,
    tabBarLabel: 'Food',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      />
    ),
  };
};


const LikeStack = createStackNavigator({
  Like: LikeScreen,
}, {
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
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
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
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
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
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
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
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
