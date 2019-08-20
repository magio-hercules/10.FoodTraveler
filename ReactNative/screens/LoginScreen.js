import React from 'react';
import { StyleSheet, View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { facebookService } from '../services/FacebookService';
import FBSDK from 'react-native-fbsdk';
import Video from 'react-native-video';
import Toast from 'react-native-root-toast';

import { observer, inject } from 'mobx-react';

const { LoginButton, AccessToken, LoginManager } = FBSDK;

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		console.log('[LOGIN] constructor');

		this.state = {
			accessToken: null,
			profile: {},
			loaded: false,
		};

		this.login = this.login.bind(this);
	}

	componentDidMount() {
		console.log('[LOGIN] componentDidMount');
	}

	_onEnd() {
		console.log('[LOGIN] _onEnd');

		this.setState({ loaded: true });

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

		// 참고용 bind(this)
		// setTimeout(
		// 	function() {

		// 	}.bind(this),
		// 	0
		// );
	}

	_onError() {
		console.log('[LOGIN] _onError');
		Toast.show('Splash Mp4 load failed.', {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
		});
	}

	render() {
		return (
			<View style={styles.container}>
				{!this.state.loaded && (
					<Video
						source={require('../assets/mp4_splash.mp4')} // Can be a URL or a local file.
						ref={ref => {
							this.player = ref;
						}} // Store reference
						resizeMode="stretch"
						// onBuffer={this.onBuffer}                // Callback when remote video is buffering
						onError={this._onError} // Callback when video cannot be loaded
						onEnd={this._onEnd.bind(this)}
						style={styles.backgroundVideo}
					/>
				)}

				{this.state.loaded && (
					<View style={styles.container}>
						<Text style={styles.label}>Login</Text>

						<LoginButton
							onLoginFinished={(error, result) => {
								if (error) {
									console.log('login has error: ' + result.error);
								} else if (result.isCancelled) {
									console.log('login is cancelled.');
								} else {
									AccessToken.getCurrentAccessToken().then(data => {
										console.log('data.accessToken');
										console.log(data.accessToken.toString());

										this.login(true);
									});
								}
							}}
							onLogoutFinished={() => console.log('logout.')}
						/>
						<TouchableOpacity
							style={[this.state.loaded && styles.loginButton]}
							// onPress={() => this.props.navigation.navigate('DrawerNavigator')}>
							onPress={() => this.login(false)}
						>
							<Text style={styles.buttonText}>Guest 로그인</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}

	sleep = milliseconds => {
		return new Promise(resolve => setTimeout(resolve, milliseconds));
	};

	async login(bFlag) {
		try {
			var _profile;
			if (!bFlag) {
				console.log('Guest 로그인');
				_profile = { id: '', name: 'GUEST', email: 'guest@labis.co.kr', avatar: undefined };
				this.setState({
					profile: _profile,
				});
			} else {
				console.log('profile 조회');
				const _profile = await facebookService.fetchProfile();
				this.setState({
					profile: _profile,
				});
			}

			console.log('profile.name : ' + this.state.profile.name);
			console.log('profile.email : ' + this.state.profile.email);
			console.log('profile.id : ' + this.state.profile.id);
			console.log('profile.avatar : ' + this.state.profile.avatar);

			// set profileStore
			this.props.profileStore.id = _profile.id;
			this.props.profileStore.name = _profile.name;
			this.props.profileStore.email = _profile.email;
			this.props.profileStore.avatar = _profile.avatar;

			let _name = this.state.profile.name;
			let str = (_name == undefined ? 'GUEST' : _name) + ' 님 환영합니다.';
			// ToastAndroid.show(str, ToastAndroid.SHORT);
			Toast.show(str, {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
			});

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

	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});

export default inject('profileStore')(observer(LoginScreen));
