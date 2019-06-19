import React from 'react';
import { Platform, View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

import LayoutInfo from '../../constants/Layout';

// import { Divider, Avatar } from 'react-native-elements';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

class CautionScreen extends React.Component {
	state = {
		data: [],
		language: '',
		typeArray: {},
	};

	constructor(props) {
		super(props);
		console.log('CautionScreen constructor');
	}

	async componentDidMount() {
		console.log('call componentWillMount');

		// let params = this.props.navigation.state.params;
		// let _data = await this._getCaution(params.caution_list);
		// let params = this.props.foodStore.caution_list;
		let food_id = this.props.foodStore.food_id;
		console.log('food_id : ' + food_id);
		let _data = await this._getCaution(food_id);
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
				this._getCaution(this.props.foodStore.food_id).then(
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
		// const { classes } = this.props;
		const classes = useStyles();

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
											{/* <Avatar className={classes.avatarIcon}>{item.type}</Avatar> */}
											<Avatar className={classes.avatar}>
												<Text style={styles.avatarText}>{item.type}</Text>
											</Avatar>
										</View>
										<Text
											style={{
												flex: 1,
												marginLeft: 10,
												// backgroundColor:'#1aa'
											}}
											numberOfLines={5}
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

	_getCaution(food_id) {
		console.log('call _getCaution');
		console.log('food_id : ' + food_id);
		// let array = [];
		// array.push(list);

		return api
			.post('/caution', { food_id: food_id })
			.then(response => response.data)
			.then(data => {
				console.log('caution_list count : ' + data.length);
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

				for (let i = 0; i < count; i++) {
					_type = data[i].type;
					// _desc = data[i].description_en;
					_desc = data[i][_lan];
					// _typeIndex = _type + index;

					arr.push({
						type: _type,
						desc: _desc,
					});
					// index++;
				}

				return arr;
				// return typeArr;
			})
			.catch(err => {
				console.error(err);
			});
	} // end of _getCaution(food_id)
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
		// backgroundColor: '#a1a',
		paddingRight: 10,
	},
	avatarText: {
		fontSize: 15,
		textAlign: 'center',
		color: '#FFFFFF',
	},
});

const useStyles = makeStyles({
	avatar: {
		width: 90,
		height: 60,
		margin: 12,
		backgroundColor: '#BBDEFB',
		boxShadow: 'none',
		color: '#FFFFFF',
		fontSize: 15,
		activeOpacity: 0.7,
		// paddingTop: '25px',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	orangeAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: deepOrange[500],
	},
	purpleAvatar: {
		margin: 10,
		color: '#fff',
		backgroundColor: deepPurple[500],
	},
});

export default inject('profileStore', 'foodStore')(observer(CautionScreen));
