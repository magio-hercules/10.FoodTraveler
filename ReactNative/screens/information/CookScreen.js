import React from 'react';
import { View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

import { Divider, Avatar } from 'react-native-elements';

const api = create({
	// baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

class CookScreen extends React.Component {
	state = {
		data: [],
		language: '',
		typeArray: {},
	};

	constructor(props) {
		super(props);
		console.log('CookScreen constructor');
	}

	async componentDidMount() {
		console.log('call componentWillMount');

		// let params = this.props.navigation.state.params;
		// let _data = await this._getCook(params.cook_list);
		// let params = this.props.foodStore.cook_list;
		let food_id = this.props.foodStore.food_id;
		console.log('food_id : ' + food_id);
		let _data = await this._getCook(food_id);
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

				console.log('params : ' + this.props.foodStore.food_id);
				this._getCook(this.props.foodStore.food_id).then(
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
		return (
			<FlatList
				// data={_values(this.state.data)}
				// data={newArr}
				data={this.state.data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					console.log('renderItem');
					console.log(item);
					console.log(item.type);
					console.log(item.desc);

					return (
						<View style={styles.table}>
							<View style={styles.rowSection} key={index} width={LayoutInfo.width} height={70}>
								<View style={styles.iconPart}>
									<Avatar
										size="medium"
										rounded
										overlayContainerStyle={{ width: 90, backgroundColor: '#BBDEFB' }}
										title={item.type}
										// iconStyle={{height:80, width:80}}
										titleStyle={{ fontSize: 15 }}
										// onPress={() => console.log("Works!")}
										activeOpacity={0.7}
									/>
								</View>
								<Text
									style={{
										flex: 1,
										marginLeft: 10,
										// backgroundColor:'#1aa'
									}}
									numberOfLines={4}
									ellipsizeMode="tail"
								>
									{item.desc}
								</Text>
							</View>
							<Divider style={{ backgroundColor: 'white' }} />
						</View>
					);
				}}
			/>
		);
	} // end of render

	_getCook(food_id) {
		console.log('call _getCook');
		console.log('food_id : ' + food_id);
		// let array = [];
		// array.push(list);

		return api
			.post('/cook', { food_id: food_id })
			.then(response => response.data)
			.then(data => {
				console.log('cook_list count : ' + data.length);
				let count = data.length;
				let arr = [];
				let typeArr = {};

				let _type, _desc;
				let index = 1;

				let _lan;
				switch (this.props.profileStore.language) {
					case 'ko':
						_lan = 'description_ko';
						break;
					case 'en':
						_lan = 'description_en';
						break;
					case 'zh_cn':
						_lan = 'description_zh_cn';
						break;
					case 'zh_tw':
						_lan = 'description_zh_tw';
						break;
					case 'jp':
						_lan = 'description_jp';
						break;
				}

				for (let i = 0; i < count; i++) {
					_type = data[i].type;
					// _desc = data[i].description_en;
					_desc = data[i][_lan];
					_typeIndex = _type + ' ' + index;

					arr.push({
						type: _typeIndex,
						desc: _desc,
					});
					index++;
				}

				return arr;
				// return typeArr;
			})
			.catch(err => {
				console.error(err);
			});
	} // end of _getCook(food_id)
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
		// backgroundColor: 'white',
	},
	iconPart: {
		width: 90,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#a1a'
	},
});

export default inject('profileStore', 'foodStore')(observer(CookScreen));
