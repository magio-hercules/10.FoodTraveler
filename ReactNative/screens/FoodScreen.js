import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import { Tile, Button, Icon } from 'react-native-elements';
// import { randomCards } from '../temp/tile';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import { Dimensions } from 'react-native';
// import Layout from '../constants/Layout';
import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

import { create } from 'apisauce';
import RNFetchBlob from 'rn-fetch-blob';

// import CookScreen from './information/CookScreen';

/* #type1, redux
import { connect } from 'react-redux';
// import * as actions from '../actions';
import * as counterActions from '../reducers/counter';
*/
import { decorate, observable, observe, action, when, computed, autorun, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';

import cloneDeep from 'lodash/cloneDeep';
// const cloneDeep = require('clone-deep');

import R from 'ramda';
import RS from 'ramdasauce';

// var https = require('https');
// import https from 'https';
// import { https } from 'https';

const windowWidth = Dimensions.get('window').width;

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	headers: { 'Content-Type': 'application/json' },
	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com/FooTravel',
	// headers: { 'Content-Type': 'application/json' },
	// headers: { Accept: 'application/vnd.github.v3+json' },
});
// const api = create({
// 	// baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
// 	baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com/FooTravel',
// 	headers: {
// 		'Content-Type': 'application/json',
// 		//  Accept: 'application/vnd.github.v3+json'
// 	},
// 	// headers: {
// 	// 	'Content-Type': 'application/json',

// 	// 	'User-Agent': 'PostmanRuntime/7.15.0',
// 	// 	Accept: '*/*',
// 	// 	'Cache-Control': 'no-cache',
// 	// 	'Postman-Token': 'b5c73af5-8f8f-4d79-bd0e-d11374ef75d9',
// 	// 	Host: 'ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com',
// 	// 	'accept-encoding': 'gzip, deflate',
// 	// 	Connection: 'keep-alive',
// 	// },
// 	// httpsAgent: new https.Agent({
// 	// 	//public CER
// 	// 	ca: 'cer-file.cer'
// 	// }),
// 	// httpsAgent: new https.Agent({
// 	// 	// ca: fs.readFileSync(`${path}CA.pem`),
// 	// 	cert: fs.readFileSync(require('../assets/key/server.cert')),
// 	// 	key: fs.readFileSync(require('../assets/key/server.key')),
// 	// 	rejectUnauthorized: false,
// 	// }),
// 	timeout: 10000,
// });

// attach a monitor that fires with each request
// api.addMonitor(
// 	R.pipe(
// 		RS.dotPath('headers.x-ratelimit-remaining'),
// 		R.concat('Calls remaining this hour: '),
// 		console.log
// 	)
// );

class LogoTitle extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Image
					source={require('../assets/icons/menu.png')}
					style={{ width: 30, height: 30, marginLeft: 10, marginTop: 5 }}
				/>
				<Text style={{ marginLeft: 10, fontSize: 27, color: '#fff' }}> FoodTraveler </Text>
			</View>
		);
	}
}

class FoodScreen extends React.Component {
	// default class FoodScreen extends React.Component {
	static navigationOptions = {
		//   // header: null,
		//   // title: 'Home',
		// headerTitle: <LogoTitle />,
		//   headerStyle: {
		//     backgroundColor: '#ada',
		//   },
	};

	state = {
		isFocused: false,
		// refreshing: false,
		language: '',
		// data: randomCards(20),
		// data: this._getTotalFoods()
		data: [],
		filterList: [],
	};

	// 참고 LifeCycle
	// 컴포넌트 생성시 constructor -> componentWillMount -> render -> componentDidMount
	// 컴포넌트 제거시 componentWillUnmount
	// 컴포넌트 prop 변경시 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate

	constructor(props) {
		super(props);
		console.log('[LIFE CYCLE] FoodScreen constructor');
	}

	get FilterList() {
		return this.props.profileStore.filterList;
	}

	componentWillMount() {
		console.log('[LIFE CYCLE] FoodScreen componentWillMount');
	}

