import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';

import ImageSlider from 'react-native-image-slider';

import { create } from 'apisauce';
import RNFetchBlob from 'rn-fetch-blob';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

import { Divider, Avatar } from 'react-native-elements';

const api = create({
	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
	headers: { 'Content-Type': 'application/json' },
});

// const images = [
// 	'https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=1889&fileTy=MEDIA&fileNo=1&thumbTy=L',
// 	'http://tong.visitkorea.or.kr/cms/resource/88/1290988_image2_1.jpg',
// 	'https://mblogthumb-phinf.pstatic.net/MjAxNzA3MDZfMjE0/MDAxNDk5MzI4NTUyMDY5.KriNSnlEsWIWsiRWY_mw7iHFptgchrzOkTooQlVtIdsg.mW7GQ5aDasNRlWDCfRHsg07RWKOYUR3Hj-OUJ47qKjcg.JPEG.thdus0322/%EB%AA%85%EB%8F%99%EC%97%AD_%EA%B3%A0%EA%B8%B0%EC%A7%91_%EA%B3%A0%EA%B6%81_%EB%AA%85%EB%8F%99%EC%A0%90_%287%29.JPG?type=w2',
// 	'https://t1.daumcdn.net/cfile/tistory/231769345788362A4C',
// ];

var arrImage = [];

class GalleryScreen extends React.Component {
	state = {
		data: [],
		typeArray: {},
	};

	constructor(props) {
		super(props);
		console.log('GalleryScreen constructor');
	}

	async componentDidMount() {
		console.log('call componentDidMount');
		let _type = this.props.foodStore.gallery_type;
		console.log('gallery_type : ' + _type);

		let _route;
		let _obj;
		if (_type == 'store') {
			_route = '/gallery_store';
			_obj = { store_id: this.props.foodStore.store_id };
		} else if (_type == 'class') {
			_route = '/gallery_class';
			_obj = { class_id: this.props.foodStore.class_id };
		}
		console.log('_obj : ' + _obj);

		let _data = await this._getGallery(_route, _obj);
		console.log('_data : ' + _data);
		this.setState({ data: _data });

		console.log('end componentDidMount');
	}

	_getGallery(_route, _obj) {
		console.log('call _getGallery');

		let arr = [];
		arr.push(obj);

		let url = '';
		if (_route == '/gallery_store') {
			url = 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com/FooTravel/gallery_store';
		} else if (_route == '/gallery_class') {
			url = 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com/FooTravel/gallery_class';
		}

		return RNFetchBlob.config({
			trusty: true,
		})
			.fetch(
				'POST',
				// 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel/total_foods'
				url,
				{
					'Content-Type': 'multipart/form-data',
				},
				arr
			)
			.then(response => {
				console.log('!!!response!!!');
				return response.json();
			})
			.then(data => {
				console.log('gallery count : ' + data.length);
				let count = data.length;
				let arr = [];
				arrImage = [];

				let _data;
				for (let i = 0; i < count; i++) {
					_data = data[i];

					arr.push({
						id: i,
						image_url: _data.image_url,
					});
					arrImage.push(_data.image_url);
				}

				return arr;
			})
			.catch(err => {
				console.error(err);
			});
	} // end of _getGallery(store_id)

	_getGallery_api(_route, _obj) {
		console.log('call _getGallery');

		return api
			.post(_route, _obj)
			.then(response => response.data)
			.then(data => {
				console.log('gallery count : ' + data.length);
				let count = data.length;
				let arr = [];
				arrImage = [];

				let _data;
				for (let i = 0; i < count; i++) {
					_data = data[i];

					arr.push({
						id: i,
						image_url: _data.image_url,
					});
					arrImage.push(_data.image_url);
				}

				return arr;
			})
			.catch(err => {
				console.error(err);
			});
	} // end of _getGallery(store_id)

	render() {
		return (
			<ImageSlider
				loop
				autoPlayWithInterval={5000}
				// images={images}
				images={arrImage}
				onPress={({ index }) => alert(index)}
				customSlide={({ index, item, style, width }) => (
					// It's important to put style here because it's got offset inside
					<View key={index} style={[style, styles.customSlide, { backgroundColor: 'black' }]}>
						<Image source={{ uri: item }} resizeMode="contain" style={styles.customImage} />
					</View>
				)}
				customButtons={(position, move) => (
					<View style={styles.buttons}>
						{arrImage.map((image, index) => {
							return (
								<TouchableHighlight
									key={index}
									underlayColor="transparent"
									onPress={() => move(index)}
									style={styles.button}
								>
									{/* <Text style={position === index ? styles.buttonSelected : styles.buttonNotSelected}>
                  {index + 1}
                </Text> */}
									<Image
										style={position === index ? styles.dotSelected : styles.dotNormal}
										source={require('../../assets/icons/dot.png')}
									/>
								</TouchableHighlight>
							);
						})}
					</View>
				)}
			/>
		);
	} // end of render
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
	buttons: {
		zIndex: 1,
		height: 15,
		marginTop: -25,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		margin: 3,
		width: 15,
		height: 15,
		opacity: 0.9,
		alignItems: 'center',
		justifyContent: 'center',
	},
	dotSelected: {
		opacity: 1,
		tintColor: 'white',
		width: 25,
		height: 25,
	},
	dotNormal: {
		opacity: 0.6,
		tintColor: 'white',
		width: 25,
		height: 25,
	},
	customSlide: {
		backgroundColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
	},
	customImage: {
		width: LayoutInfo.window.width,
		height: LayoutInfo.window.height,
	},
});

export default inject('profileStore', 'foodStore')(observer(GalleryScreen));
