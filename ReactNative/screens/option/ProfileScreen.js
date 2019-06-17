import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-elements';

import { facebookService } from '../../services/FacebookService';

var _self;

export default class ProfileScreen extends React.Component {
	static navigationOptions = {
		// title: 'Ingredient',
	};

	constructor(props) {
		console.log('[Profile] constructor');
		super(props);

		this.logout = this.logout.bind(this);

		_self = this;

		let params = this.props.navigation.state.params;
		this.state = {
			profile: params.profile,
		};
		console.log('profile.name : ' + this.state.profile.name);
		console.log('profile.id : ' + this.state.profile.id);
		console.log('profile.avatar : ' + this.state.profile.avatar);
	}

	// async componentWillMount () {
	//   console.log("call componentWillMount");

	//   let params = this.props.navigation.state.params;
	//   console.log("profile_id test : " + params.profile_id);
	//   // let _data = await this._getHistory(params.history_list);
	//   // this.setState({data: _data});

	//   this._loadData()
	// }

	async componentDidMount() {
		console.log('call componentWillMount');

		// let params = this.props.navigation.state.params;
		// console.log("profile_id test : " + params.profile_id);
		// let _data = await this._getHistory(params.history_list);
		// this.setState({data: _data});

		if (this.state.profile.name != 'guest') {
			this._loadData();
		}
	}

	async _loadData() {
		console.log('_loadData');

		// const profile = await facebookService.fetchProfile()
		// this.setState({
		//   profile: profile
		// })
		console.log('profile.name : ' + this.state.profile.name);
		console.log('profile.id : ' + this.state.profile.id);
		console.log('profile.avatar : ' + this.state.profile.avatar);
		console.log('end _loadData');
	}

	_onPressKorean = () => {
		console.log('_onPressKorean');
		// this.setState({
		//   count: this.state.count+1
		// })

		// Immediately reload the React Native Bundle
		// RNRestart.Restart();
	};

	_onPressEnglish = () => {
		console.log('_onPressEnglish');

		// Immediately reload the React Native Bundle
		// RNRestart.Restart();
	};

	logout() {
		this.props.navigation.navigate('LoginNavigator');
	}

	render() {
		console.log('[Profile] render');

		const profile = this.state.profile;
		console.log('profile.name : ' + profile.name);

		return (
			<SafeAreaView>
				<View style={styles.container}>
					<ProfileView profile={this.state.profile} />
					{/* <PointView style={styles.point} point={this.state.point}/> */}
				</View>
			</SafeAreaView>
		);
	}
}

class ProfileView extends Component {
	render() {
		console.log('[PROFILE] ProfileView render');

		var profile = this.props.profile;
		if (profile == null) {
			// return (
			//   <View >
			//     <Text> Profile is null </Text>
			//   </View>
			// )
			profile = { name: 'guest', avatar: null };

			console.log('profile');
			console.log(profile);
			console.log(profile.name);
			console.log(profile.avatar);

			// _self.setState({
			//   profile: _profile
			// });
		}

		const styles = StyleSheet.create({
			container: {
				flexDirection: 'row',
			},
			left: {
				paddingRight: 10,
				alignItems: 'center',
				justifyContent: 'center',
			},
			avatar: {
				// flexDirection: 'column',
				width: 50,
				height: 50,
				// alignItems: 'center',
				// justifyContent: 'center',
			},
			text: {
				fontSize: 20,
				marginBottom: 10,
				// backgroundColor: "#00BFFF",
			},
			right: {
				flexDirection: 'column',
				justifyContent: 'space-around',
			},
			loginButton: {
				height: 40,
				width: 195,
				// paddingVertical: 10,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#CFD8DC',
				borderRadius: 8,
			},
		});

		return (
			<View style={styles.container}>
				<View style={styles.left}>
					<Avatar style={styles.avatar} large rounded source={{ uri: profile.avatar }} />
				</View>
				<View style={styles.right}>
					<Text style={styles.text}>{profile.name == undefined ? 'GUEST' : profile.name}</Text>

					{profile.name == undefined ? (
						<TouchableOpacity
							style={styles.loginButton}
							onPress={() => _self.props.navigation.navigate('LoginNavigator')}
						>
							{/* onPress={() => this.login(false)}> */}
							<Text style={styles.buttonText}>go to Login</Text>
						</TouchableOpacity>
					) : (
						facebookService.makeLogoutButton(() => {
							// this.logout()
							// console.log('_self : ' + _self);

							_self.logout();
						})
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		padding: 10,
	},
	point: {
		paddingTop: 30,
	},
	header: {
		backgroundColor: '#00BFFF',
		height: 200,
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: 'white',
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 130,
	},
	name: {
		fontSize: 22,
		color: '#FFFFFF',
		fontWeight: '600',
	},
	body: {
		marginTop: 40,
	},
	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 30,
	},
	name: {
		fontSize: 28,
		color: '#696969',
		fontWeight: '600',
	},
	info: {
		fontSize: 16,
		color: '#00BFFF',
		marginTop: 10,
	},
	description: {
		fontSize: 16,
		color: '#696969',
		marginTop: 10,
		textAlign: 'center',
	},
	buttonGroup: {
		marginTop: 30,
		flex: 1,
		flexDirection: 'row',
		// backgroundColor:'#1af',
		// color: '#aa1'
	},
	buttonContainer: {
		margin: 10,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		borderRadius: 30,
		color: '#FFFFFF',
		fontSize: 25,
		backgroundColor: '#00BFFF',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 20,
	},
});