	async componentDidMount() {
		console.log('[LIFE CYCLE] FoodScreen componentDidMount');

		let _data = await this._getTotalFoods();
		console.log('_data : ' + _data);
		this.setState({ data: _data });

		this.setState({ language: this.props.profileStore.language });
		console.log('curLanguage : ' + this.props.profileStore.language);

		// this.setState({ filterList: this.FilterList });
		console.log('curFilterList : ' + this.FilterList);

		autorun(() => {
			if (!this.state.isFocused) {
				console.log('food isFocused : ' + this.state.isFocused);
				return;
			}
			if (this.state.language == this.props.profileStore.language) {
				console.log('this.state.language == this.props.profileStore.language');
				return;
			}

			console.log('FoodScreen autorun 1');
			console.log('this.state.language : ' + this.state.language);
			console.log('this.props.profileStore.language : ' + this.props.profileStore.language);

			this._getTotalFoods().then(
				_data => {
					this.setState({ data: _data });
					console.log('after setState _data count : ' + _data.length);
				},
				error => {
					console.log('after then error : ');
					console.log(error);
				}
			);
			this.setState({ language: this.props.profileStore.language });
		});

		autorun(() => {
			console.log('!!!!!! FoodScreen autorun 2');

			if (!this.state.isFocused) {
				console.log('food isFocused : ' + this.state.isFocused);
				return;
			}
			if (this.state.filterList == this.FilterList) {
				console.log('this.state.filterList == this.FilterList');
				return;
			}

			console.log('FoodScreen autorun 2');
			console.log('this.state.filterList : ' + this.state.filterList);
			console.log('this.FilterList : ' + this.FilterList);

			this._getTotalFoods().then(
				_data => {
					this.setState({ data: _data });
					console.log('after setState _data count : ' + _data.length);
					this.setState({ filterList: this.FilterList });
				},
				error => {
					console.log('after then error : ');
					console.log(error);
				}
			);
		});

		this._componentDidFocus();
		this.didFocus = this.props.navigation.addListener('didFocus', this._componentDidFocus);
		this.didBlur = this.props.navigation.addListener('didBlur', this._componentDidBlur);

		console.log('[LIFE CYCLE] FoodScreen end componentDidMount');
	}

	componentWillUnmount() {
		console.log('[LIFE CYCLE] FoodScreen componentWillUnmount');

		// this.didFocus.remove();
		// this.didBlur.remove();
	}

	async componentWillReceiveProps() {
		console.log('[LIFE CYCLE] FoodScreen componentWillReceiveProps');

		let _data = await this._getTotalFoods();
		console.log('_data : ' + _data);
		this.setState({ data: _data });
	}

	_componentDidFocus = () => {
		this.setState({ isFocused: true });
		console.log('[LIFE CYCLE] FoodScreen _componentDidFocus');
	};

	_componentDidBlur = () => {
		this.setState({ isFocused: false });
		console.log('[LIFE CYCLE] FoodScreen _componentDidBlur');
	};

	_getTotalFoods() {
		console.log('call _getTotalFoods');

		return RNFetchBlob.config({
			trusty: true,
		})
			.fetch(
				'GET',
				// 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel/total_foods'
				'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com/FooTravel/total_foods'
			)
			.then(response => {
				// console.log('!!!response!!!');
				return response.json();
			})
			.then(data => {
				// console.log(data);
				// console.log('count : ' + data.length);

				let _title, _desc;
				switch (this.props.profileStore.language) {
					case 'ko':
						_title = 'title_ko';
						_desc = 'desc_ko';
						break;
					case 'en':
						_title = 'title_en';
						_desc = 'desc_en';
						break;
					case 'zh_cn':
						_title = 'title_zh_cn';
						_desc = 'desc_zh_cn';
						break;
					case 'zh_tw':
						_title = 'title_zh_tw';
						_desc = 'desc_zh_tw';
						break;
					case 'jp':
						_title = 'title_jp';
						_desc = 'desc_jp';
						break;
				}

				let count = data.length;
				let arr = [];

				for (let i = 0; i < count; i++) {
					if (this.FilterList.length == 0 || this.FilterList == data[i].food_type_list) {
						arr.push({
							key: data[i].id,
							title_local: data[i].title_local,
							title_phonetic: data[i].title_phonetic,
							// title: data[i].title_en,
							// description: data[i].desc_en,
							title: data[i][_title],
							description: data[i][_desc],
							favorite: true,

							description_id: data[i].description_id,
							food_type_list: data[i].food_type_list,
							ingredient_list: data[i].ingredient_list,
							cook_list: data[i].cook_list,
							eat_list: data[i].eat_list,
							history_list: data[i].history_list,
							caution_list: data[i].caution_list,

							allergy_list: data[i].allergy_list,
							city_list: data[i].city_list,
							image_url: data[i].image_url,
						});
					}
				}
				// console.log(arr);
				return arr;
			})
			.catch(err => {
				console.error(err);
			});
	}

