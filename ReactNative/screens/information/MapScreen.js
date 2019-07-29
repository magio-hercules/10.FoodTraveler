import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { View, Text, Image, FlatList, StyleSheet, Button, TouchableHighlight, ToastAndroid } from 'react-native';

// # type1
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// # type2
// var MapView = require('react-native-maps');
import { ProviderPropType, Animated as AnimatedMap, AnimatedRegion, Marker, Callout } from 'react-native-maps';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { Divider, Avatar } from 'react-native-elements';

const ASPECT_RATIO = LayoutInfo.window.width / LayoutInfo.window.height;
// const LATITUDE = 37.561891;
// const LONGITUDE = 126.98644;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var posLatitude;
var posLongitude;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

// const api = create({
// 	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
// 	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
// 	headers: { 'Content-Type': 'application/json' },
// });

// 37.561891, 126.986440

function randomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

async function requestLocationPermission() {
	try {
		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'FoodTraveler Location Permission',
			message: 'FoodTraveler needs access to your location ' + 'so you can find your location.',
			buttonNeutral: 'Ask Me Later',
			buttonNegative: 'Cancel',
			buttonPositive: 'OK',
		});
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the location');
			// this.state.bLocationPermission = true;
		} else if (granted === PermissionsAndroid.RESULTS.DENIED) {
			console.log('Location permission DENIED');
		} else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			console.log('Location permission NEVER_ASK_AGAIN');
		} else {
			console.log('Location permission else');
		}
	} catch (err) {
		console.log(err);
	}
}

async function requestCameraPermission() {
	try {
		const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
			title: 'Cool Photo App Camera Permission',
			message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
			buttonNeutral: 'Ask Me Later',
			buttonNegative: 'Cancel',
			buttonPositive: 'OK',
		});
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the camera');
		} else {
			console.log('Camera permission denied');
		}
	} catch (err) {
		console.warn(err);
	}
}

export default class MapScreen extends React.Component {
	state = {
		data: [],
		typeArray: {},
		// bLocationPermission,
	};

	watchID: ?number = null;

	constructor(props) {
		super(props);

		this.state = {
			region: new AnimatedRegion({
				latitude: 0,
				longitude: 0,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}),
			poi: null,
			// markerPos_store: {
			// 	latitude: LATITUDE,
			// 	longitude: LONGITUDE,
			// },
			markerPos_store: {
				latitude: 0,
				longitude: 0,
			},
			markerPos_my: {
				latitude: 0,
				longitude: 0,
			},
		};

		this.onPoiClick = this.onPoiClick.bind(this);

		console.log('MapScreen constructor');
	}

	componentDidMount() {
		console.log('[MAP] call componentDidMount');

		// let bPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

		//   setTimeout(() => {
		//     try {
		//       const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
		//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		//         console.log("[MAP] ACCESS_FINE_LOCATION permisson false");
		//         requestLocationPermission();
		//         this.setState({bLocationPermission: false});
		//       } else {
		//         console.log("[MAP] ACCESS_FINE_LOCATION permisson true");
		//       // this.state.bLocationPermission = true;
		//       this.setState({bLocationPermission: false});
		//       }
		//     } catch (err) {
		//       console.warn(err);
		//     }
		// }, 300)

		// this._aa();
		requestLocationPermission();

		let params = this.props.navigation.state.params;
		console.log('Map params (position: ' + params.position + ')');
		var arrPos = params.position.split(',');
		console.log('LATITUDE : ' + arrPos[0] + ', LONGITUDE : ' + arrPos[1]);
		posLatitude = parseFloat(arrPos[0]);
		posLongitude = parseFloat(arrPos[1]);

		let initRegion = {
			latitude: posLatitude,
			longitude: posLongitude,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		};
		this.setState({ region: initRegion });

		let _markerPos_store = {
			latitude: posLatitude,
			longitude: posLongitude,
		};
		this.setState({ markerPos_store: _markerPos_store });

		console.log('[MAP] end componentDidMount');
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	async _aa() {
		try {
			const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('[MAP] ACCESS_FINE_LOCATION permisson false');
				requestLocationPermission();
				// this.setState({bLocationPermission: false});
			} else {
				console.log('[MAP] ACCESS_FINE_LOCATION permisson true');
				// this.state.bLocationPermission = true;
				// this.setState({bLocationPermission: false});
			}
		} catch (err) {
			console.warn(err);
		}
	}

	onPoiClick(e) {
		console.log('onPoiClick');
		const poi = e.nativeEvent;
		console.log('onPoiClick (poi.placeId : ' + poi.placeId + ', poi.name : ' + poi.name + ')');

		this.setState({
			poi,
		});
	}

	_onPressMyPosition = () => {
		console.log('call _onPressMyPosition');

		navigator.geolocation.getCurrentPosition(
			position => {
				let lat = parseFloat(position.coords.latitude);
				let lng = parseFloat(position.coords.longitude);

				let region = {
					latitude: lat,
					longitude: lng,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				};

				let initPos = {
					latitude: lat,
					longitude: lng,
				};

				this.setState({ region: region });
				this.setState({ markerPos_my: initPos });

				console.log(position);
			},
			error => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: false, timeout: 5000, maximumAge: 2000 }
		);

