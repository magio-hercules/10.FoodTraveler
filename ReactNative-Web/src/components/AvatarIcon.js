import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
// import { Avatar } from 'react-native-elements';
// import LayoutInfo from '../constants/Layout';
import Avatar from '@material-ui/core/Avatar';

const propTypes = {
	size: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.object,
	imageSrc: PropTypes.node,
	activeOpacity: PropTypes.number,
	onPress: PropTypes.func,
};

const defaultProps = {
	size: 'medium',
	activeOpacity: 0.7,
	onPress: createWarning('onPress'),
};

function createWarning(funcName) {
	return () => console.warn(funcName + ' is not defined');
}

export default class AvatarIcon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor="#fff">
				<View style={styles.AvatarPart}>
					<Avatar
						// size={this.props.size}
						// icon={this.props.icon}
						src={this.props.imageSrc}
						// activeOpacity={this.props.activeOpacity}
						onPress={this.props.onPress}
						// overlayContainerStyle={{ backgroundColor: 'white' }}
					/>
					<Text style={styles.AvatarText}>{this.props.title} </Text>
				</View>
			</TouchableHighlight>
		);
	}
}

AvatarIcon.propTypes = propTypes;
AvatarIcon.defaultProps = defaultProps;

const styles = StyleSheet.create({
	AvatarPart: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		// backgroundColor: '#aad',
	},
	AvatarText: {
		fontSize: 12,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'netmarbleL',
		// backgroundColor: '#a1a'
	},
});
