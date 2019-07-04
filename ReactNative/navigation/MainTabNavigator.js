import React, { Component } from 'react';
import {
	Platform,
	Easing,
	Animated,
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
	View,
	ImageBackground,
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, DrawerActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { decorate, observable, observe, action, when, computed, autorun, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';

import LayoutInfo from '../constants/Layout';

import Language from '../constants/Language';
import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/FoodScreen';
import LikeScreen from '../screens/LikeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import ClassScreen from '../screens/ClassScreen';
import HelpScreen from '../screens/HelpScreen';

// for FoodScreen
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

const MenuImage = ({ navigation }) => {
	console.log('MenuImage : ' + navigation.state.routeName);

	if (!navigation.state.isDrawerOpen) {
		return <Image source={require('../assets/icons/menu.png')} style={{ width: 10, height: 15 }} />;
	} else {
		return <Text style={{ width: 35, height: 30, marginLeft: 10, marginTop: 10, color: '#fff' }}>Back</Text>;
	}
};

const HeaderLeft = ({ navigation }) => {
	console.log('HeaderLeft navigation : ' + navigation);

	return (
		<TouchableOpacity
			style={{
				width: 40,
				height: 40,
				margin: 6,
				alignItems: 'center',
				justifyContent: 'center',
				// backgroundColor: '#11a',
			}}
			onPress={() => {
				navigation.dispatch(DrawerActions.toggleDrawer());
			}}
		>
			<MenuImage navigation={navigation} />
		</TouchableOpacity>
	);
};

class NavigationDrawerStructure extends Component {
	//Structure for the navigatin Drawer
	toggleDrawer = () => {
		//Props to open/close the drawer
		this.props.navigationProps.toggleDrawer();
	};
	render() {
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={{
						width: 50,
						height: 50,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#a1a',
					}}
					onPress={this.toggleDrawer.bind(this)}
				>
					{/*Donute Button Image */}
					<Image
						source={require('../assets/icons/menu.png')}
						style={{ width: 30, height: 30, marginLeft: 10, marginTop: 0 }}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

// bHeaderLeft가 false인 경우 뒤로가기 버튼 표시.
const _navigationOptions = (navigation, bHeaderLeft = true) => {
	console.log('_navigationOptions : ' + navigation.state.routeName);

	let _routeName = navigation.state.routeName;
	// console.log("_routeName : "  + _routeName);
	// console.log("global.language : " + global.language);
	// const headerTitle = navigation.state.routeName;
	if (Language[_routeName] == null || Language[_routeName] == undefined) {
		console.log('_navigationOptions is not defined : _routeName(' + _routeName + ')');
		return;
	}

	console.log('LayoutInfo.logoHeight');
	console.log(LayoutInfo.logoHeight);

	const headerTitle = Language[_routeName][global.language];
	// let _title = Language[_routeName][global.language];
	// const headerTitle = (
	// 	<ImageBackground style={[styles.ImagePart]} source={require('../assets/images/logo_bar.png')}>
	// 		<View>
	// 			<Text>{_title}</Text>
	// 		</View>
	// 	</ImageBackground>
	// );

	const headerLeft = bHeaderLeft ? (
		<HeaderLeft navigation={navigation} />
	) : (
		// <TouchableOpacity onPress={() => {navigation.toggleDrawer()} }>
		//     <MenuImage navigation={navigation}/>
		// </TouchableOpacity>
		undefined
	);
	// console.log("headerLeft : ");
	// console.log(headerLeft);

	// const headerLeft = <NavigationDrawerStructure navigationProps={navigation} />;

	return {
		// headerTitle,
		headerLeft,
		// headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
		// headerStyle: {
		// 	backgroundColor: '#ada',
		// },
		// headerStyle: {
		// 	height: 62,
		// },
		headerTintColor: '#fff',
		// headerTitleStyle: {
		// 	fontFamily: 'NanumSquare_acB',
		// 	fontWeight: undefined,
		// 	fontSize: 27,
		// 	marginLeft: 10,
		// 	marginTop: 5,
		// },
		headerBackground: <Image style={[styles.ImagePart]} source={require('../assets/images/logo_bar.png')} />,
	};
};

const _tabBarOptions = () => {
	return {
		style: {
			// width: windowsWidth,
			height: 60,
		},
		labelStyle: {
			fontFamily: 'NanumSquare_acL',
			fontSize: 12,
		},
		tabStyle: {
			height: 60,
			// backgroundColor: '#F6F6F7',
		},
	};
};

const FoodStack = createStackNavigator(
	{
		// Food: FoodScreen,
		Food: {
			screen: FoodScreen,
			navigationOptions: ({ navigation }) => ({
				// headerTitle: `FoodTraveler`,
				headerLeft: <HeaderLeft navigation={navigation} />,
			}),
		},
		Ingredient: IngredientScreen,
		Cook: CookScreen,
		Eat: EatScreen,
		History: HistoryScreen,
		Caution: CautionScreen,

		Profile: ProfileScreen,
		Filter: FilterScreen,
	},
	{
		// headerMode: 'none',
		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation, false),
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
	}
);

FoodStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = navigation.state.index > 0 ? false : true;
	console.log('FoodStack.navigationOptions');
	return {
		tabBarVisible,
		// tabBarLabel: 'Food',
		initialLayout: { height: 60 },
		// tabBarLabel: Language.Food[global.language],
		tabBarLabel: ({ focused }) => (
			<Text
				style={{
					fontSize: 11,
					textAlign: 'center',
					color: focused ? '#000' : '#808285',
				}}
			>
				{Language.Food[global.language]}
			</Text>
		),
		tabBarOptions: _tabBarOptions(),
		tabBarIcon: ({ focused }) => (
			// <TabBarIcon
			//   focused={focused}
			//   name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
			// />
			<TabBarIcon
				focused={focused}
				iconSrc={require('../assets/icons/tab/food.png')}
				iconSelSrc={require('../assets/icons/tab/food_sel.png')}
			/>
		),
	};
};

// class LikeStack extends React.Component {
// 	static path = '';
// 	static navigationOptions = ({ navigation }) => {
// 		console.log('LikeStack.navigationOptions');
// 		console.log('global.language : ' + global.language);
// 		console.log('Language.Like[global.language] : ' + Language.Like[global.language]);
// 		console.log('Language.Like : ' + Language.Like);
// 		console.log('!!!! this.props.profileStore.language : ' + this.props.profileStore.language);

// 		return {
// 			// tabBarLabel: 'Like',
// 			tabBarLabel: Language.Like[global.language],
// 			tabBarOptions: _tabBarOptions(),
// 			// lazy: false,
// 			tabBarIcon: ({ focused }) => (
// 				// <TabBarIcon
// 				//   focused={focused}
// 				//   name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
// 				// />
// 				<TabBarIcon focused={focused} iconSrc={require('../assets/icons/tab/like.png')} />
// 			),
// 		};
// 	};
// 	render() {
// 		return createStackNavigator(
// 			{
// 				Like: LikeScreen,
// 			},
// 			{
// 				// headerMode: 'none'
// 				defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation),
// 			}
// 		);
// 	}
// }
// inject('profileStore', 'foodStore', 'routerStore')(observer(LikeStack));

// const LikeStack = createStackNavigator(
// 	{
// 		Like: LikeScreen,
// 	},
// 	{
// 		// headerMode: 'none'
// 		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation),
// 	}
// );

// LikeStack.navigationOptions = ({ navigation }) => {
// 	console.log('LikeStack.navigationOptions');
// 	console.log('global.language : ' + global.language);
// 	console.log('Language.Like[global.language] : ' + Language.Like[global.language]);
// 	console.log('Language.Like : ' + Language.Like);
// 	// console.log('!!! Language.Like : ' + this.props.store.language);

// 	return {
// 		// tabBarLabel: 'Like',
// 		tabBarLabel: Language.Like[global.language],
// 		tabBarOptions: _tabBarOptions(),
// 		// lazy: false,
// 		tabBarIcon: ({ focused }) => (
// 			// <TabBarIcon
// 			//   focused={focused}
// 			//   name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
// 			// />
// 			<TabBarIcon focused={focused} iconSrc={require('../assets/icons/tab/like.png')} />
// 		),
// 	};
// };

const LikeStack = createStackNavigator(
	{
		Like: {
			screen: FoodScreen,
			navigationOptions: ({ navigation }) => ({
				// headerTitle: Language.Like[global.language],
				headerLeft: <HeaderLeft navigation={navigation} />,
			}),
		},
		Ingredient: IngredientScreen,
		Cook: CookScreen,
		Eat: EatScreen,
		History: HistoryScreen,
		Caution: CautionScreen,
	},
	{
		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation, false),
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
	}
);

LikeStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = navigation.state.index > 0 ? false : true;
	console.log('LikeStack.navigationOptions');
	return {
		tabBarVisible,
		// tabBarLabel: Language.Like[global.language],
		tabBarLabel: ({ focused }) => (
			<Text
				style={{
					fontSize: 11,
					textAlign: 'center',
					color: focused ? '#000' : '#808285',
				}}
			>
				{Language.Like[global.language]}
			</Text>
		),
		tabBarOptions: _tabBarOptions(),
		tabBarIcon: ({ focused }) => (
			<TabBarIcon
				focused={focused}
				iconSrc={require('../assets/icons/tab/like.png')}
				iconSelSrc={require('../assets/icons/tab/like_sel.png')}
			/>
		),
	};
};

