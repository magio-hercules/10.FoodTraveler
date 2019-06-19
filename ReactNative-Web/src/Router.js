import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';

import { decorate, observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import Header from './screens/Header';
import FoodScreen from './screens/FoodScreen';
import IngredientScreen from './screens/information/IngredientScreen';
import CookScreen from './screens/information/CookScreen';
import EatScreen from './screens/information/EatScreen';
import HistoryScreen from './screens/information/HistoryScreen';
import CautionScreen from './screens/information/CautionScreen';

import TestScreen from './screens/TestScreen';
// import { Route, Router, Switch } from "./routers/index";

class Router extends Component {
	// return (
	//   <Router>
	//     <Switch>
	//       <Route exact path="/" component={FoodScreen} />
	//       <Route exact path="/test" component={TestScreen} />
	//     </Switch>
	//   </Router>
	// );

	constructor(props) {
		super(props);
		console.log('Router constructor');
	}

	render() {
		console.log('routerStore.screen : ' + this.props.routerStore.screen);

		var selectScreen;
		switch (this.props.routerStore.screen) {
			case 'Food':
				selectScreen = (
					<View>
						<Header />
						<FoodScreen />
					</View>
				);
				break;
			case 'Ingredient':
				selectScreen = (
					<View>
						<Header />
						<IngredientScreen />
					</View>
				);
				break;
			case 'Cook':
				selectScreen = (
					<View>
						<Header />
						<CookScreen />
					</View>
				);
				break;
			case 'Eat':
				selectScreen = (
					<View>
						<Header />
						<EatScreen />
					</View>
				);
				break;
			case 'History':
				selectScreen = (
					<View>
						<Header />
						<HistoryScreen />
					</View>
				);
				break;
			case 'Caution':
				selectScreen = (
					<View>
						<Header />
						<CautionScreen />
					</View>
				);
				break;

			case 'Test':
				selectScreen = (
					<View>
						<Header />
						<TestScreen />
					</View>
				);
				break;
		}

		return selectScreen;
	}
}

decorate(Router, {});

export default inject('routerStore')(observer(Router));
