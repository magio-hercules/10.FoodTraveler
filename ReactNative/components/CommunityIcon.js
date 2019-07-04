import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';

import Layout from '../constants/Layout';

const propTypes = {
	iconSrc: PropTypes.node,
	tintColor: PropTypes.string,
	onPress: PropTypes.func,
	onPlus: PropTypes.func,
	onSubtract: PropTypes.func,
};

const defaultProps = {
	onPress: createWarning('onPress'),
	onPlus: createWarning('onPlus'),
	onSubtract: createWarning('onSubtract'),
};

function createWarning(funcName) {
	return () => console.log(funcName + ' is not defined');
}

export default class CommunityIcon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight
				style={styles.Icon}
				onPress={this.props.onPress}
				// onPress={this.props.onPlus}
				underlayColor="#fff"
			>
				<Image style={styles.IconImage} tintColor={this.props.tintColor} source={this.props.iconSrc} />
			</TouchableHighlight>
		);
	}
}

CommunityIcon.propTypes = propTypes;
CommunityIcon.defaultProps = defaultProps;

const styles = StyleSheet.create({
	Icon: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: Layout.contentsPartIconSize,
		height: Layout.contentsPartIconSize,
		// backgroundColor:'#afa',
	},
	IconImage: {
		// width: Layout.contentsPartIconSize,
		// height: Layout.contentsPartIconSize,
		width: 25,
		height: 25,
		// backgroundColor:'#afa',
	},
});
