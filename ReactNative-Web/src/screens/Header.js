import React, { Component } from 'react';
import {
	StyleSheet,
	Platform,
	FlatList,
	View,
	Text,
	TextInput,
	// Button,
	Image,
	Picker,
	TouchableHighlight,
	SafeAreaView,
	ImageBackground,
} from 'react-native';

import { create } from 'apisauce';
import PropTypes from 'prop-types';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

import DrawerScreen from './DrawerScreen';

import { decorate, observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import { Drawer, MuiThemeProvider, getMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// const { Drawer, RaisedButton, MuiThemeProvider, getMuiTheme } = MaterialUI;

class Header extends Component {
	state = {};

	constructor(props) {
		super(props);
		this.state = { drawerOpen: false };
	}

	_handleLogo = () => {
		console.log('_handleLogo');
		this.props.routerStore.screen = 'Food';
	};

	_handleBack = () => {
		console.log('_handleBack');
		this.setState({ drawerOpen: false });
	};

	_handleMenu = () => {
		// this._handleAction(RNTesterActions.Back());
		console.log('_handleMenu');
		// this.props.routerStore.screen = 'Food';

		this.setState({ drawerOpen: true });
	};

	render() {
		console.log('call render');

		// const contentStyle = { transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' };
		// if (this.state.drawerOpen) {
		// 	contentStyle.marginLeft = 256;
		// }

		return (
			<View style={styles.RootView}>
				<Drawer open={this.state.drawerOpen}>
					<div style={{ textAlign: 'right', width: 300, height: 50 }}>
						<Button
							style={{
								width: 90,
								height: 40,
								backgroundColor: '#42A5F5',
								borderRadius: 10,
								color: '#FFF',
								fontSize: 20,
								margin: 5,
							}}
							onClick={() => this.setState({ drawerOpen: false })}
						>
							CLOSE
						</Button>
					</div>
					{/* <View style={{ alignItems: 'right', width: 300 }}>
						<TouchableHighlight
							style={styles.CloseButton}
							underlayColor="#448AFF"
							onPress={this._handleBack}
						>
							<View>
								<Text style={styles.ButtonText}>CLOSE</Text>
							</View>
						</TouchableHighlight>
					</View> */}

					<DrawerScreen />
				</Drawer>
				<View style={styles.headerContainer}>
					<View style={styles.header}>
						<View style={styles.headerCenter}>
							<TouchableHighlight onPress={this._handleLogo} underlayColor="#F5F5F6">
								<Image
									source={require('../assets/icons/spiro.png')}
									style={{
										width: 25,
										height: 25,
										marginLeft: 0,
										marginTop: 0,
										marginRight: 10,
										tintColor: '#2f95dc',
									}}
								/>
							</TouchableHighlight>
							<Text accessibilityRole="heading" aria-level="3" style={styles.title}>
								FoodTraveler
							</Text>
						</View>
						<React.Fragment>
							<View style={styles.headerLeft}>
								{/* <Button style={{ backgroundColor: "#FAFAFA" }} title="MENU" onPress={this._handleBack} /> */}
								<TouchableHighlight
									style={styles.MenuButton}
									underlayColor="#448AFF"
									onPress={this._handleMenu}
								>
									<View>
										<Text style={styles.ButtonText}>MENU</Text>
									</View>
								</TouchableHighlight>
							</View>
							<View style={styles.headerRight} />
						</React.Fragment>
					</View>
				</View>
			</View>
		);
	} // end of render()
}

const styles = StyleSheet.create({
	RootView: {
		// width: (Platform.OS === 'web') ? "50%" : "100%",
		// height: (Platform.OS === 'web') ? "200" : "100%",
		flex: 1,
		// flexDirection:'column',
		backgroundColor: '#fafafa',
		alignItems: 'center',
		justifyContent: 'center',
		// minWidth: "50%",
		// maxWidth: "70%",
	},
	headerContainer: {
		width: '100%',
		backgroundColor: '#fff',
		// alignItems: "center",
		// justifyContent: "center",
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#efefef',
		backgroundColor: '#F5F5F6',
	},
	header: {
		padding: 10,
		paddingVertical: 5,
		// alignItems: 'center',
		flexDirection: 'row',
		minHeight: 50,
	},
	headerLeft: {
		order: 1,
		width: 80,
	},
	headerCenter: {
		flex: 1,
		order: 2,
		flexDirection: 'row',
		fontSize: '30px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerRight: {
		order: 3,
		width: 80,
	},
	title: {
		fontSize: 19,
		fontWeight: '600',
		textAlign: 'center',
	},
	MenuButton: {
		width: 90,
		height: 40,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#42A5F5',
	},
	CloseButton: {
		width: 90,
		height: 40,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#42A5F5',
		// textAlign: 'right',
	},
	ButtonText: {
		color: '#FFF',
		fontFamily: 'netmarbleM',
		fontSize: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// export default Header;
export default inject('routerStore')(observer(Header));
