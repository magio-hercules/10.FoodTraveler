import React from 'react';
import { StyleSheet, View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { facebookService } from '../services/FacebookService';
import FBSDK from 'react-native-fbsdk';

const { AccessToken, LoginManager } = FBSDK;

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		console.log('[LOGIN] constructor');

		this.state = {
			accessToken: null,
			profile: {},
		};

		this.login = this.login.bind(this);
	}

	componentDidMount() {
		console.log('[LOGIN] componentDidMount');

		AccessToken.getCurrentAccessToken()
			.then(data => {
				if (data != null) {
					console.log('[LOGIN] success getCurrentAccessToken');
					console.log(data);

					this.setState({
						accessToken: data.accessToken,
					});

					let str = 'data.userID : ' + data.userID + '님 환영합니다.';
					console.log(str);

					this.login(true);
				} else {
					console.log('[LOGIN] getCurrentAccessToken data is null');
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>Login</Text>
				{facebookService.makeLoginButton(accessToken => {
					console.log('makeLoginButton accessToken');
					console.log(accessToken);

					this.login(true);
				})}

				<TouchableOpacity
					style={styles.loginButton}
					// onPress={() => this.props.navigation.navigate('DrawerNavigator')}>
					onPress={() => this.login(false)}
				>
					<Text style={styles.buttonText}>Guest 로그인</Text>
				</TouchableOpacity>
			</View>
		);
	}

	sleep = milliseconds => {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	};

	async login(bFlag) {
		try {
			var profile;
			if (!bFlag) {
				console.log('Guest 로그인');
				profile = { name: 'guest', avatar: null };
				this.setState({
					profile: profile,
				});
			} else {
				console.log('profile 조회');
				const _profile = await facebookService.fetchProfile();
				this.setState({
					profile: _profile,
				});
			}

			console.log('profile.name : ' + this.state.profile.name);
			console.log('profile.id : ' + this.state.profile.id);
			console.log('profile.avatar : ' + this.state.profile.avatar);

			let _name = this.state.profile.name;
			let str = (_name == undefined ? 'GUEST' : _name) + ' 님 환영합니다.';
			ToastAndroid.show(str, ToastAndroid.SHORT);

			const navigateAction = NavigationActions.navigate({
				routeName: 'DrawerNavigator',
				params: {
					profile: this.state.profile,
				},
			});
			this.props.navigation.dispatch(navigateAction);
		} catch (e) {
			console.error(e);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	label: {
		fontSize: 16,
		fontWeight: 'normal',
		marginBottom: 48,
	},
	loginButton: {
		height: 40,
		width: 195,
		// paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		backgroundColor: '#CFD8DC',
		borderRadius: 8,
	},
	buttonText: {
		// color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
	},
});