	_getTotalFoods_api() {
		console.log('call _getTotalFoods');

		return (
			api
				.get('/total_foods')
				// .then(console.log)
				// .then(response => response.data)
				.then(response => {
					// console.log("!!!response!!!");
					// console.log(response);
					return response.data;
				})
				.then(data => {
					// console.log(data);
					console.log('count : ' + data.length);

					let _title, _desc;
					switch (this.props.profileStore.language) {
						case 'ko':
							_title = 'title_ko';
							_desc = 'desc_ko';
							break;
						case 'en':
							_title = 'title_en';
							_desc = 'desc_en';
							break;
						case 'zh_cn':
							_title = 'title_zh_cn';
							_desc = 'desc_zh_cn';
							break;
						case 'zh_tw':
							_title = 'title_zh_tw';
							_desc = 'desc_zh_tw';
							break;
						case 'jp':
							_title = 'title_jp';
							_desc = 'desc_jp';
							break;
					}

					let count = data.length;
					let arr = [];
					for (let i = 0; i < count; i++) {
						arr.push({
							key: data[i].id,
							title_local: data[i].title_local,
							title_phonetic: data[i].title_phonetic,
							// title: data[i].title_en,
							// description: data[i].desc_en,
							title: data[i][_title],
							description: data[i][_desc],
							favorite: true,

							description_id: data[i].description_id,
							food_type_list: data[i].food_type_list,
							ingredient_list: data[i].ingredient_list,
							cook_list: data[i].cook_list,
							eat_list: data[i].eat_list,
							history_list: data[i].history_list,
							caution_list: data[i].caution_list,

							allergy_list: data[i].allergy_list,
							city_list: data[i].city_list,
							image_url: data[i].image_url,
						});
					}
					// console.log(arr);
					return arr;
				})
				.catch(err => {
					console.error(err);
				})
		);
	}

