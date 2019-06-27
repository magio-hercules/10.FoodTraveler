import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, View, Image, TouchableHighlight, StatusBar } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Divider, Avatar } from 'react-native-elements';

import { observer, inject } from 'mobx-react';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Language from '../constants/Language';
import Layout from '../constants/Layout';

import AvatarIcon from '../components/AvatarIcon';

class DrawerScreen extends Component {
	constructor(props) {
		super(props);
		console.log('[DRAWER] constructor');
		console.log(this.props.navigation.state.params);

		if (this.props.navigation.state.params == undefined || this.props.navigation.state.params == null) {
			console.log('params is undefined');

			this.state = {
				profile: { name: 'guest', avatar: null },
			};
		} else {
			let params = this.props.navigation.state.params;
			console.log('profile : ' + params.profile);

			this.state = {
				profile: params.profile,
			};
		}

		console.log('this.props.profileStore.language : ' + this.props.profileStore.language);
	}

	// navigateToScreen = (route) => () => {
	//   console.log('navigateToScreen');
	//   const navigateAction = NavigationActions.navigate({
	//     routeName: route
	//   });
	//   this.props.navigation.dispatch(navigateAction);
	//   this.props.navigation.dispatch(DrawerActions.closeDrawer())
	// }

	_onPressHome = () => {
		console.log('_onPressHome');
	};

	_onPressShutdown = () => {
		console.log('_onPressShutdown');
		// this.setState({
		//   count: this.state.count+1
		// })
	};

