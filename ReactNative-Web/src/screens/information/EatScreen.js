import React from 'react';
import { Platform, View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { decorate, observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

// import { Divider, Avatar } from 'react-native-elements';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

class EatScreen extends React.Component {
	state = {
		data: [],
		typeArray: {},
	};

	constructor(props) {
		super(props);
		console.log('Eatcreen constructor');
	}

	async componentDidMount() {
		console.log('call componentWillMount');

		// let params = this.props.navigation.state.params;
		// let _data = await this._getEat(params.eat_list);
		// let params = this.props.foodStore.eat_list;
		let food_id = this.props.foodStore.food_id;
		console.log('food_id : ' + food_id);
		let _data = await this._getEat(food_id);
		this.setState({ data: _data });
	}

	render() {
		const { classes } = this.props;

		return (
			<View style={styles.RootView}>
				<View style={styles.container}>
					<FlatList
						data={this.state.data}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => {
							console.log('renderItem');
							console.log(item);
							console.log(item.type);
							console.log(item.desc);

							return (
								<View style={styles.table}>
									<View style={styles.rowSection} key={index} width={LayoutInfo.width} height={100}>
										<View style={styles.iconPart}>
											{/* <Avatar
										size="medium"
										rounded
										overlayContainerStyle={{ width: 90, backgroundColor: '#BBDEFB' }}
										title={item.type}
										// iconStyle={{height:80, width:80}}
										titleStyle={{ fontSize: 14 }}
										// onPress={() => console.log("Works!")}
										activeOpacity={0.7}
									/> */}
											<Avatar className={classes.avatarIcon}>{item.type}</Avatar>
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
									<Divider style={{ backgroundColor: 'blue' }} />
								</View>
							);
						}}
					/>
				</View>
			</View>
		);
	} // end of render

	_getEat(food_id) {
		console.log('call _getEat');
		console.log('food_id : ' + food_id);
		// let array = [];
		// array.push(list);

		return api
			.post('/eat', { food_id: food_id })
			.then(response => response.data)
			.then(data => {
				console.log('eat_list count : ' + data.length);
				let count = data.length;
				let arr = [];
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
					case 'jp':
						_lan = 'description_jp';
						break;
					case 'zh':
						_lan = 'description_zh';
						break;
				}

				let _typeIndex;
				for (let i = 0; i < count; i++) {
					if (_type != data[i].type) {
						index = 1;
					}
					_type = data[i].type;
					// _desc = data[i].description_en;
					_desc = data[i][_lan];
					_typeIndex = _type + index;

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
	} // end of _getEat(food_id)
}

const styles = StyleSheet.create({
	RootView: {
		// width: (Platform.OS === 'web') ? "50%" : "100%",
		// height: (Platform.OS === 'web') ? "200" : "100%",
		flex: 1,
		height: '100%',
		// flexDirection:'column',
		backgroundColor: '#fafafa',
		alignItems: 'center',
		justifyContent: 'center',
		// minWidth: "50%",
		// maxWidth: "70%",
	},
	container: {
		width: Platform.OS === 'web' ? LayoutInfo.size.imagePart : '100%',
		backgroundColor: 'white',
		minWidth: LayoutInfo.size.webMinWidth,
		maxWidth: LayoutInfo.size.imagePart,
	},
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
		width: 100,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#a1a'
	},
});

const materialStyles = {
	avatarIcon: {
		width: 90,
		height: 60,
		margin: 12,
		backgroundColor: '#BBDEFB',
		boxShadow: 'none',
		color: '#FFFFFF',
		fontSize: 15,
		activeOpacity: 0.7,
		// paddingTop: '25px',
		// margin: 12,
	},
};

export default withStyles(materialStyles)(inject('profileStore', 'foodStore')(observer(EatScreen)));
