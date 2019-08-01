import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, ScrollView, Text, View, Image, TouchableHighlight, StatusBar } from 'react-native';

import { DrawerActions } from 'react-navigation';
import { Divider, Avatar } from 'react-native-elements';

import { observer, inject } from 'mobx-react';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import Language from '../constants/Language';
import Layout from '../constants/Layout';

import AvatarIcon from '../components/AvatarIcon';
import { switchCase } from '@babel/types';

import ModalDropdown from 'react-native-modal-dropdown';

import Toast from 'react-native-simple-toast';

// const arrLanguage = ['한국어', '영어', '중국어(간체)', '중국어(번체)', '일문'];
const arrLanguage = ['Korean', 'English', 'Simplified Chinese', 'Traditional Chinese', 'Japanese'];

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
			this.props.profileStore.language = 'zh_cn';
			global.language = 'zh_cn';
		} else if (this.props.profileStore.language == 'zh_cn') {
			this.props.profileStore.language = 'zh_tw';
			global.language = 'zh_tw';
		} else if (this.props.profileStore.language == 'zh_tw') {
			this.props.profileStore.language = 'jp';
			global.language = 'jp';
		} else if (this.props.profileStore.language == 'jp') {
			this.props.profileStore.language = 'ko';
			global.language = 'ko';
		}
	};

	_getLanguageIcon = language => {
		var source;

		switch (language) {
			case 'ko':
				// case '한국어':
				source = require('../assets/icons/drawer/language_ko.png');
				break;
			case 'en':
				// case '영어':
				source = require('../assets/icons/drawer/language_en.png');
				break;
			case 'zh_cn':
				// case '중국어(간체)':
				source = require('../assets/icons/drawer/language_zh.png');
				break;
			case 'zh_tw':
				// case '중국어(번체)':
				source = require('../assets/icons/drawer/language_zh.png');
				break;
			case 'jp':
				// case '일본어':
				source = require('../assets/icons/drawer/language_jp.png');
				break;
		}

		return source;
	};

	_onProfileImage = () => {
		console.log('_onProfileImage');
	};

	_onClick = () => {
		console.log('_onClick');
	};

	_onReservation = () => {
		console.log('_onReservation');
		Toast.show('준비중입니다.');
	};

	_onNation = () => {
		console.log('_onNation');
		Toast.show('준비중입니다.');
	};

	_onCity = () => {
		console.log('_onCity');
		Toast.show('준비중입니다.');
	};

	_onFood = foodName => {
		console.log('call _onFood');
		// console.log('call _onProfile : index(' + index + ')');

		// const navigateAction = NavigationActions.navigate({
		// 	routeName: 'Filter',
		// 	params: {
		// 		profile_id: '1',
		// 	},
		// });
		// this.props.navigation.dispatch(navigateAction);
		Toast.show('준비중입니다.');
		console.log('FoodName : ' + foodName);

		switch (foodName) {
			case 'rice':
				break;
			case 'soup':
				break;
			case 'noodle':
				break;
			case 'bread':
				break;
			case 'pizza':
				break;
			case 'pasta':
				break;
			case 'meat':
				break;
			case 'seafood':
				break;
			case 'vegetable':
				break;
			case 'dessert':
				break;
			case 'drink':
				break;
			case 'alcohol':
				break;
			default:
				break;
		}
	};

	_onSelect_modalDropDown(idx, value) {
		console.log('_onLanguage');
		console.log('index: ' + idx + ', value: ' + value);

		switch (value) {
			case 'Korean':
				this.props.profileStore.language = 'ko';
				global.language = 'ko';
				break;
			case 'English':
				this.props.profileStore.language = 'en';
				global.language = 'en';
				break;
			case 'Simplified Chinese':
				this.props.profileStore.language = 'zh_cn';
				global.language = 'zh_cn';
				break;
			case 'Traditional Chinese':
				this.props.profileStore.language = 'zh_tw';
				global.language = 'zh_tw';
				break;
			case 'Japanese':
				this.props.profileStore.language = 'jp';
				global.language = 'jp';
				break;
			default:
				break;
		}
	}

	_renderRow(rowData, rowID, highlighted) {
		// let icon = highlighted ? require('./images/heart.png') : require('./images/flower.png');
		let evenRow = rowID % 2;
		return (
			<View style={[styles.dropdown_row, { backgroundColor: evenRow ? 'lemonchiffon' : 'white' }]}>
				{/* <Image style={styles.dropdown_2_image}
					mode='stretch'
					source={icon}
				/> */}
				<Text style={[styles.dropdown_row_text, highlighted && { color: 'black' }]}>{rowData}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
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
							{/* 프로필 -> 예약 */}
							<TouchableHighlight onPress={this._onReservation} underlayColor="#ECEFF1">
								<View style={styles.sectionProfileRow}>
									<View style={styles.sectionProfileRowIcon}>
										<Avatar
											rounded
											size="small"
											overlayContainerStyle={{ backgroundColor: 'white' }}
											source={require('../assets/icons/drawer/country_korea.png')}
											onPress={this.props.onPress}
										/>
									</View>
									<View style={styles.sectionProfileRowText}>
										<Text>{Language.Reservation[this.props.profileStore.language]}</Text>
									</View>
									<View style={styles.sectionProfileRowButton}>
										<Image
											style={styles.iconImage}
											source={require('../assets/icons/contents/arrow_right.png')}
										/>
									</View>
								</View>
							</TouchableHighlight>
							{/* 언어 */}
							{/* <TouchableHighlight onPress={this._onLanguage} underlayColor="#ECEFF1">
								<View style={styles.sectionProfileRow}>
									<View style={styles.sectionProfileRowIcon}>
										<Avatar
											size="small"
											overlayContainerStyle={{ backgroundColor: 'white' }}
											source={this._getLanguageIcon(this.props.profileStore.language)}
										/>
									</View>
									<View style={styles.sectionProfileRowText}>
										<Text>{Language.Language[this.props.profileStore.language]}</Text>
									</View>
									<View style={styles.sectionProfileRowButton}>
										<Image
											style={styles.iconImage}
											source={require('../assets/icons/contents/arrow_right.png')}
										/>
									</View>
								</View>
							</TouchableHighlight> */}
							{/* 언어 - 선택기능 */}
							<ModalDropdown
								defaultIndex={0}
								dropdownStyle={styles.dropdown}
								options={arrLanguage}
								renderRow={this._renderRow.bind(this)}
								onSelect={(idx, value) => this._onSelect_modalDropDown(idx, value)}
							>
								<View style={styles.sectionProfileRow}>
									<View style={styles.sectionProfileRowIcon}>
										<Avatar
											size="small"
											overlayContainerStyle={{ backgroundColor: 'white' }}
											source={this._getLanguageIcon(this.props.profileStore.language)}
										/>
									</View>
									<View style={styles.sectionProfileRowText}>
										<Text>{Language.Language[this.props.profileStore.language]}</Text>
									</View>
									<View style={styles.sectionProfileRowButton}>
										<Image
											style={styles.iconImage}
											source={require('../assets/icons/contents/arrow_right.png')}
										/>
									</View>
								</View>
							</ModalDropdown>
							{/* 국가 */}
							<TouchableHighlight onPress={this._onNation} underlayColor="#ECEFF1">
								<View style={styles.sectionProfileRow}>
									<View style={styles.sectionProfileRowIcon}>
										<Avatar
											rounded
											size="small"
											overlayContainerStyle={{ backgroundColor: 'white' }}
											source={require('../assets/icons/drawer/country_korea.png')}
											onPress={this.props.onPress}
										/>
									</View>
									<View style={styles.sectionProfileRowText}>
										<Text>{Language.Nation[this.props.profileStore.language]}</Text>
									</View>
									<View style={styles.sectionProfileRowButton}>
										<Image
											style={styles.iconImage}
											source={require('../assets/icons/contents/arrow_right.png')}
										/>
									</View>
								</View>
							</TouchableHighlight>
							{/* 도시 */}
							<TouchableHighlight onPress={this._onCity} underlayColor="#ECEFF1">
								<View style={styles.sectionProfileRow}>
									<View style={styles.sectionProfileRowIcon}>
										<Avatar
											rounded
											size="small"
											overlayContainerStyle={{ backgroundColor: 'white' }}
											source={require('../assets/icons/drawer/city_seoul.png')}
											onPress={this.props.onPress}
										/>
									</View>
									<View style={styles.sectionProfileRowText}>
										<Text>{Language.City[this.props.profileStore.language]}</Text>
									</View>
									<View style={styles.sectionProfileRowButton}>
										<Image
											style={styles.iconImage}
											source={require('../assets/icons/contents/arrow_right.png')}
										/>
									</View>
								</View>
							</TouchableHighlight>
						</View>
						<Divider style={styles.drawerDivider} />

						{/* FoodType section */}
						<Text style={styles.foodSectionHeader}>{Language.Food[this.props.profileStore.language]}</Text>
						<Divider style={styles.drawerDivider} />

						<View style={{ flexDirection: 'column' }}>
							<View style={styles.foodSection}>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Rice[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/rice.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('rice')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Soup[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/soup.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('soup')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Noodle[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/noodle.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('noodle')}
									size="small"
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Bread[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/bread.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('bread')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Pizza[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/pizza.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('pizza')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Pasta[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/pasta.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('pasta')}
									size="small"
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Meat[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/meat.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('meat')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Seafood[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/seafood.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('seafood')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Vegetable[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/vegetable.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('vegetable')}
									size="small"
								/>
							</View>
							<View style={styles.foodSection}>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Dessert[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/dessert.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('dessert')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Drink[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/drink.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('drink')}
									size="small"
								/>
								<AvatarIcon
									style={styles.foodSectionIcon}
									title={Language.Alcohol[this.props.profileStore.language]}
									icon={{ name: 'spoon', type: 'font-awesome' }}
									imageSrc={require('../assets/icons/food/alcohol.png')}
									// onPress={this._onFood}
									onPress={() => this._onFood('alcohol')}
									size="small"
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
	container: {
		fontFamily: 'NanumSquare_acL',
		marginTop: Platform.OS === 'ios' ? 35 : 0,
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
		height: 90,
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
		height: 55,
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionProfileRowButton: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconImage: {
		// flex: 3,
		// justifyContent: 'center',
		// alignItems: 'center',
		width: 20,
		height: 20,
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
	foodSectionIcon: {
		width: 70,
		// backgroundColor: '#fa1',
	},

	// modalDropdown
	dropdown: {
		width: Layout.drawerWidth - 20,
		height: 250,
		marginLeft: 10,
		fontSize: 30,
		borderColor: 'cornflowerblue',
		borderWidth: 2,
		borderRadius: 3,
	},
	dropdown_row: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
	},
	dropdown_row_text: {
		marginHorizontal: 4,
		paddingLeft: 10,
		fontSize: 16,
		// color: 'navy',
		textAlignVertical: 'center',
	},
});

// inject('profileStore')(observer(CustomPicker));
export default inject('profileStore', 'routerStore')(observer(DrawerScreen));