	// information
	_onPressIngredient = index => {
		console.log('call _onPressIngredient : index(' + index + ')');
		let _key = this.state.data[index].key;
		let ingredient_list = this.state.data[index].ingredient_list;
		console.log('_onPressIngredient : food_id(' + _key + ')');
		console.log('_onPressIngredient : ingredient_list(' + ingredient_list + ')');

		this.props.routerStore.screen = 'Ingredient';
		this.props.foodStore.food_id = _key;
		this.props.foodStore.ingredient_list = ingredient_list;
		console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
		console.log('this.props.foodStore.foodId : (' + this.props.foodStore.food_id + ')');
		console.log('this.props.foodStore.ingredient_list : (' + this.props.foodStore.ingredient_list + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Ingredient',
			// params: {
			//   // index: this.state.index,
			//   ingredient_list: ingredient_list,
			// }
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressCook = index => {
		console.log('call _onPressCook : index(' + index + ')');
		let _key = this.state.data[index].key;
		let cook_list = this.state.data[index].cook_list;
		console.log('_onPressCook : food_id(' + _key + ')');
		console.log('_onPressCook : cook_list(' + cook_list + ')');

		this.props.routerStore.screen = 'Cook';
		this.props.foodStore.food_id = _key;
		this.props.foodStore.cook_list = cook_list;
		console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
		console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
		console.log('this.props.foodStore.cook_list : (' + this.props.foodStore.cook_list + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Cook',
			// params: {
			//   food_id: _key,
			//   cook_list: cook_list,
			// }
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressEat = index => {
		console.log('call _onPressEat : index(' + index + ')');
		let _key = this.state.data[index].key;
		let eat_list = this.state.data[index].eat_list;
		console.log('_onPressEat : food_id(' + _key + ')');
		console.log('_onPressEat : eat_list(' + eat_list + ')');

		this.props.routerStore.screen = 'Eat';
		this.props.foodStore.food_id = _key;
		this.props.foodStore.eat_list = eat_list;
		console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
		console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
		console.log('this.props.foodStore.eat_list : (' + this.props.foodStore.eat_list + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Eat',
			// params: {
			//   food_id: _key,
			//   eat_list: eat_list,
			// }
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressHistory = index => {
		console.log('call _onPressHistory : index(' + index + ')');
		let _key = this.state.data[index].key;
		let history_list = this.state.data[index].history_list;
		console.log('_onPressHistory : food_id(' + _key + ')');
		console.log('_onPressHistory : history_list(' + history_list + ')');

		this.props.routerStore.screen = 'History';
		this.props.foodStore.food_id = _key;
		this.props.foodStore.history_list = history_list;
		console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
		console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
		console.log('this.props.foodStore.history_list : (' + this.props.foodStore.history_list + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'History',
			// params: {
			//   food_id: _key,
			//   history_list: history_list,
			// }
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressCaution = index => {
		console.log('call _onPressCaution : index(' + index + ')');
		let _key = this.state.data[index].key;
		let caution_list = this.state.data[index].caution_list;
		console.log('_onPressCaution : food_id(' + _key + ')');
		console.log('_onPressCaution : caution_list(' + caution_list + ')');

		this.props.routerStore.screen = 'Caution';
		this.props.foodStore.food_id = _key;
		this.props.foodStore.caution_list = caution_list;
		console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
		console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
		console.log('this.props.foodStore.caution_list : (' + this.props.foodStore.caution_list + ')');

		const navigateAction = NavigationActions.navigate({
			routeName: 'Caution',
			// params: {
			//   food_id: _key,
			//   caution_list: caution_list,
			// }
		});
		this.props.navigation.dispatch(navigateAction);
	};

	// community
	_onPressHeart = index => {
		console.log('_onPressHeart : index(' + index + ')');
		console.log('_onPressHeart 변경 전 : ' + this.state.data[index].favorite);

		const tempData = cloneDeep(this.state.data);
		tempData[index].favorite = !tempData[index].favorite;
		this.setState({ data: tempData });

		console.log('_onPressHeart 변경 후 : ' + tempData[index].favorite);
	};

	_onPressMessage = index => {
		console.log('_onPressMessage');
	};

	_onPressShare = index => {
		console.log('_onPressShare');
	};

	render() {
		// console.log('FoodScreen call render');

		return (
			<FlatList
				data={this.state.data}
				// keyExtractor={(item, index) => index.toString()}
				// keyExtractor={(item) => item.key}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					// console.log('item and index');
					// console.log(item);
					// console.log(index);
					// console.log(item.food_type_list);

					return (
						(this.FilterList.length == 0 || this.FilterList.includes(parseInt(item.food_type_list))) && (
							<View
								key={item.key}
								// title={item.title}

								// height={LayoutInfo.size.imagePart + LayoutInfo.size.contentPart}
								width={LayoutInfo.width}
								height={LayoutInfo.size.imagePart + LayoutInfo.size.contentPart}
								contentContainerStyle={{ height: LayoutInfo.size.contentPart }}
							>
								<ImageBackground
									style={[styles.ImagePartLayout, styles.ImagePart]}
									source={{ uri: item.image_url }}
								>
									<View style={[styles.ImagePartOverlay]}>
										<InformationIcon
											// name='Ingredient'
											name={Language.Ingredient[this.props.profileStore.language]}
											iconSrc={require('../assets/icons/contents/ingredients.png')}
											// onPress={this._onPressIngredient}/>
											number={this.props.number}
											onPress={() => this._onPressIngredient(index)}
										/>
										<InformationIcon
											// name='Cook'
											name={Language.Cook[this.props.profileStore.language]}
											iconSrc={require('../assets/icons/contents/chef.png')}
											onPress={() => this._onPressCook(index)}
										/>
										<InformationIcon
											// name='Eat'
											name={Language.Eat[this.props.profileStore.language]}
											iconSrc={require('../assets/icons/contents/eat.png')}
											onPress={() => this._onPressEat(index)}
										/>
										<InformationIcon
											// name='History'
											name={Language.History[this.props.profileStore.language]}
											iconSrc={require('../assets/icons/contents/history.png')}
											onPress={() => this._onPressHistory(index)}
										/>
										<InformationIcon
											// name='Caution'
											name={Language.Caution[this.props.profileStore.language]}
											iconSrc={require('../assets/icons/contents/caution.png')}
											onPress={() => this._onPressCaution(index)}
										/>
									</View>
								</ImageBackground>

								<View style={[styles.ContentPart]}>
									<View style={styles.ContentHeader}>
										<View style={styles.ContentHeaderTextSection}>
											<View style={styles.ContentHeaderTextSectionInner}>
												<Text style={styles.ContentHeaderText}>
													{item.title_local + ' [' + item.title_phonetic + ']'}
												</Text>
											</View>
											<View style={styles.ContentHeaderTextSectionInner}>
												<Text style={styles.ContentHeaderTextDesc}>{': ' + item.title}</Text>
											</View>
										</View>
										<View style={styles.IconPart}>
											<CommunityIcon
												// iconSrc={
												// 	item.favorite
												// 		? require('../assets/icons/heart_3.png')
												// 		: require('../assets/icons/heart_2.png')
												// } community
												iconSrc={require('../assets/icons/community/heart.png')}
												tintColor={item.favorite ? '#f44336' : 'rgb(50, 50, 50)'}
												onPress={() => this._onPressHeart(index)}
											/>
											<CommunityIcon
												iconSrc={require('../assets/icons/community/message.png')}
												onPress={() => this._onPressMessage(index)}
												// onPlus={this.props.increment}
											/>
											<CommunityIcon
												iconSrc={require('../assets/icons/community/share.png')}
												onPress={() => this._onPressShare(index)}
												// onPlus={this.props.decrement}
											/>
										</View>
									</View>

									<Text style={styles.ContentText} numberOfLines={4} ellipsizeMode="tail">
										{' '}
										{item.description}{' '}
									</Text>
								</View>
							</View>
						)
					);
				}}
			/>
		);
	}
}

FoodScreen.propTypes = {
	navigation: PropTypes.object,
};

/* #type1, redux
const mapStateToProps = (state) => {
  return {
      number: state.counter.number
      // index: state.info.index,
      // color: state.ui.color
  };
};

// #type 1
// const mapDispatchProps = (dispatch) => {
//   return {
//       handleIncrement: () => { dispatch(actions.increment())},
//       handleDecrement: () => { dispatch(actions.decrement())},
//       handleShowIngredient: (index) => { dispatch(actions.showInfoIngredient(index))}
//   };
// };

// #type 2
// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchProps = (dispatch) => ({
  increment: () => dispatch(counterActions.increment()),
  decrement: () => dispatch(counterActions.decrement())
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
// #type 1
export default connect(mapStateToProps, mapDispatchProps)(FoodScreen);

// #type 2
// export default connect(
//   (state) => ({
//     number: state.counter.number
//   }), 
//   (dispatch) => ({
//     increment: () => dispatch(counterActions.increment()),
//     decrement: () => dispatch(counterActions.decrement())
//   })
// )(CounterContainer);
*/

// decorate(FoodScreen, {
//   curFoodId: observable,
//   increase: action,
//   decrease: action,
//   setFoodId: action,
//   lan: computed
// })
decorate(FoodScreen, {
	FilterList: computed,
});

export default inject('profileStore', 'foodStore', 'routerStore')(observer(FoodScreen));

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
	},
	ImagePartOverlay: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		top: LayoutInfo.imagePartIconSectionTop,
		// opacity: 0.8,
		opacity: 1.0,
		width: LayoutInfo.width,
		height: LayoutInfo.imagePartIconSection,
		// backgroundColor: 'white',
		backgroundColor: 'rgba(0,0,0, 0.1)',
	},
	ContentPart: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		// justifyContent: 'space-between',
		// justifyContent: 'center',
		// paddingLeft: 15,
		// paddingRight: 15,
		padding: 15,
	},
	ContentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingTop: 5,
		// paddingBottom: 5,
		// backgroundColor:'#a1a',
	},
	ContentHeaderTextSection: {
		flex: 8,
		// height: 55,
		height: '100%',
		flexDirection: 'column',
		// backgroundColor: '#faa',
	},
	ContentHeaderTextSectionInner: {
		height: 25,
	},
	ContentHeaderText: {
		flex: 8,
		fontSize: 18,
		fontFamily: 'NanumSquare_acEB',
		// backgroundColor: '#afa',
	},
	ContentHeaderTextDesc: {
		flex: 8,
		fontSize: 16,
		marginTop: 2,
		fontFamily: 'NanumSquare_acB',
		// backgroundColor: '#aaf',
	},
	ContentText: {
		fontSize: 14,
		marginTop: 8,
		fontFamily: 'NanumSquare_acL',
		// backgroundColor: '#f1f',
	},
	IconPart: {
		flex: 3,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor:'#aaf',
	},
});