		this.watchID = navigator.geolocation.watchPosition(
			position => {
				let lat = parseFloat(position.coords.latitude);
				let lng = parseFloat(position.coords.longitude);

				let region = {
					latitude: lat,
					longitude: lng,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				};

				this.setState({ region: region });
				this.setState({ markerPos_my: region });

				console.log(position);
			},
			error => {
				// See error code charts below.
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: false, timeout: 10000, maximumAge: 5000 }
		);
		// ToastAndroid.show('press My Position', ToastAndroid.SHORT);
	};

	_onPressButton = flag => {
		console.log('call _onPressButton : flag(' + flag + ')');

		if (flag) {
			ToastAndroid.show('press Plus Button', ToastAndroid.SHORT);
		} else {
			ToastAndroid.show('press Minus Button', ToastAndroid.SHORT);
		}
	};

	// onRegionChange(region) {
	//   console.log('[MAP] call onRegionChange');
	//   // this.state.region.setValue(region);
	//   this.setState({ region });
	// }
	onRegionChange = region => {
		console.log('[MAP] call onRegionChange');
		this.setState({ region });
	};

	render() {
		console.log('[MAP] render');

		return (
			<View style={styles.container}>
				{/* <MapView */}
				<AnimatedMap
					// provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					provider={this.props.provider}
					style={styles.map}
					// region={{
					//   latitude: 37.561918,
					//   longitude: 126.986552,
					//   latitudeDelta: 0.015,
					//   longitudeDelta: 0.0121,
					// }}
					initialRegion={this.state.region}
					region={this.state.region}
					// onPoiClick={this.onPoiClick}
					// onPoiClick={(e) => console.log(e)}
					// onPoiClick={({ nativeEvent }: any) => console.log(nativeEvent)}
					onPoiClick={() => Alert.alert('onPoiClick')}
					// onRegionChange={this.onRegionChange}
					// onRegionChange = (region) => {},
					// onRegionChange={::this.onRegionChange},
					onRegionChange={() => this.onRegionChange.bind(this)}
				>
					<Marker
						// key={marker.key}
						coordinate={this.state.markerPos_store}
						// pinColor={randomColor()}
						pinColor={'#aa1100'}
						title="고궁 음식점"
						description="서울특별시 중구 충무로2가 명동8가길 27"
					/>

					<Marker coordinate={this.state.markerPos_my}>
						<View style={styles.radius}>
							<View style={styles.markerMy} />
						</View>
					</Marker>

					{this.state.poi && (
						<Marker coordinate={this.state.poi.coordinate}>
							<Callout>
								<View>
									<Text>Place Id: {this.state.poi.placeId}</Text>
									<Text>Name: {this.state.poi.name}</Text>
								</View>
							</Callout>
						</Marker>
					)}
					{/* </MapView> */}
				</AnimatedMap>
				<TouchableHighlight
					style={styles.button_my_position}
					underlayColor="#EEEEEE"
					onPress={() => this._onPressMyPosition()}
				>
					<Image style={styles.icon} source={require('../../assets/icons/map/my_pos.png')} />
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.button_plus}
					underlayColor="#EEEEEE"
					onPress={() => this._onPressButton(true)}
				>
					<Text style={styles.button_font}>+</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.button_minus}
					underlayColor="#EEEEEE"
					onPress={() => this._onPressButton(false)}
				>
					<Text style={styles.button_font}>-</Text>
				</TouchableHighlight>
			</View>
		);
	} // end of render
}

MapScreen.propTypes = {
	provider: ProviderPropType,
};

const styles = StyleSheet.create({
	container: {
		// marginTop: 50,
		...StyleSheet.absoluteFillObject,
		// height: 400,
		// width: 400,
		width: LayoutInfo.width,
		height: LayoutInfo.height,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#aa1100',
	},
	map: {
		...StyleSheet.absoluteFillObject,
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
	icon: {
		width: 30,
		height: 30,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#a1a'
	},
	button_font: {
		fontSize: 18,
	},
	button_my_position: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		left: 10,
		bottom: 30,
		borderRadius: 50 / 2,
		// shadowColor: '#11aa11',
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.8,
		// shadowRadius: 10,
		elevation: 5,
		backgroundColor: '#ffffff',
	},
	button_plus: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		width: 30,
		height: 30,
		right: 10,
		top: 10,
		borderRadius: 5,
		backgroundColor: '#ffffff',
	},
	button_minus: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		width: 30,
		height: 30,
		right: 10,
		top: 45,
		borderRadius: 5,
		backgroundColor: '#ffffff',
	},
	radius: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		overflow: 'hidden',
		backgroundColor: 'rgba(0, 122, 255, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(0, 112, 255, 0.3)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	markerMy: {
		height: 20,
		width: 20,
		borderRadius: 20 / 2,
		borderWidth: 3,
		borderColor: 'white',
		overflow: 'hidden',
		backgroundColor: '#007aff',
	},
});
