// import React from 'react';
// import { View, Text } from 'react-native';

// export default class ClassScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Cooking Class',
//   };

//   render() {
//     return (
//       <View>
//         <Text> 추후 제공 예정 </Text>
//       </View>
//     );
//   }
// }

import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { create } from 'apisauce';

/* #type1, redux
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter';
*/
import { decorate, observable, observe, action, when, computed, autorun, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

class ClassScreen extends React.Component {
	state = {
		refreshing: false,
		data: [],
	};

	// 참고 LifeCycle
	// 컴포넌트 생성시 constructor -> componentWillMount -> render -> componentDidMount
	// 컴포넌트 제거시 componentWillUnmount
	// 컴포넌트 prop 변경시 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate

	constructor(props) {
		super(props);
		console.log('ClassScreen constructor');
	}

	componentWillMount() {
		console.log('call componentWillMount');
	}

	async componentDidMount() {
		console.log('call componentDidMount');

		let _data = await this._getTotalClasses();
		console.log('_data : ' + _data);
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

				this._getTotalClasses().then(
					_data => {
						this.setState({ data: _data });
						console.log('_data : ' + _data);
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

		console.log('end componentDidMount');
	}

	async componentWillReceiveProps() {
		console.log('ClassScreen componentWillReceiveProps');

		let _data = await this._getTotalClasses();
		console.log('_data : ' + _data);
		this.setState({ data: _data });
	}

	_getTotalClasses() {
		console.log('call _getTotalClasses');

		return api
			.get('/total_classes')
			.then(response => response.data)
			.then(data => {
				// console.log(data);
				console.log('_getTotalClasses count : ' + data.length);

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
						food_id: data[i].food_id,
						city_id: data[i].city_id,
						name: data[i].name,
						description: data[i][_desc],
						menu: data[i].menu,
						// gallery_list: data[i].gallery_list,
						position: data[i].position,
						image_url: data[i].image_url,
					});
				}
				console.log('total_classes');
				console.log(arr);
				return arr;
			})
			.catch(err => {
				console.error(err);
			});
	}

	_onPressDetail = index => {
		console.log('call _onPressDetail : index(' + index + ')');
		let _data = this.state.data[index];
		let _key = this.state.data[index].key;
		console.log('_onPressDetail : class_id(' + _key + ')');

		this.props.foodStore.class_id = _key;
		console.log('this.props.foodStore.class_id : (' + _key + ')');
		const navigateAction = NavigationActions.navigate({
			routeName: 'Detail',
			params: {
				// index: this.state.index,
				name: _data.name,
				menu: _data.menu,
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressGallery = index => {
		console.log('call _onPressGallery : index(' + index + ')');
		let _key = this.state.data[index].key;
		console.log('_onPressGallery : class_id(' + _key + ')');

		this.props.foodStore.gallery_type = 'class';
		this.props.foodStore.class_id = _key;
		console.log('this.props.foodStore.class_id : (' + _key + ')');
		const navigateAction = NavigationActions.navigate({
			routeName: 'Gallery',
			params: {
				// gallery_list: gallery_list,
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	_onPressMap = index => {
		console.log('call _onPressMap : index(' + index + ')');
		let _key = this.state.data[index].key;
		let position = this.state.data[index].position;
		console.log('_onPressMap : class_id(' + _key + ')');
		console.log('_onPressMap : position(' + position + ')');

		this.props.foodStore.class_id = _key;
		console.log('this.props.foodStore.class_id : (' + _key + ')');
		const navigateAction = NavigationActions.navigate({
			routeName: 'Map',
			params: {
				position: position,
			},
		});
		this.props.navigation.dispatch(navigateAction);
	};

	render() {
		console.log('call render');

		return (
			<FlatList
				data={this.state.data}
				// keyExtractor={(item, index) => index.toString()}
				// keyExtractor={(item) => item.key}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					return (
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
										name={Language.Detail[this.props.profileStore.language]}
										iconSrc={require('../assets/icons/contents/detail.png')}
										onPress={() => this._onPressDetail(index)}
									/>
									<InformationIcon
										name={Language.Gallery[this.props.profileStore.language]}
										iconSrc={require('../assets/icons/contents/gallery.png')}
										onPress={() => this._onPressGallery(index)}
									/>
									<InformationIcon
										name={Language.Map[this.props.profileStore.language]}
										iconSrc={require('../assets/icons/contents/place.png')}
										onPress={() => this._onPressMap(index)}
									/>
								</View>
							</ImageBackground>

							<View style={[styles.ContentPart]}>
								{/* <View style={styles.ContentHeader}>
									<Text style={styles.ContentHeaderText}>{item.name}</Text>
								</View>
								<Text style={styles.ContentText} numberOfLines={6} ellipsizeMode="tail">
									{' '}
									{item.description}{' '}
								</Text> */}
								<View style={styles.ContentHeaderTextSection}>
									<Text style={styles.ContentHeaderText}>{item.name}</Text>
									{/* <View style={styles.ContentHeaderTextSectionInner}>
									</View> */}
								</View>
								<Text style={styles.ContentText} numberOfLines={4} ellipsizeMode="tail">
									{' ' + item.description}
								</Text>
							</View>
						</View>
					);
				}}
			/>
		);
	}
}

ClassScreen.propTypes = {
	navigation: PropTypes.object,
};

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
		// paddingLeft: 5,
		// paddingRight: 5,
		padding: 15,
	},
	ContentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 5,
		// paddingBottom: 5,
		// backgroundColor:'#a1a',
	},
	ContentHeaderTextSection: {
		// flex: 8,
		height: 50,
		// flexDirection: 'column',
		justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: '#faa',
	},
	// ContentHeaderTextSectionInner: {
	// 	height: 80,
	// },
	ContentHeaderText: {
		// flex: 8,
		fontSize: 18,
		// alignItems: 'center',
		fontFamily: 'NanumSquare_acB',
	},
	ContentText: {
		fontSize: 14,
		marginTop: 8,
		fontFamily: 'NanumSquare_acL',
		// backgroundColor: '#ffa',
	},
});

export default inject('profileStore', 'foodStore', 'routerStore')(observer(ClassScreen));
