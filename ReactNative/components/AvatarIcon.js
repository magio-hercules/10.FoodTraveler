import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-elements';
// import LayoutInfo from '../constants/Layout';

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
	return () => console.log(funcName + ' is not defined');
}

export default class AvatarIcon extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor="#fff">
				<View style={[styles.AvatarPart, this.props.style]}>
					<Avatar
						// style={{
						// 	width: this.props.iconSize != undefined ? this.props.iconSize : 50,
						// 	height: this.props.iconSize != undefined ? this.props.iconSize : 50,
						// }}
						// rounded
						rounded={this.props.rounded ? true : false}
						size={this.props.size}
						// title={this.props.title}
						icon={this.props.icon}
						source={this.props.imageSrc}
						activeOpacity={this.props.activeOpacity}
						onPress={this.props.onPress}
						overlayContainerStyle={{ backgroundColor: 'white' }}
						// showEditButton
					/>
					{!this.props.noText && <Text style={styles.AvatarText}>{this.props.title} </Text>}
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
	// AvatarImage: {
	// 	width: this.props.iconSize != undefined ? this.props.iconSize : 50,
	// 	height: this.props.iconSize != undefined ? this.props.iconSize : 50,
	// },
	AvatarText: {
		fontSize: 12,
		marginTop: 5,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'NanumSquare_acL',
		// backgroundColor: '#a1a',
	},
});
