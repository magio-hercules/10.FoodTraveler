import React from 'react';
import { Platform, Easing, Animated, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, DrawerActions } from 'react-navigation';

import Language from '../constants/Language';

import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import LikeScreen from '../screens/LikeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import LocationScreen from '../screens/LocationScreen';
import UtilityScreen from '../screens/UtilityScreen';

import IngredientScreen from '../screens/information/IngredientScreen';
import CookScreen from '../screens/information/CookScreen';
import EatScreen from '../screens/information/EatScreen';
import HistoryScreen from '../screens/information/HistoryScreen';
import CautionScreen from '../screens/information/CautionScreen';

import ProfileScreen from '../screens/option/ProfileScreen';
import FilterScreen from '../screens/option/FilterScreen';

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
  console.log("MenuImage : " + navigation.state.routeName);

  if (!navigation.state.isDrawerOpen){
      return <Image source={require('../assets/icons/spiro.png')}
                    style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}/>
  } else {
      return <Text style={{ width: 35, height: 30, marginLeft: 10, marginTop: 10, color: '#fff' }}>Back</Text>
  }
}

const _navigationOptions = (navigation, bHeaderLeft = true) => {
  console.log("_navigationOptions : " + navigation.state.routeName);

  let _routeName = navigation.state.routeName;
  // console.log("_routeName : "  + _routeName);
  // console.log("global.language : " + global.language);
  // const headerTitle = navigation.state.routeName;
  const headerTitle = Language[_routeName][global.language];
  
  const headerLeft = 
    bHeaderLeft ? 
      <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage navigation={navigation}/>
      </TouchableOpacity> 
    : 
      undefined;

    console.log(headerLeft);

  return {
    headerTitle,
    headerLeft,
    headerStyle: {
        backgroundColor: '#ada',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'netmarbleB', 
      fontWeight: undefined, 
      fontSize:27,
      marginLeft: 0,
      marginTop: 5,
    },
  };
};

const _tabBarOptions = () => {
  return {
    labelStyle: {
      fontFamily: 'netmarbleL'
    }
  };
}


const FoodStack = createStackNavigator({
  // Food: FoodScreen,
  Food: {
    screen: FoodScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `FoodTraveler`,
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
  Caution: CautionScreen,
  
  Profile: ProfileScreen,
  Filter: FilterScreen,
}, {
  // headerMode: 'none',
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation, false)
  ),
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
  console.log("FoodStack.navigationOptions");
  return {
    tabBarVisible,
    // tabBarLabel: 'Food',
    tabBarLabel: Language.Food[global.language],
    tabBarOptions: _tabBarOptions(),
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

// LikeStack.navigationOptions = {
//   // tabBarLabel: 'Like',
//   tabBarLabel: Language.Like[global.language],
//   tabBarOptions: _tabBarOptions(),
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
//     />
//   ),
// };
LikeStack.navigationOptions = ({ navigation }) => {
  console.log("LikeStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Like[global.language] : " + Language.Like[global.language]);
  console.log("Language.Like : " + Language.Like);
  
  return {
    // tabBarLabel: 'Like',
    tabBarLabel: Language.Like[global.language],
    tabBarOptions: _tabBarOptions(),
    lazy: false,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
      />
    ),
  };
};

const RestaurantStack = createStackNavigator({
  Restaurant: RestaurantScreen,
}, {
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

// PeopleStack.navigationOptions = {
//   // tabBarLabel: 'People',
//   // tabBarLabel: 'Restaurant',
//   tabBarLabel: Language.Restaurant[global.language],
//   tabBarOptions: _tabBarOptions(),
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
//     />
//   ),
// };
RestaurantStack.navigationOptions = ({ navigation }) => {
  console.log("RestaurantStack.navigationOptions");
  
  return {
    // tabBarLabel: 'People',
    // tabBarLabel: 'Restaurant',
    tabBarLabel: Language.Restaurant[global.language],
    // tabBarLabel: Language.Food[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
      />
    ),
  };
};

const LocationStack = createStackNavigator({
  Location: LocationScreen,
}, {
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

LocationStack.navigationOptions = ({ navigation }) => {
  console.log("LocationStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Location[global.language] : " + Language.Location[global.language]);
  console.log("Language.Location : " + Language.Location);

  return {
    // tabBarLabel: 'Location',
    tabBarLabel: Language.Location[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
      />
    ),
  };
};

const UtilityStack = createStackNavigator({
  Utility: UtilityScreen,
}, {
  // headerMode: 'none'
  navigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

UtilityStack.navigationOptions = ({ navigation }) => {
  console.log("UtilityStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Utility[global.language] : " + Language.Utility[global.language]);
  console.log("Language.Utility : " + Language.Utility);

  return {
    // tabBarLabel: 'Utility',
    tabBarLabel: Language.Utility[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
      />
    ),
  };
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
  RestaurantStack,
  LocationStack, 
  UtilityStack,

  // HomeStack,
  // ListStack,
  // TileStack,
  // CardStack,
  // UserStack
},
  {
    lazy: false,
  }
);