import React from 'react';
import { View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

import LayoutInfo from '../../constants/Layout';
import AvatarIcon from '../../components/AvatarIcon';

import { Divider, Avatar } from 'react-native-elements';

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

class IngredientScreen extends React.Component {
	static navigationOptions = {
		// title: 'Ingredient',
	};

	state = {
		// params: this.props.navigation.state.params,
		data: [],
		typeArray: {},
	};

	constructor(props) {
		super(props);
		console.log('IngredientScreen constructor');
	}

	async componentDidMount() {
		console.log('call componentWillMount');

		// let params = this.props.navigation.state.params;
		// let _data = await this._getInfoIngredient(params.ingredient_list);
		console.log('params : ' + this.props.foodStore.ingredient_list);
		let _data = await this._getInfoIngredient(this.props.foodStore.ingredient_list);
		this.setState({ data: _data });

		this.setState({ language: this.props.profileStore.language });
		console.log('curLanguage : ' + this.props.profileStore.language);

		autorun(() => {
			console.log('autorun');
			console.log('this.state.language : ' + this.state.language);
			console.log('this.props.profileStore.language : ' + this.props.profileStore.language);
			if (this.state.language == this.props.profileStore.language) {
				console.log('this.state.language == this.props.profileStore.language');
			} else {
				console.log('this.state.language != this.props.profileStore.language');

				console.log('params : ' + this.props.foodStore.ingredient_list);
				this._getInfoIngredient(this.props.foodStore.ingredient_list).then(
					_data => {
						console.log('_data : ' + _data);
						this.setState({ data: _data });
						console.log('after setState({ data: _data })');
						console.log('this.props.profileStore.language : ' + this.props.profileStore.language);
					},
					error => {
						console.log('after then error : ');
						console.log(error);
					}
				);
				console.log('this.state.language : ' + this.state.language);
				this.setState({ language: this.props.profileStore.language });
			}
		});
	}

	render() {
		console.log('call render');
		console.log(this.state.data);
		console.log('call render 1');
		let keys = Object.keys(this.state.data);
		let arrayData = Object.values(this.state.data);
		console.log(keys);
		console.log(arrayData);
		console.log('call render 2');

		var newArr = _values(
			_mapKeys(this.state.data, function(value, key) {
				value.id = key;
				return value;
			})
		);
		console.log(newArr);

		return (
			<FlatList
				// data={_values(this.state.data)}
				data={newArr}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					console.log('renderItem');
					console.log(item);
					console.log(index);
					console.log(keys[index]);

					let _imageSrc;
					// let fileName = `../../assets/icons/ingredient/` + keys[index] + `.png`;
					// _imageSrc = require(fileName);

					switch (keys[index]) {
						case 'Meat':
						case '고기':
						case '肉':
						case 'お肉':
							_imageSrc = require('../../assets/icons/ingredient/Meat.png');
							break;
						case 'Seafood':
						case '해산물':
						case '海鲜':
						case 'シーフード':
							_imageSrc = require('../../assets/icons/ingredient/Seafood.png');
							break;
						case 'Grain':
						case '곡물':
						case '糧食':
						case '粒':
							_imageSrc = require('../../assets/icons/ingredient/Grain.png');
							break;
						case 'Vegetable':
						case '채소':
						case '蔬菜':
						case '野菜':
							_imageSrc = require('../../assets/icons/ingredient/Vegetable.png');
							break;
						case 'Nut':
						case '견과':
						case '坚果':
						case 'ナット':
							_imageSrc = require('../../assets/icons/ingredient/Nut.png');
							break;
						case 'Bread':
						case '빵':
						case '面包':
						case 'パン':
							_imageSrc = require('../../assets/icons/ingredient/Bread.png');
							break;
						case 'Fruit':
						case '과일':
						case '水果':
						case 'フルーツ':
							_imageSrc = require('../../assets/icons/ingredient/Fruit.png');
							break;
						case 'Oil':
						case '기름':
						case '油':
						case '油':
							_imageSrc = require('../../assets/icons/ingredient/Oil.png');
							break;
						case 'Flavor':
						case '조미료':
						case '味道':
						case '味':
							_imageSrc = require('../../assets/icons/ingredient/Flavor.png');
							break;
						case 'Milk product':
						case '유제품':
						case '奶制品':
						case '乳製品':
							_imageSrc = require('../../assets/icons/ingredient/Milk product.png');
							break;
						case 'Drink':
						case '음료':
						case '喝':
						case 'ドリンク':
							_imageSrc = require('../../assets/icons/ingredient/Drink.png');
							break;
						case 'Liquor':
						case '주류':
						case '酒':
						case 'お酒':
							_imageSrc = require('../../assets/icons/ingredient/Liquor.png');
							break;
					}

					return (
						<View style={styles.table}>
							<View style={styles.rowSection} key={index} width={LayoutInfo.width} height={100}>
								<View
									style={{
										width: 80,
										// backgroundColor: '#a1a'
									}}
								>
									<AvatarIcon
										title={keys[index]}
										// icon={{name: 'meat', type: 'font-awesome'}} // https://fontawesome.com/
										// imageSrc={require('../../assets/icons/test/profile.png')}
										imageSrc={_imageSrc}
									/>
								</View>
								{/* <View style={styles.iconPart}>
                  <Avatar
                    size="medium"
                    // rounded
                    // overlayContainerStyle={{width:70, backgroundColor: '#BBDEFB'}}
                    title={keys[index]}
                    source={_imageSrc}
                    // iconStyle={{height:80, width:80}}
                    titleStyle={{fontSize: 15}}
                    // onPress={() => console.log("Works!")}
                    activeOpacity={0.7} />
                </View> */}
								<Text
									style={{
										flex: 1,
										marginLeft: 10,
										//  backgroundColor:'#1aa'
									}}
									numberOfLines={3}
									ellipsizeMode="tail"
								>
									{' '}
									{item}{' '}
								</Text>
							</View>
							<Divider style={{ backgroundColor: 'white' }} />
						</View>
					);
				}}
			/>
		);
	} // end of render

	_getInfoIngredient(list) {
		console.log('call _getInfoIngredient');
		console.log('list : ' + list);
		let array = [];
		array.push(list);

		return (
			api
				.post('/ingredient', { ingredient_list: array })
				.then(response => response.data)
				// .then(console.log)
				// .then(data => data[_id])
				// .then(console.log)
				.then(data => {
					console.log('ingredient_list count : ' + data.length);
					let count = data.length;
					let arr = [];
					let typeArr = {};

					let _index, _value, _type, _lan;
					switch (this.props.profileStore.language) {
						case 'ko':
							_type = 'type_ko';
							_lan = 'ingredient_ko';
							break;
						case 'en':
							_type = 'type_en';
							_lan = 'ingredient_en';
							break;
						case 'zh_cn':
							_type = 'type_zh_cn';
							_lan = 'ingredient_zh_cn';
							break;
						case 'zh_tw':
							_type = 'type_zh_tw';
							_lan = 'ingredient_zh_tw';
							break;
						case 'jp':
							_type = 'type_jp';
							_lan = 'ingredient_jp';
							break;
					}

					for (let i = 0; i < count; i++) {
						// type 1
						// arr.push({
						//   key: data[i].id,
						//   ingredient_ko: data[i].ingredient_ko,
						//   ingredient_en: data[i].ingredient_en,
						//   type_ko: data[i].type_ko,
						//   type_en: data[i].type_en,
						//   icon_url: data[i].icon_url,
						// });

						// type 2
						// let _type_en = data[i].type_en;
						// let _ingredient_en = data[i].ingredient_en;
						let _index = data[i][_type];
						let _value = data[i][_lan];
						if (typeArr[_index] == null || typeArr[_index] == undefined) {
							typeArr[_index] = _value;
						} else {
							typeArr[_index] += ', ' + _value;
						}

						// type3
						// arr.push({
						//   type_en: data[i].type_en,
						//   ingredient_ko: data[i].ingredient_ko,
						//   ingredient_en: data[i].ingredient_en,
						//   type_ko: data[i].type_ko,
						//   icon_url: data[i].icon_url,
						// });
					}
					// arr.push(typeArr);

					// console.log(arr);
					// console.log(typeArr);
					// return arr;
					return typeArr;
				})
				.catch(err => {
					console.error(err);
				})
		);
	} // end of _getInfoIngredient(list)
}

const styles = StyleSheet.create({
	table: {
		padding: 10,
		backgroundColor: 'white',
	},
	rowSection: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-evenly',
		justifyContent: 'flex-start',
		// padding: 10,
		backgroundColor: 'white',
	},
	iconPart: {
		width: 90,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#a1a'
	},
});

export default inject('profileStore', 'foodStore')(observer(IngredientScreen));
