import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
	window: {
		width,
		height,
	},
	isSmallDevice: width < 375,
	size: {
		imagePart: width,
		contentPart: 160,
	},
	drawerWidth: 300,
	imagePartIconSectionTop: width - 55,
	imagePartIconSection: 55,
	imagePartIconSize: 30,
	contentsPartIconSize: 30,
};
