// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppRegistry } from 'react-native';
// import Food from "./screens/FoodScreen";
// import App from "./TestScreen";
import Router from './Router';
import { Provider } from 'mobx-react';

import RootStore from './stores';

const root = new RootStore();

export const App = () => {
	return (
		<Provider {...root}>
			<View>
				<Router />
			</View>
		</Provider>
	);
};

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
	rootTag: document.getElementById('root'),
});