const RestaurantStack = createStackNavigator(
	{
		// Restaurant: RestaurantScreen,
		Restaurant: {
			screen: RestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				// headerTitle: Language.Restaurant[global.language],
				headerLeft: <HeaderLeft navigation={navigation} />,
			}),
		},

		Detail: DetailScreen,
		Gallery: GalleryScreen,
		Map: MapScreen,
	},
	{
		// headerMode: 'none'
		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation, false),
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
	}
);

RestaurantStack.navigationOptions = ({ navigation }) => {
	console.log('RestaurantStack.navigationOptions');
	console.log('navigation.state.index : ' + navigation.state.index);

	let tabBarVisible = navigation.state.index > 0 ? false : true;

	return {
		tabBarVisible,
		// tabBarLabel: 'Restaurant',
		// tabBarLabel: Language.Restaurant[global.language],
		tabBarLabel: ({ focused }) => (
			<Text
				style={{
					fontSize: 11,
					textAlign: 'center',
					color: focused ? '#000' : '#808285',
				}}
			>
				{Language.Restaurant[global.language]}
			</Text>
		),
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
				iconSelSrc={require('../assets/icons/tab/restaurant_sel.png')}
				// iconSrc={require('../assets/icons/tab/location.png')}
			/>
		),
	};
};

