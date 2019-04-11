import React, { Component } from 'react';
import { Platform, Easing, Animated, TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, DrawerActions } from 'react-navigation';

import Language from '../constants/Language';
import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import LikeScreen from '../screens/LikeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import ClassScreen from '../screens/ClassScreen';
import HelpScreen from '../screens/HelpScreen';

// for RestaurantScreen
import IngredientScreen from '../screens/information/IngredientScreen';
import CookScreen from '../screens/information/CookScreen';
import EatScreen from '../screens/information/EatScreen';
import HistoryScreen from '../screens/information/HistoryScreen';
import CautionScreen from '../screens/information/CautionScreen';

// for RestaurantScreen
import DetailScreen from '../screens/information/DetailScreen';
import GalleryScreen from '../screens/information/GalleryScreen';
import MapScreen from '../screens/information/MapScreen';


import ProfileScreen from '../screens/option/ProfileScreen';
import FilterScreen from '../screens/option/FilterScreen';




const MenuImage = ({navigation}) => {
  console.log("MenuImage : " + navigation.state.routeName);

  if (!navigation.state.isDrawerOpen){
      return <Image source={require('../assets/icons/spiro.png')}
                    style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}/>
  } else {
      return <Text style={{ width: 35, height: 30, marginLeft: 10, marginTop: 10, color: '#fff' }}>Back</Text>
  }
}


class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../assets/icons/spiro.png')}
            style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// bHeaderLeft가 false인 경우 뒤로가기 버튼 표시.
const _navigationOptions = (navigation, bHeaderLeft = true) => {
  console.log("_navigationOptions : " + navigation.state.routeName);

  let _routeName = navigation.state.routeName;
  // console.log("_routeName : "  + _routeName);
  // console.log("global.language : " + global.language);
  // const headerTitle = navigation.state.routeName;
  if (Language[_routeName] == null || Language[_routeName] == undefined) {
    console.warn('_navigationOptions is not defined : _routeName(' + _routeName +')');
    return;
  }
  
  const headerTitle = Language[_routeName][global.language];
  
  const headerLeft = 
    bHeaderLeft ? 
      <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <MenuImage navigation={navigation}/>
      </TouchableOpacity> 
      // <TouchableOpacity onPress={() => {navigation.toggleDrawer()} }>
      //     <MenuImage navigation={navigation}/>
      // </TouchableOpacity> 
    : 
    undefined;
  // console.log("headerLeft : ");
  // console.log(headerLeft);
  
  // const headerLeft = <NavigationDrawerStructure navigationProps={navigation} />;

  return {
    headerTitle,
    headerLeft,
    // headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
  defaultNavigationOptions: ({ navigation }) => (
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

FoodStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index > 0 ? false : true;
  console.log("FoodStack.navigationOptions");
  return {
    tabBarVisible,
    // tabBarLabel: 'Food',
    tabBarLabel: Language.Food[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
           // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      // />
      <TabBarIcon
        focused={focused}
        iconSrc={require('../assets/icons/tab/food.png')}
      />
    ),
  };
};


const LikeStack = createStackNavigator({
  Like: LikeScreen,
}, {
  // headerMode: 'none'
  defaultNavigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

LikeStack.navigationOptions = ({ navigation }) => {
  console.log("LikeStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Like[global.language] : " + Language.Like[global.language]);
  console.log("Language.Like : " + Language.Like);
  
  return {
    // tabBarLabel: 'Like',
    tabBarLabel: Language.Like[global.language],
    tabBarOptions: _tabBarOptions(),
    // lazy: false,
    tabBarIcon: ({ focused }) => (
     // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
      // />
      <TabBarIcon
        focused={focused}
        iconSrc={require('../assets/icons/tab/like.png')}
      />
    ),
  };
};


const RestaurantStack = createStackNavigator({
  // Restaurant: RestaurantScreen,
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: Language.Restaurant[global.language],
      headerLeft: 
        <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
            <MenuImage navigation={navigation}/>
        </TouchableOpacity>,
    }),
  },

  Detail: DetailScreen,
  Gallery: GalleryScreen,
  Map: MapScreen,
}, {
  // headerMode: 'none'
  defaultNavigationOptions: ({ navigation }) => (
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
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [width, 0],
      });

      return { /*opacity,*/ transform: [{ translateX }] };
    },
  }),
});

RestaurantStack.navigationOptions = ({ navigation }) => {
  console.log("RestaurantStack.navigationOptions");
  console.log("navigation.state.index : " + navigation.state.index);
  
  let tabBarVisible = navigation.state.index > 0 ? false : true;
  
  return {
    tabBarVisible,
    // tabBarLabel: 'Restaurant',
    tabBarLabel: Language.Restaurant[global.language],
    // tabBarLabel: Language.Food[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
       // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
      // />
      <TabBarIcon
        focused={focused}
        iconSrc={require('../assets/icons/tab/restaurant.png')}
      />
    ),
  };
};


const ClassStack = createStackNavigator({
  Class: ClassScreen,
}, {
  // headerMode: 'none'
  defaultNavigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

ClassStack.navigationOptions = ({ navigation }) => {
  console.log("ClassStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Class[global.language] : " + Language.Class[global.language]);
  console.log("Language.Class : " + Language.Class);

  return {
    // tabBarLabel: 'Class',
    tabBarLabel: Language.Class[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
       // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
      // />
      <TabBarIcon
        focused={focused}
        iconSrc={require('../assets/icons/tab/class.png')}
      />
    ),
  };
};


const HelpStack = createStackNavigator({
  Help: HelpScreen,
}, {
  // headerMode: 'none'
  defaultNavigationOptions: ({ navigation }) => (
    _navigationOptions(navigation)
  ),
});

HelpStack.navigationOptions = ({ navigation }) => {
  console.log("HelpStack.navigationOptions");
  console.log("global.language : " + global.language);
  console.log("Language.Help[global.language] : " + Language.Help[global.language]);
  console.log("Language.Help : " + Language.Help);

  return {
    // tabBarLabel: 'Help',
    tabBarLabel: Language.Help[global.language],
    tabBarOptions: _tabBarOptions(),
    tabBarIcon: ({ focused }) => (
      // <TabBarIcon
      //   focused={focused}
      //   name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
      // />
      <TabBarIcon
        focused={focused}
        iconSrc={require('../assets/icons/tab/help.png')}
      />
    ),
  };
};


export default createBottomTabNavigator({
  FoodStack,
  LikeStack,
  RestaurantStack,
  ClassStack, 
  HelpStack,
},
  {
    lazy: false,
  }
);