	_onProfile = () => {
		console.log('[DRAWER] call _onProfile');
		// console.log('call _onProfile : index(' + index + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Profile',
			params: {
				profile: this.state.profile,
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onLanguage = () => {
		console.log('_onLanguage');

		if (this.props.profileStore.language == 'ko') {
			this.props.profileStore.language = 'en';
			global.language = 'en';
		} else if (this.props.profileStore.language == 'en') {
			this.props.profileStore.language = 'ko';
			global.language = 'ko';
		}
	};

	_onProfileImage = () => {
		console.log('_onProfileImage');
	};

	_onClick = () => {
		console.log('_onClick');
	};

	_onNation = () => {
		console.log('_onNation');
	};

	_onCity = () => {
		console.log('_onCity');
	};

	_onOrigin = () => {
		console.log('_onOrigin');
	};

	_onFood = () => {
		console.log('call _onFood');
		// console.log('call _onProfile : index(' + index + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Filter',
			params: {
				profile_id: '1',
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	render() {
		return (
			<View style={styles.defaultFont}>
				<ScrollView>
					<View>
						{/* Name section */}
						<View style={[styles.sectionName, {}]}>
							<AvatarIcon
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								}}
								imageSrc={require('../assets/icons/test/profile.jpg')}
								size="medium"
								rounded
								onPress={this._onProfileImage}
							/>
							<View style={styles.profileSectionHeader}>
								<Text style={[styles.profileSectionHeaderText]}>장영훈</Text>
								<Text style={[styles.profileSectionHeaderText]}>cool0huny@naver.com</Text>
							</View>
						</View>
						<Divider style={styles.drawerDivider} />

						{/* Profile section */}
						<View style={[styles.sectionProfile]}>
							{/* 프로필 */}
							<View style={styles.sectionProfileRow}>
								<View style={styles.sectionProfileRowIcon}>
									<Avatar
										rounded
										size="medium"
										overlayContainerStyle={{ backgroundColor: 'white' }}
										source={require('../assets/icons/test/profile.png')}
										onPress={this.props.onPress}
									/>
								</View>
								<View style={styles.sectionProfileRowText}>
									<Text>{Language.Profile[this.props.profileStore.language]}</Text>
								</View>
								<TouchableHighlight
									style={styles.sectionProfileRowButton}
									onPress={this.props._onClick}
								>
									<Image style={styles.iconImage} source={require('../assets/icons/share.png')} />
								</TouchableHighlight>
							</View>
							{/* 언어 */}
							<View style={styles.sectionProfileRow}>
								<View style={styles.sectionProfileRowIcon}>
									<Avatar
										rounded
										size="medium"
										overlayContainerStyle={{ backgroundColor: 'white' }}
										source={
											this.props.profileStore.language == 'ko'
												? require('../assets/icons/test/lan_icon_ko.png')
												: require('../assets/icons/test/lan_icon_en.png')
										}
										onPress={this.props.onPress}
									/>
								</View>
								<View style={styles.sectionProfileRowText}>
									<Text>{Language.Language[this.props.profileStore.language]}</Text>
								</View>
								<TouchableHighlight
									style={styles.sectionProfileRowButton}
									onPress={this.props._onClick}
								>
									<Image style={styles.iconImage} source={require('../assets/icons/share.png')} />
								</TouchableHighlight>
							</View>
							{/* 국가 */}
							<View style={styles.sectionProfileRow}>
								<View style={styles.sectionProfileRowIcon}>
									<Avatar
										rounded
										size="medium"
										overlayContainerStyle={{ backgroundColor: 'white' }}
										source={require('../assets/icons/test/south-korea.png')}
										onPress={this.props.onPress}
									/>
								</View>
								<View style={styles.sectionProfileRowText}>
									<Text>{Language.Nation[this.props.profileStore.language]}</Text>
								</View>
								<TouchableHighlight
									style={styles.sectionProfileRowButton}
									onPress={this.props._onClick}
								>
									<Image style={styles.iconImage} source={require('../assets/icons/share.png')} />
								</TouchableHighlight>
							</View>
							{/* 도시 */}
							<View style={styles.sectionProfileRow}>
								<View style={styles.sectionProfileRowIcon}>
									<Avatar
										rounded
										size="medium"
										overlayContainerStyle={{ backgroundColor: 'white' }}
										source={require('../assets/icons/test/seoul.png')}
										onPress={this.props.onPress}
									/>
								</View>
								<View style={styles.sectionProfileRowText}>
									<Text>{Language.City[this.props.profileStore.language]}</Text>
								</View>
								<TouchableHighlight
									style={styles.sectionProfileRowButton}
									onPress={this.props._onClick}
								>
									<Image style={styles.iconImage} source={require('../assets/icons/share.png')} />
								</TouchableHighlight>
							</View>
						</View>
						<Divider style={styles.drawerDivider} />

						{/* FoodType section */}
						<Text style={styles.foodSectionHeader}>{Language.Food[this.props.profileStore.language]}</Text>
						<Divider style={styles.drawerDivider} />

						<View style={{ flexDirection: 'column' }}>
							<View style={styles.foodSection}>
								<AvatarIcon
									// title="Rice"
									title={Language.Rice[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/rice.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Noodle"
									title={Language.Soup[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/soup.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Seafood"
									title={Language.Noodle[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/noodle.png')}
									onPress={this._onFood}
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									// title="Meat"
									title={Language.Bread[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/bread.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Soup"
									title={Language.Pizza[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/pizza.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Vegetable"
									title={Language.Pasta[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/pasta.png')}
									onPress={this._onFood}
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									// title="Dessert"
									title={Language.Meat[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/meat.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Drink"
									title={Language.Seafood[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/seafood.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									// title="Drink"
									title={Language.Vegetable[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/vegetable.png')}
									onPress={this._onFood}
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									title={Language.Dessert[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/dessert.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									title={Language.Drink[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/drink.png')}
									onPress={this._onFood}
								/>
								<AvatarIcon
									title={Language.Alcohol[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/test/alcohol.png')}
									onPress={this._onFood}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

DrawerScreen.propTypes = {
	navigation: PropTypes.object,
};

const styles = StyleSheet.create({
	defaultFont: {
		fontFamily: 'NanumSquare_acL',
	},
	drawerDivider: {
		marginLeft: 15,
		marginRight: 15,
		height: 1,
		backgroundColor: 'gray',
	},
	sectionName: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 20,
		paddingHorizontal: 20,
		height: 100,
		color: '#000',
		fontFamily: 'NanumSquare_acEB',
		fontSize: 18,
		backgroundColor: Colors.WHITE,
		// backgroundColor: '#A5D6A7',
	},
	sectionProfile: {
		flexDirection: 'column',
		// alignItems: 'center',
		justifyContent: 'space-around',
		// padding: 10,
		// backgroundColor: '#a32',
	},
	sectionProfileRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: 75,
		// backgroundColor: '#2a7',
	},
	sectionProfileRowIcon: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#aaf',
	},
	sectionProfileRowText: {
		flex: 4,
		fontSize: 17,
		fontFamily: 'NanumSquare_acL',
	},
	sectionProfileRowButton: {
		flex: 3,
	},
	iconImage: {
		width: 22,
		height: 22,
		// backgroundColor:'#afa',
	},

	profileSectionHeader: {
		marginLeft: 15,
		flex: 9,
		flexDirection: 'column',
		justifyContent: 'center',
		// backgroundColor: '#aa1',
	},
	profileSectionHeaderText: {
		fontFamily: 'NanumSquare_acL',
		color: Colors.BLACK,
	},

	foodSectionHeader: {
		// backgroundColor: '#A5D6A7',
		paddingTop: 15,
		paddingHorizontal: 25,
		color: '#000',
		fontFamily: 'NanumSquare_acB',
		fontSize: 18,
	},
	foodSection: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		// padding: 10,
		backgroundColor: 'white',
	},
});

export default inject('profileStore', 'routerStore')(observer(DrawerScreen));