// const ClassStack = createStackNavigator(
// 	{
// 		Class: ClassScreen,
// 	},
// 	{
// 		// headerMode: 'none'
// 		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation),
// 	}
// );

// ClassStack.navigationOptions = ({ navigation }) => {
// 	console.log('ClassStack.navigationOptions');
// 	console.log('global.language : ' + global.language);
// 	console.log('Language.Class[global.language] : ' + Language.Class[global.language]);
// 	console.log('Language.Class : ' + Language.Class);

// 	return {
// 		// tabBarLabel: 'Class',
// 		tabBarLabel: Language.Class[global.language],
// 		tabBarOptions: _tabBarOptions(),
// 		tabBarIcon: ({ focused }) => (
// 			// <TabBarIcon
// 			//   focused={focused}
// 			//   name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
// 			// />
// 			<TabBarIcon focused={focused} iconSrc={require('../assets/icons/tab/class.png')} />
// 		),
// 	};
// };
const ClassStack = createStackNavigator(
	{
		Class: {
			screen: ClassScreen,
			navigationOptions: ({ navigation }) => ({
				// headerTitle: Language.Class[global.language],
				headerLeft: <HeaderLeft navigation={navigation} />,
			}),
		},

		Detail: DetailScreen,
		Gallery: GalleryScreen,
		Map: MapScreen,
	},
	{
		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation, false),
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
	}
);

