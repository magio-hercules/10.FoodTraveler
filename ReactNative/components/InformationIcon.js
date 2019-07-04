import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
import LayoutInfo from '../constants/Layout';

const propTypes = {
	name: PropTypes.string,
	iconSrc: PropTypes.node,
	onPress: PropTypes.func,
	index: PropTypes.number,
	number: PropTypes.number,
};

const defaultProps = {
	onPress: createWarning('onPress'),
	index: -1,
	number: 0,
};

function createWarning(funcName) {
	return () => console.log(funcName + ' is not defined');
}

export default class InformationIcon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor="#fff">
				<View style={styles.ImagePartIcon}>
					<Image style={styles.ImagePartIconImage} source={this.props.iconSrc} />
					<Text style={styles.ImagePartIconText}>{this.props.name}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

InformationIcon.propTypes = propTypes;
InformationIcon.defaultProps = defaultProps;

const styles = StyleSheet.create({
	ImagePartIcon: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: LayoutInfo.imagePartIconSize + 35,
		height: LayoutInfo.imagePartIconSection,
		// backgroundColor: '#aad',
	},
	ImagePartIconImage: {
		width: LayoutInfo.imagePartIconSize,
		height: LayoutInfo.imagePartIconSize,
		marginTop: 3,
		// backgroundColor: '#dd1',
	},
	ImagePartIconText: {
		fontSize: 10,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'NanumSquare_acL',
		color: 'white',
		paddingTop: 3,
		// backgroundColor: '#a1a',
	},
});
