import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
// import { Tile, Button, Icon } from 'react-native-elements';
// import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';

// import cloneDeep from 'lodash/cloneDeep';
// const cloneDeep = require('clone-deep');

const windowWidth = Dimensions.get('window').width;

export default class LikeScreen extends React.Component {
	// static navigationOptions = {
	//   // headerTitle: <LogoTitle />,
	// };
	static navigationOptions = {
		title: 'Like',
	};

	state = {
		refreshing: false,
		// data: randomCards(20),
		data: [],
	};

	_onPressIngredient = () => {
		console.log('_onPressIngredient');
	};

	_onPressCook = () => {
		console.log('_onPressCook');
	};

	_onPressEat = () => {
		console.log('_onPressEat');
	};

	_onPressHistory = () => {
		console.log('_onPressHistory');
	};

	_onPressCaution = () => {
		console.log('_onPressCaution');
	};

	// _onPressHeart = () => {
	//   console.log('_onPressHeart');
	// }
	_onPressHeart = index => {
		console.log('_onPressHeart : index(' + index + ')');
		console.log('_onPressHeart 변경 전 : ' + this.state.data[index].favorite);

		// const tempData = cloneDeep(this.state.data);
		// tempData[index].favorite = !tempData[index].favorite;
		// this.setState({data: tempData});

		console.log('_onPressHeart 변경 후 : ' + tempData[index].favorite);
	};

	_onPressMessage = () => {
		console.log('_onPressMessage');
	};

	_onPressShare = () => {
		console.log('_onPressShare');
	};

	render() {
		return (
			<View>
				<Text> 추후 제공 예정 </Text>
			</View>
		);
	}
}

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
		opacity: 0.8,
		width: LayoutInfo.width,
		height: LayoutInfo.imagePartIconSection,
		backgroundColor: 'white',
	},
	ImagePartIcon: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// top: LayoutInfo.imagePartIconSectionTop,
		// width: 70,
		width: LayoutInfo.imagePartIconSize + 15,
		height: LayoutInfo.imagePartIconSection,
		// backgroundColor: '#aad',
	},
	ImagePartIconImage: {
		width: LayoutInfo.imagePartIconSize,
		height: LayoutInfo.imagePartIconSize,
		// backgroundColor: '#dd1',
	},
	ImagePartIconText: {
		fontSize: 11,
		justifyContent: 'center',
		alignItems: 'center',
		// width: 70,
		// backgroundColor: '#a1a'
	},
	ContentPart: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		// justifyContent: 'space-between',
		// justifyContent: 'center',
		paddingLeft: 5,
		paddingRight: 5,
	},
	ContentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		// backgroundColor:'#a1a',
	},
	ContentHeaderText: {
		fontSize: 20,
		alignItems: 'center',
	},
	IconPart: {
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor:'#aaf',
	},
	Icon: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: Layout.contentsPartIconSize,
		height: Layout.contentsPartIconSize,
		// backgroundColor:'#afa',
	},
	IconImage: {
		width: Layout.contentsPartIconSize,
		height: Layout.contentsPartIconSize,
	},
});
