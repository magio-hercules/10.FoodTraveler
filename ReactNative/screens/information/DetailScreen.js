import React from 'react';
import { View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { Divider, Avatar } from 'react-native-elements';

// const api = create({
// 	baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
// 	// baseURL: 'https://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7443/FooTravel',
// 	headers: { 'Content-Type': 'application/json' },
// });

export default class DetailScreen extends React.Component {
	state = {
		data: [],
		name: '',
		menu: '',
	};

	constructor(props) {
		super(props);
		console.log('DetailScreen constructor');
	}

	async componentDidMount() {
		console.log('call componentWillMount');

		let params = this.props.navigation.state.params;
		this.setState({ name: params.name, menu: params.menu });
	}

	render() {
		return (
			// <View>
			//   <Text>Detail</Text>
			// </View>
			<View style={[styles.ContentPart]}>
				<View style={styles.ContentHeader}>
					<Text style={styles.ContentHeaderText}>{this.state.name}</Text>
				</View>

				<Text style={styles.ContentText} numberOfLines={10} ellipsizeMode="tail">
					{this.state.menu}
				</Text>
			</View>
		);
	} // end of render
}

const styles = StyleSheet.create({
	ContentPart: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		// justifyContent: 'space-between',
		// justifyContent: 'center',
		paddingLeft: 16,
		paddingTop: 16,
		paddingRight: 16,
	},
	ContentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// paddingTop: 5,
		// paddingBottom: 5,
		// backgroundColor:'#aa1',
	},
	ContentHeaderText: {
		flex: 8,
		fontSize: 20,
		alignItems: 'center',
		fontFamily: 'NanumSquare_acB',
	},
	ContentText: {
		flex: 1,
		fontFamily: 'NanumSquare_acL',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 10,
		lineHeight: 30,
		// backgroundColor:'#a1a',
	},
});