ClassStack.navigationOptions = ({ navigation }) => {
	console.log('ClassStack.navigationOptions');
	console.log('navigation.state.index : ' + navigation.state.index);

	let tabBarVisible = navigation.state.index > 0 ? false : true;

	return {
		tabBarVisible,
		// tabBarLabel: Language.Class[global.language],
		tabBarLabel: ({ focused }) => (
			<Text
				style={{
					fontSize: 11,
					textAlign: 'center',
					color: focused ? '#000' : '#808285',
				}}
			>
				{Language.Class[global.language]}
			</Text>
		),
		tabBarOptions: _tabBarOptions(),
		tabBarIcon: ({ focused }) => (
			<TabBarIcon
				focused={focused}
				iconSrc={require('../assets/icons/tab/class.png')}
				iconSelSrc={require('../assets/icons/tab/class_sel.png')}
			/>
		),
	};
};

const HelpStack = createStackNavigator(
	{
		Help: HelpScreen,
	},
	{
		// headerMode: 'none'
		defaultNavigationOptions: ({ navigation }) => _navigationOptions(navigation),
	}
);

HelpStack.navigationOptions = ({ navigation }) => {
	console.log('HelpStack.navigationOptions');
	console.log('global.language : ' + global.language);
	console.log('Language.Help[global.language] : ' + Language.Help[global.language]);
	console.log('Language.Help : ' + Language.Help);

	return {
		// tabBarLabel: 'Help',
		// tabBarLabel: Language.Help[global.language],
		tabBarLabel: ({ focused }) => (
			<Text
				style={{
					fontSize: 11,
					textAlign: 'center',
					color: focused ? '#000' : '#808285',
				}}
			>
				{Language.Help[global.language]}
			</Text>
		),
		tabBarOptions: _tabBarOptions(),
		tabBarIcon: ({ focused }) => (
			// <TabBarIcon
			//   focused={focused}
			//   name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
			// />
			<TabBarIcon
				focused={focused}
				iconSrc={require('../assets/icons/tab/help.png')}
				iconSelSrc={require('../assets/icons/tab/help_sel.png')}
			/>
		),
	};
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
	ImagePartLayout: {
		width: LayoutInfo.width,
		height: LayoutInfo.size.imagePart,
		// position: 'absolute',
	},
	ImagePart: {
		resizeMode: 'cover',
		width: LayoutInfo.width,
		// width: 100,
		// height: (Platform.OS === 'ios' ? 93 : 62),
		height: (Platform.OS === 'ios' ? 62 : 62),
		marginTop: (Platform.OS === 'ios' ? 35 : 0),
		// height: hp('8.4%'),
	},
});

// class TabNav extends React.Component {
// 	render() {
// 		console.log('!!! curLanguage : ' + this.props.profileStore.language);

// 		// const RouteConfigs = {
// 		//   //
// 		// };

// 		// const NavigatorConfigs = {
// 		//   initialRouteName: initialScreen,
// 		// };

// 		const TmpNav = createBottomTabNavigator(
// 			{
// 				FoodStack,
// 				LikeStack,
// 				RestaurantStack,
// 				ClassStack,
// 				HelpStack,
// 			},
// 			{
// 				lazy: false,
// 			}
// 		);

// 		return <TmpNav />;
// 		// return nav;
// 		// return createBottomTabNavigator(
// 		// 	{
// 		// 		FoodStack,
// 		// 		LikeStack,
// 		// 		RestaurantStack,
// 		// 		ClassStack,
// 		// 		HelpStack,
// 		// 	},
// 		// 	{
// 		// 		lazy: false,
// 		// 	}
// 		// );
// 	}
// }

// export default inject('profileStore', 'foodStore', 'routerStore')(observer(TabNav));

// export default inject('profileStore', 'foodStore', 'routerStore')(
// 	observer(
// 		createBottomTabNavigator(
// 			{
// 				FoodStack,
// 				LikeStack,
// 				// LikeStack: <LikeStack store={this.props.profileStore} />,
// 				RestaurantStack,
// 				ClassStack,
// 				HelpStack,
// 			},
// 			{
// 				lazy: false,
// 			}
// 		)
// 	)
// );

export default createBottomTabNavigator(
	{
		FoodStack,
		RestaurantStack,
		ClassStack,
		HelpStack,
		LikeStack,
	},
	{
		lazy: false,
	}
);
